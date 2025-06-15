import { Entity } from '../types';

// Retry an async operation with exponential backoff
export async function retry<T>(fn: () => Promise<T>, maxRetries = 3, delayMs = 500): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();  // success
        } catch (err: any) {
            lastError = err;
            console.warn(`Attempt ${attempt} failed:`, err);
            if (attempt < maxRetries) {
                // wait before retry
                await new Promise(res => setTimeout(res, delayMs * attempt));
            }
        }
    }
    throw lastError;    // all attempts failed
}

export async function analyzeLine(line: string, apikey: string): Promise<Entity[]> {
    const params = new URLSearchParams({
        text: line,
        extractors: 'entities',
    });

    const res = await fetch('/api/textrazor', {
        method: 'POST',
        headers: {
            'x-textrazor-key': apikey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    if (!res.ok) {
        throw new Error(`TextRazor error ${res.status}`);
    }
    const data = await res.json();
    const raw: any[] = data.response?.entities ?? [];
    const filtered = raw.filter(e => Array.isArray(e.type) && e.type.length > 0)


    return filtered.map((e, idx) => ({
        id: `${idx}-${e.start}`,
        type: e.type?.[0] ?? 'Other',
        matchedText: e.matchedText,
        start: e.start,
        end: e.end,
    }));
}

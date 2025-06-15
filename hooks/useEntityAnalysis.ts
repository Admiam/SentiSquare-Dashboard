import { retry, analyzeLine } from '../utils/services/textrazor'
import { useState } from 'react'
import type {Entity} from '../utils/types'

export function useEntityAnalysis() {
    const [counts, setCounts] = useState<Record<string, number>>({})         // entity frequency map
    const [entitiesByLine, setEntitiesByLine] = useState<Entity[][]>([])     // entities grouped by input line
    const [loading, setLoading] = useState(false)                            // in-progress flag
    const [error, setError] = useState<string | null>(null)                 // error message

    const processFile = async (fileLines: string[]) => {
        setLoading(true);
        setError(null);
        try {
            // call analyzeLine for each non-empty line
            const promises = fileLines.map(line =>
                line.trim()
                    ? retry(() => analyzeLine(line, import.meta.env.VITE_TEXTRAZOR_API_KEY!), 5, 1000)
                    : Promise.resolve([])
            );
            const tmpEntities = await Promise.all(promises);

            // build counts
            const freq: Record<string, number> = {};
            tmpEntities.flat().forEach(ent => {
                freq[ent.type] = (freq[ent.type] || 0) + 1;
            });

            setEntitiesByLine(tmpEntities);
            setCounts(freq);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Analysis failed");
        } finally {
            setLoading(false);
        }
    };

    return { counts, entitiesByLine, loading, error, processFile }
}

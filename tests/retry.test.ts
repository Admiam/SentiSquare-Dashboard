import { retry } from '../utils/services/textrazor'

describe('retry utility', () => {
    let attempts: number
    const createFlaky = (failures: number, result: string) => () =>
        new Promise<string>((resolve, reject) => {
            attempts++
            if (attempts <= failures) {
                reject(new Error('transient error'))
            } else {
                resolve(result)
            }
        })

    beforeEach(() => {
        attempts = 0
    })

    test('resolves when fn eventually succeeds', async () => {
        const fn = createFlaky(2, 'success')
        const value = await retry(fn, 5, 10)
        expect(value).toBe('success')
        expect(attempts).toBe(3)
    })

    test('rejects after maxRetries', async () => {
        const fn = createFlaky(5, 'never')
        await expect(retry(fn, 3, 10)).rejects.toThrow('transient error')
        expect(attempts).toBe(3)
    })

    test('no retry when fn succeeds first try', async () => {
        const fn = createFlaky(0, 'immediate')
        const value = await retry(fn, 3, 10)
        expect(value).toBe('immediate')
        expect(attempts).toBe(1)
    })
})

import { analyzeLine } from '../utils/services/textrazor'

beforeEach(() => {
    global.fetch = jest.fn()
})

afterEach(() => jest.resetAllMocks())

it('parses successful response', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
            response: { entities: [{ type: ['PERSON'], matchedText: 'Alice', start: 0, end: 5 }] }
        }),
    })

    const result = await analyzeLine('Alice', 'dummy')
    expect(result[0]).toMatchObject({ type: 'PERSON', matchedText: 'Alice' })
})

it('throws on HTTP error', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 })
    await expect(analyzeLine('fail', 'dummy')).rejects.toThrow('TextRazor error 500')
})

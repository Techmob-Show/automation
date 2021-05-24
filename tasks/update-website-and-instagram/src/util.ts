export const env = (key: string): string => {
    const result = process.env[key]
    if(result) {
        return result
    }
    throw new Error(`Secret couldn't be loaded from env: ${key}`)
}
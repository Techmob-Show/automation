// TODO throw exception if empty
export const env = (key: string): string => process.env[key] || ''
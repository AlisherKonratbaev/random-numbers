interface IRandomType {
    title: string
    value: string
}

export const randomTypes: IRandomType[] = [
    {title: 'Random trivia', value: 'trivia'},
    {title: 'Random year', value: 'year'},
    {title: 'Random date', value: 'date'},
    {title: 'Random math', value: 'math'},
]

export function isOnlyDigits(str: string) {
    return /^\d+$/.test(str);
}
export const getRandomInt = (min: number, max: number) => {
    const result = Math.floor(Math.random() * (max - min + 1))
    return result
}
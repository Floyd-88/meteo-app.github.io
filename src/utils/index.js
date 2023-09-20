export const upperCaseOneSimbol = (str) => {
    if (!str) return;
    return str[0].toUpperCase() + str.slice(1)
}

export const getTimeMM = (sec) => {
    let mSec = sec * 1000;
    return new Date(mSec).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' })
}
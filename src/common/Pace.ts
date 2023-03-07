export const kmhToPace = (speed: number, effort: number = 100, meters: number = 1000) => {
    const speedInMs = (speed * (effort / 100)) / 3.6;
    const durationInS = meters / speedInMs;

    const hours = (durationInS / 3600) >> 0;
    const minutes = ((durationInS - (hours * 3600)) / 60) >> 0;
    const seconds = (durationInS % 60) >> 0;

    const format = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (hours > 0) {
        return `${hours < 10 ? '0' : ''}${hours}:${format}`;
    }

    return format;
};

export const distanceByTime = (time: number, speed: number, effort: number = 100) => {
    const speedInMs = (speed * (effort / 100)) / 3.6;
    return round2(speedInMs * time);
}

export const round2 = (value: number) => {
    return (Math.floor(value * 100) / 100);
};

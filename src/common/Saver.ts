export default class Saver {
    private type: string;
    constructor(type: string) {
        this.type = type;
    }

    save(key: string, data: string) {
        if (key === "type" || key === "vma") {
            localStorage.setItem(key, data);
            return;
        }

        localStorage.setItem(`${this.type}:${key}`, data);
    }

    get(key: string) {
        if (key === "type" || key === "vma") {
            return localStorage.getItem(key);
        }

        return localStorage.getItem(`${this.type}:${key}`);
    }

    getVma() {
        return this.get('vma');
    }

    getTotalTime() {
        return this.get('totalTime');
    }

    getTotalDistance() {
        return this.get('totalDistance');
    }

    getStepDistance() {
        return this.get('stepDistance');
    }

    getEffort() {
        return this.get('effort');
    }

    getType() {
        return this.get('type');
    }

    saveVma(vma: number) {
        this.save('vma', vma.toString());
    }

    saveTotalTime(totalTime: number) {
        this.save('totalTime', totalTime.toString());
    }

    saveTotalDistance(totalDistance: number) {
        this.save('totalDistance', totalDistance.toString());
    }

    saveStepDistance(stepDistance: number) {
        this.save('stepDistance', stepDistance.toString());
    }

    saveEffort(effort: number) {
        this.save('effort', effort.toString());
    }

    saveType(type: string) {
        this.type = type;
        this.save('type', type);
    }
}

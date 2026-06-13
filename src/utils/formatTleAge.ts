export function formatTleAge(ageMinutes: number): string {
    if (ageMinutes < 0) {
        return 'future';
    }

    const days = Math.floor(ageMinutes / 1440);
    const hours = Math.floor((ageMinutes % 1440) / 60);
    const minutes = ageMinutes % 60;

    if (days > 0) {
        return `${days}日 ${hours}時間`;
    }

    if (hours > 0) {
        return `${hours}時間 ${minutes}分`;
    }

    return `${minutes}分`;
}
export function toCSharpDateTime(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function toCSharpTimeSpan(time: string): string {
    if (!time) {
        return '';
    }

    const parts = time.split('h');

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:00`;
}

export function toDate(dateString: string): Date {
    return new Date(dateString);
}

export function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function getHourAndMinuteTimeSpan(timespan: string) {
    const hours = timespan.split(":")[0];
    const minutes = timespan.split(":")[1];

    return `${hours}h${minutes}`;
}


export function IsNullOrEmpty(str: string | undefined): boolean {
    return str === null || str === undefined || str === "";
}
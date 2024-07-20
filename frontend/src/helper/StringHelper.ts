export function IsNullOrEmptyOrUndefined(str: string | undefined): boolean {
    return str === null || str === undefined || str === "";
}
export function isEmpty(item: any): boolean {
    if (Array.isArray(item)) return !item.length;
    if (typeof item === 'string') return !item.trim().length;
    if (item instanceof Date) return isNaN(item.valueOf());
    if (typeof item === 'object') return isObjEmpty(item);
    if (typeof item === 'number') return false;

    return !item;
}

export function isObjEmpty(obj: Record<string, unknown>): boolean {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export const makeFirstUpper = <P extends undefined>(str: string | P): string | P => (str && typeof str === "string") ? `${str[0].toUpperCase()}${str.slice(1)}` : str;

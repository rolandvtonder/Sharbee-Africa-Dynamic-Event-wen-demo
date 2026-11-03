export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Public-folder media path, safe under any deploy base. */
export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

export function invariant(cond: any, message: string): asserts cond {
    if (!cond) throw new Error(message);
}

export function warning(cond: any, message: string): void {
    if (!cond) {
         
        if (typeof console !== 'undefined') console.warn(message);

        try {
            // Welcome to debugging React Router!
            //
            // This error is thrown as a convenience so you can more easily
            // find the source for a warning that appears in the console by
            // enabling "pause on exceptions" in your JavaScript debugger.
            throw new Error(message);
             
        } catch (e) {}
    }
}

const alreadyWarned: Record<string, boolean> = {};
export function warningOnce(key: string, cond: boolean, message: string) {
    if (!cond && !alreadyWarned[key]) {
        alreadyWarned[key] = true;
        warning(false, message);
    }
}



export const joinPaths = (paths: string[]): string =>
    paths.join('/').replace(/\/\/+/g, '/');

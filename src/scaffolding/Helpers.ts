// Pull out unneeded keys
export const prepConfig = (config: any, defaults: any) : void => {
    const validKeys = Object.keys(defaults);

    for (const key in config) {
        if (validKeys.indexOf(key) === -1) {
            delete config[key];
        }
    }
};

// Validates if a number is within a range of min -> max
export const inRangeNumeric = (n: number, min: number, max: number): boolean => {
    return ((n - min) * (n - max) <= 0);
};

// Validates if object has function type literal
export const isFunc = (f: any): boolean => {
    return (Object.prototype.toString.call(f) === '[object Function]');
};

// Check if key exists in an obj
export const keyExists = (o: any, key: string) : number => {
    return (~Object.keys(o).map((i) => o[i]).indexOf(key));
};

// Return a new object containing the same keys as the ref passed in
export const cloneWithKeys = (o: any) : any => {
    return Object.keys(o).reduce((p, c) => { p[c] = null; return p; }, {});
};

// Calcuate megabits per second based on request duration in s and size of file downloaded
export const calculateMbps = (startTime: number, filesize: number): number => {
    const durationSeconds: number = (new Date().getTime() - startTime) / 1000;
    const filesizeBits: number = filesize * 8;
    return (filesizeBits / durationSeconds) / 1024 ** 2;
};

// Calculate average mbps rate based on set of download times in mbps
export const calculateAverageMbps = (speeds: number[]): number => {
    const sum: number = speeds.reduce((p, c) => p + c);
    return parseFloat((sum / speeds.length).toFixed(2));
};

// Generate uuidv4
export const generateUUID = (): string => {
    const p = (window as any).performance;
    let d = new Date().getTime();

    if (typeof p !== 'undefined' && typeof p.now === 'function') {
        d += p.now();
    }

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;

        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });

    return uuid;
};

// Convert inventory map to form data object
export const inventoryToFormData = (storyId: string, inventory: any, compositionId: string = null): any => {
    const formData = new FormData();

    formData.append('story_id', storyId);

    if (compositionId) {
        formData.append('composition_id', compositionId);
    }

    for (const key in inventory) {
        if (inventory[key]) {

            const data = inventory[key];

            if (data && data.type === 'file') {
                // Deal with HTML5 File inputs, only accept one currently
                const {files} = data;

                if (files.length > 0) {
                    inventory[key] = '';
                    formData.append(key, files[0]);
                } else {
                    inventory[key] = '';
                }
            } else if (data && data instanceof File) {
                // Only accept Files (need filename)
                inventory[key] = '';
                formData.append(key, data, data.name);
            }

            // Add other inputs, for files this will just be a key that our API uses for a look up
            formData.append(`inventory[${key}]`, inventory[key]);
        }
    }

    return formData;
};

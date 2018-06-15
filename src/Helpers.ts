import FormDataShim from 'form-data';
import ImposiumEvents from './ImposiumEvents';

export const InventoryToFormData = (s:string, i:any) => {
	return (!isNode()) ? invToFDGlobal(s, i) : invToFDShim(s, i);
}

export const isNode = ():boolean => {
	return (typeof process === 'object' && process + '' === '[object process]');
}

export const errorHandler = (error:Error) => {
	const {onError} = ImposiumEvents;

	if (onError) {
		onError(error);
	}

	console.error('[IMPOSIUM-JS-SDK]\n', error);
}

// Uses browser based FormData library
const invToFDGlobal = (storyId:string, inventory:any) => {
	const formData = new FormData();

	formData.append('story_id', storyId);

	for (const key in inventory) {
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
		} else if (data && data instanceof Blob || data instanceof File) {
			// Deal with blobs && pre-parsed HTML5 File objects
			inventory[key] = '';
			formData.append(key, data, 'inventory.png');
		}

		// Add other inputs, for files this will just be a key that our API uses for a look up
		formData.append(`inventory[${key}]`, inventory[key])
	}

	return formData;
}

// Uses shimmed FormData lib, checks for Buffers when working in nodeJS
const invToFDShim = (storyId:string, inventory:any) => {
	const formData = new FormDataShim();

	formData.append('story_id', storyId);

	for (const key in inventory) {
		const data = inventory[key];

		if (data instanceof Buffer) {
			inventory[key] = '';
			formData.append(key, data);
		}

		formData.append(`inventory[${key}]`, inventory[key]);
	}

	return formData;
}
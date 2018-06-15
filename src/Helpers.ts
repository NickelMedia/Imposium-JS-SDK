import FormDataShim from 'form-data';
import ImposiumEvents from './ImposiumEvents';

// Uses browser based FormData library
export const invToFDGlobal = (storyId:string, inventory:any) => {
	const formData = new FormData();

	formData.append('story_id', storyId);

	for (const key in inventory) {
		const data = inventory[key];

		// Handle file input iterables
		if (data && data.type === 'file') {
			const {files} = data;

			if (files.length > 0) {
				inventory[key] = '';
				formData.append(key, files[0]);
			} else {
				inventory[key] = '';
			}

		// Handle media blobs
		} else if (data && data instanceof Blob || data instanceof File) {
			inventory[key] = '';
			formData.append(key, data, 'inventory.png');
		}
	}

	// add the inventory
	for (let invKey in inventory) {
		formData.append(`inventory[${invKey}]`, inventory[invKey]);
	}

	return formData;
}

// Uses shimmed 
export const invToFDShim = (storyId:string, inventory:any) => {
	const formData = new FormDataShim();


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
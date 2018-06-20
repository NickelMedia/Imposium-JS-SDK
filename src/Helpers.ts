import * as FormDataShim from 'form-data';
import ImposiumEvents from './ImposiumEvents';

export const isNode = ():boolean => {
	if (typeof process === 'object') {
		if (typeof process.versions === 'object') {
			return (typeof process.versions.node !== 'undefined');
		}
	}

	return false;
}

export const InventoryToFormData = (s:string, i:any):any => {
	console.log('is node: ', isNode());
	return (!isNode()) ? invToFDGlobal(s, i) : invToFDShim(s, i);
}

export const errorHandler = (error:Error):void => {
	const {onError} = ImposiumEvents;

	if (onError) {
		onError(error);
	}

	console.error('[IMPOSIUM-JS-SDK]\n', error);
}

// Uses browser based FormData library to prep POST data
const invToFDGlobal = (storyId:string, inventory:any):FormData => {
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

// Uses shimmed FormData lib, checks for Buffers when working in nodeJS to prep POST data
const invToFDShim = (storyId:string, inventory:any):FormDataShim => {
	const stream = require('stream');
	const formData = new FormDataShim();

	formData.append('story_id', storyId);

	for (const key in inventory) {
		const data = inventory[key];

		if (inventory[key] instanceof stream.Readable) {
			inventory[key] = '';
			formData.append(key, data, 'test.jpg');
		}

		formData.append(`inventory[${key}]`, (inventory[key]) ? inventory[key] : '');
	}

	return formData;
}
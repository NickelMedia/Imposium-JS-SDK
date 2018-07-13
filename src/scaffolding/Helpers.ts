import * as FormDataShim from 'form-data';
import ImposiumEvents from './Events';

// Log out warnings
export const warnHandler = (message:string):void => {
	console.warn(`[IMPOSIUM-JS-SDK]\n${message}`);
}

// Log out errors, call user defined err callback if set && critical
export const errorHandler = (error:Error, trap:boolean = true):void => {
	const {onError} = ImposiumEvents;

	if (onError && trap) {
		onError(error);
	}

	console.error(`[IMPOSIUM-JS-SDK]\n${error}`);
}

// Format error messages 
export const formatError = (message:string, prop:any) => {
	return message.replace('[placeholder]', prop);
}

// Checks for NodeJS process data 
export const isNode = ():boolean => {
	return (
		typeof process !== 'undefined' &&
		process + '' === '[object process]' &&
		typeof (((process || {}) as any).versions || {}).node !== 'undefined' 
	);
}

// Pull out unneeded keys 
export const prepConfig = (config:any, defaults:any) => {
	const validKeys = Object.keys(defaults);

	for (const key in config) {
		if (validKeys.indexOf(key) === -1) {
			delete config[key];
		}
	}
}

// Validates if a number is within a range of min -> max
export const inRangeNumeric = (n:number, min:number, max:number):boolean => {
	return ((n - min) * (n - max) <= 0);
}

// Deal with prepping form data objs in isomporphic way
export const InventoryToFormData = (s:string, i:any):any => {
	return (!isNode()) ? invToFDGlobal(s, i) : invToFDShim(s, i);
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
import ImposiumEvents from './ImposiumEvents';

// TO DO: make a shimmed nodeJS version
export const formatInventory = (storyId:string, inventory:any) => {
	const formData = new FormData();

	let files:any = {};

	// add the storyID
	formData.append('story_id', storyId);
	// pull any files from the inventory, add them to the top level
	
	for (let inventoryId in inventory) {
		let val = inventory[inventoryId];

		// input
		if (val && val.type === 'file') {
			if (val.files.length > 0) {
				inventory[inventoryId] = '';
				formData.append(inventoryId, val.files[0]);
			} else {
				inventory[inventoryId] = '';
			}

		// blob
		} else if (val && val instanceof Blob || val instanceof File) {
			inventory[inventoryId] = '';
			formData.append(inventoryId, val, 'inventory.png');
		}
	}

	// add the inventory
	for (let invKey in inventory) {
		formData.append(`inventory[${invKey}]`, inventory[invKey]);
	}

	return formData;
}

export const errorHandler = (error:Error) => {
	const {onError} = ImposiumEvents;

	if (onError) {
		onError(error);
	}

	console.error('[IMPOSIUM-JS-SDK]\n', error);
}
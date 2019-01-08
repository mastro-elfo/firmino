
import {
	Create as FSCreate,
	Read as FSRead,
	Update as FSUpdate,
	Delete as FSDelete,
	Stats as FSStats
} from './Filesystem';

export function Create (filename, json) {
	json = json || {};
	try {
		return FSCreate(filename, JSON.stringify(json));
	}
	catch(err){
		return Promise.reject(err);
	}
}

export function Read (filename) {
	return FSRead(filename)
	.then(content => JSON.parse(content));
}

export function Update (filename, json) {
	try {
		return FSUpdate(filename, JSON.stringify(json));
	}
	catch(err){
		return Promise.reject(err);
	}
}

export function Delete (filename) {
	return FSDelete(filename);
};

export function Stats (filename) {
	return FSStats(filename);
};

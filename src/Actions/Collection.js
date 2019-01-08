
import {Create, Read, Update, Delete, Stats} from './Json';

export default class Collection {
	constructor(collection) {
		this.collection = collection;
		this.filename = `data/${collection}.json`;
		this.defaultValue = [];
	}

	Create = () => {
		return Create(this.filename, this.defaultValue);
	}

	Read = () => {
		return Read(this.filename);
	}

	Update = (json) => {
		return Update(this.filename, json);
	}

	Delete = () => {
		return Delete(this.filename);
	}

	Stats = () => {
		return Stats(this.filename);
	}
}

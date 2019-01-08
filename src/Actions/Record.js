
import Collection from './Collection';
import uuid from 'uuid/v1';

export default class Record {
	constructor(collection) {
		this.collection = new Collection(collection);
	}

	Create = record => (
		this.collection.Read()
		.then(records => {
			record.id = uuid();
			records.push(record);
			return (
				this.collection.Update(records)
				.then(() => record)
			);
		})
	)

	Read = id => (
		this.collection.Read()
		.then(records => {
			const record = records.find(item => item.id === id);
			if(record){
				return record;
			}
			else {
				throw new Error('Record not found', id);
			}
		})
	)

	Update = record => (
		this.collection.Read()
		.then(records => {
			const index = records.findIndex(item => item.id === record.id);
			if(index !== -1){
				records[index] = {
					...records[index],
					...record
				};
				return this.collection.Update(records);
			}
			else {
				throw new Error('Record not found', record.id);
			}
		})
	)

	Delete = record => (
		this.collection.Read()
		.then(records => {
			let index = records.findIndex(item => item.id === record.id);
			if(index !== -1){
				records.splice(index, 1);
				return this.collection.Update(records);
			}
			else {
				throw new Error('Record not found', record.id);
			}
		})
	)
}

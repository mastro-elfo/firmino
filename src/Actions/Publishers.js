import Collection from './Collection';

export default class Publishers extends Collection {
	constructor(){
		super('publishers');
		this.defaultValue = "".split(', ');
	}
}

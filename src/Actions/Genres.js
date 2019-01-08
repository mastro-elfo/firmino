import Collection from './Collection';

export default class Genres extends Collection {
	constructor(){
		super('genres');
		this.defaultValue = "Antologia Autobiografia Biografia Commedia Didattica Documento Dramma Epico Erotico Fantascienza Fantasy Fiaba Fumetto Giallo Lettera Libro Monografia Narrativa Horror Poema Prosa Racconto Ricettario Romantico Storico Thriller Umorismo".split(' ');
	}
}

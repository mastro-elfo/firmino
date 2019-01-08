
import fs from 'fs';
import {dirname} from 'path';

export function Create (filename, content) {
	return new Promise((resolve, reject) => {
		content = content || '';
		fs.writeFile(filename, content, (err) => {
			if(err){
				// Error creating file
				console.error("Error creating file", filename, err);
				reject(err);
			}
			else {
				// OK
				resolve();
			}
		});
	});
}

export function Read (filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, content) => {
			if(err){
				// Error reading file
				console.error("Error reading file", filename, err);
				reject(err);
			}
			else {
				// OK
				resolve(content);
			}
		});
	});
}

export function Update (filename, content) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, content, (err) => {
			if(err){
				// Error writing file
				console.error("Error writing file", filename, err);
				reject(err);
			}
			else {
				// OK
				resolve();
			}
		});
	});
}

export function Delete (filename) {
	return new Promise((resolve, reject) => {
		fs.unlink(filename, (err) => {
			if(err){
				// Error deleting file
				console.error("Error deleting file", filename, err);
				reject(err);
			}
			else {
				// OK
				resolve();
			}
		});
	});
}

export function Stats (filename) {
	return new Promise((resolve, reject) => {
		fs.stat(filename, (err, stats) => {
			if(err){
				// Error stat-ing file
				console.error("Error stat-ing file", filename, err);
				reject(err);
			}
			else {
				resolve(stats);
			}
		})
	});
}


import fs from 'fs';

const FILES = 'authors books genres loans positions publishers users'
.split(' ')
.map(file => `data/${file}.json`);

export function Create (filename) {
	return new Promise((resolve, reject) => {
		let backup = {};
		FILES.forEach(file => {
			backup[file] = fs.readFileSync(file, {encoding: 'utf8'});
		});
		try {
			const content = JSON.stringify(backup);
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
		}
		catch(err){
			reject(err);
		}
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
				try {
					const json = JSON.parse(content);
					FILES.forEach(file => {
						fs.writeFileSync(file, json[file], (err) => {
							if(err){
								// Error writing file
								console.error("Error writing file", filename, err);
								reject(err);
							}
							else {
							}
						});
					});
					resolve(content);
				}
				catch(err) {
					reject(err);
				}
			}
		});
	});
}

export function Stats () {
	return FILES.map(file => {
		return ({
			file,
			size: fs.statSync(file).size
		});
	});
}

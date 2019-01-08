export default function explode(search){
	search = decodeURI(search);
	if(search.startsWith('?')) {
		search = search.substring(1);
	}
	return (
		search.split('&')
		.map(token => token.split('='))
		.reduce((obj, curr) => {
			obj[curr[0]] = curr[1];
			return obj;
		}, {})
	);
}

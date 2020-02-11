/**
 * Tools
 * @author: Arie M. Prasetyo (2020)
 */

/**
 * Return number from formatted rupiah price
 * @param {string} str price with a format of 'Rp xxx.xxx'
 */
const formattedStrToNumber = str => {
	if (str === '') return 0;

	const stripped = str
		.substring(3, str.length)
		.replace(/[$.]+/g, '');

	return stripped ? Number(stripped) : 0;
};


export {
	formattedStrToNumber
};
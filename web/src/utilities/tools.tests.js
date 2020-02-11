import {assert} from 'chai';
import {formattedStrToNumber} from './tools';

const {equal} = assert;

/**
 * tests for utilites functions
 * ie.
 * * formattedStrToNumber()
 */
describe('tests for utilities functions', () => {

	it('return a correct number, thousand', () => {
		const result = formattedStrToNumber('Rp 512.345');
		const expected = 512345;

		equal(typeof result, 'number');
		equal(result, expected);
	});

	it('return a correct number, million', () => {
		const result = formattedStrToNumber('Rp 1.250.345');
		const expected = 1250345;

		equal(typeof result, 'number');
		equal(result, expected);
	});

});
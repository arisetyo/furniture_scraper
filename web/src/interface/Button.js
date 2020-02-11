/**
 * simple button component
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react';
import styles from './Button.css';

/**
 * Button
 * A generic button component
 * @param {object} param props
 */
const Button = ({children, onClick, disabled = false, addStyle}) => (
	<button
		disabled={disabled}
		className={`${styles.Button} ${addStyle ? addStyle : ''}`}
		onClick={e => {
			e.preventDefault;
			onClick();
		}}
	>
		{children}
	</button>
);

export default Button;
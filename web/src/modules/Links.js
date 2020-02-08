/**
 * Links module
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react';
import {Link} from "react-router-dom";
import styles from './Links.css';

const Links = () => {

	return (
		<div className={styles.Links}>
			Links
			
			<div className={styles.linkContainer}>
				<div className={styles.linkItem}>
					<Link to="/details/1">Detail 1</Link>
				</div>
				<div className={styles.linkItem}>
					<Link to="/details/2">Detail 2</Link>
				</div>
			</div>
		</div>
	)
}

export default Links;
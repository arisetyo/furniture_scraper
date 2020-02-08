/**
 * Links module
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {dummyData} from '../utilities/constants';
import styles from './Links.css';

const Links = () => {

	const data = dummyData;

	return (
		<div className={styles.Links}>
			<h1>Links</h1>
			
			<div className={styles.linkContainer}>
				{
					data && data.map( ({id, url, name, price, description}) => (
						<div className={styles.linkItem}>
							<h2>{name}</h2>
							<h3>{price}</h3>
							<p>{description}</p>
							<Link to={`/details/${id}`}>See Detail</Link>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Links;
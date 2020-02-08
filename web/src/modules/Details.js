/**
 * Details module
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react';
import {useParams} from 'react-router-dom';
import {dummyData} from '../utilities/constants';
import styles from './Details.css';

const Details = () => {
	const {detailId} = useParams();
	const data = dummyData && dummyData.find(i => i.id === Number(detailId));

	let result;
	if (data) {
		const {id, url, name, price, description} = data;
		result = (
			<div>
				<h1>{name}</h1>
				<h2>{price}</h2>
				<p>{description}</p>
				<h3>{url}</h3>
			</div>
		)
	} else {
		result = <h1>Data not found</h1>;
	}

	return (
		<div className={styles.Details}>
			{result}
		</div>
	)
}

export default Details;
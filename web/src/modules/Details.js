/**
 * Details module
 * @author: Arie M. Prasetyo (2020)
 */

import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {db_url, db_endpoint} from '../utilities/constants';
import styles from './Details.css';

const Details = () => {
	const [result, setResult] = useState();

	const drawData = data => {
		if (result) return;

		let ret;
		if (data) {
			const {url, name, price, description} = data;
			ret = (
				<div>
					<h1>{name}</h1>
					<h2>{price}</h2>
					<p>{description}</p>
					<h3>{url}</h3>
				</div>
			)
		} else {
			ret = <h1>Data not found</h1>;
		}

		setResult(ret);
	};

	const {link} = useParams();

	fetch(db_url + db_endpoint + `/detail?link=${link}`)
		.then(response => response.json())
		.then(drawData);
	

	return (
		<div className={styles.Details}>
			{result}
		</div>
	)
}

export default Details;
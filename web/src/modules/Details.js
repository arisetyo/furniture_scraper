/**
 * Details module
 * @author: Arie M. Prasetyo (2020)
 */

import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {db_url, db_endpoint} from '../utilities/constants';
import {LineChart} from '../interface';
import styles from './Details.css';

const Details = () => {
	const [result, setResult] = useState();

	const drawData = data => {
		if (result) return;

		const chartData = [1150000, 950000, 1100000, 1200000, 980000, 1200000];

		const ret = data ? <Item {...data} chartData={chartData}/> : <h1>Data not found</h1>;
		setResult(ret);
	};

	const {id} = useParams();
	// load the link's data first
	fetch(db_url + db_endpoint + `/link?id=${id}`)
		.then(response => response.json())
		.then(drawData);

	return (
		<div className={styles.Details}>
			{result}
		</div>
	)
}

const Item = ({url, name, price, description, image_main, image_sec, image_tert, chartData}) => {
	return (
		<div className={styles.item}>
			<div className={styles.content}>
				<div className={styles.info}>
					<h1>{name}</h1>
					<h2>{price}</h2>
					<p>{description}</p>
					<p>URL: <a href={url} target="_blank">{url}</a></p>
				</div>
				<div className={styles.imageContainer}>
					<img src={image_main}/>
					<img src={image_sec}/>
					<img src={image_tert}/>
				</div>
			</div>
			<div className={styles.chart}>
				<h3>Price movement</h3>
				<LineChart data={chartData}/>
			</div>
		</div>
	)
};

export default Details;
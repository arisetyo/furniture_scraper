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
	const {id} = useParams(); // link collection id
	const [result, setResult] = useState();
	const [prices, setPrices] = useState();

	// return number from formatted rupiah price
	const formattedStrToNumber = str => {
		if (str === '') return 0;

		const stripped = str
			.substring(3, str.length)
			.replace(/[$.]+/g, '');

		return stripped ? Number(stripped) : 0;
	};


	// render component for product info
	const drawData = data => {
		if (result) return;

		const ret = data ? <Item {...data}/> : <h1>Data not found</h1>;
		setResult(ret);
	};

	// get data for chart
	const drawChart = data => {
		if (prices) return;

		const chartData = data.map(d => (formattedStrToNumber(d.price)));
		setPrices(chartData)
	}

	// load the price data
	fetch(db_url + db_endpoint + `/detail?link=${id}`)
		.then(response => response.json())
		.then(drawChart);
	
	// load the link's data
	fetch(db_url + db_endpoint + `/link?id=${id}`)
		.then(response => response.json())
		.then(drawData);

	return (
		<div className={styles.Details}>
			{result}

			<div className={styles.chart}>
				<h3>Price movement</h3>
				{prices ? <LineChart data={prices}/> : ''}
			</div>
		</div>
	)
}

const Item = ({url, name, price, description, image_main, image_sec, image_tert}) => {
	return (
		<div className={styles.item}>
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
	)
};

export default Details;
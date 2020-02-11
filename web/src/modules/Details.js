/**
 * Details module
 * @author: Arie M. Prasetyo (2020)
 */

import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {db_url, db_endpoint} from '../utilities/constants';
import {formattedStrToNumber} from '../utilities/tools';
import {LineChart} from '../interface';
import styles from './Details.css';

/**
 * Details
 * This component show the detail of the saved link.
 * The page shows the product's (from the link) name, price, and description
 * as well as the source url and some preview images.
 * 
 * The component also has a chart showing the price values gathered hourly
 * since the url is saved
 */
const Details = () => {
	const {id} = useParams(); // link collection id
	const [result, setResult] = useState();
	const [prices, setPrices] = useState();

	/**
	 * render component for product info
	 * @param {array} data Product data
	 */
	const drawData = data => {
		if (result) return;

		const ret = data ? <Item {...data}/> : <h1>Data not found</h1>;
		setResult(ret);
	};

	/**
	 * get data for the chart component
	 * @param {array} data Prices gathered each hour for this product
	 */
	const drawChart = data => {
		if (prices) return;

		if (data) {
			const chartData = data.map(d => ({time: d.createdAt, price: formattedStrToNumber(d.price)}));
			setPrices(chartData)
		}
	}

	/**
	 * load the price data from backend
	 */
	fetch(db_url + db_endpoint + `/detail?link=${id}`)
		.then(response => response.json())
		.then(drawChart);
	
	/**
	 * load the link's data from backend
	 */
	fetch(db_url + db_endpoint + `/link?id=${id}`)
		.then(response => response.json())
		.then(drawData);

	return (
		<div className={styles.Details}>
			{result}

			<div className={styles.chart}>
				<h3>Price movement</h3>
				{prices && prices.length ? <LineChart data={prices}/> : ''}
			</div>
		</div>
	)
}

/**
 * Item
 * A component that is rendered once the data is gathered
 * @param {object} param an object containing the url, name, price, description, image_main, image_sec, image_tert values
 */
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
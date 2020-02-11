/**
 * Home module
 * @author: Arie M. Prasetyo (2020)
 */

import React, {useState} from 'react';
import styles from './Home.css';
import {db_url, db_endpoint} from '../utilities/constants';
import {Button} from '../interface';

/**
 * Home
 * The homepage component
 * Shows a form to input the URL to be scraped and aggregated
 */
const Home = () => {
	const [url, setUrl] = useState();
	const [info, setInfo] = useState('');
	
	/**
	 * Text input event handler
	 * @param {event} e Text input event
	 */
	const updateUrl = e => {
		setUrl(e.target.value);
	}

	/**
	 * Send the URL to backend to be processed
	 */
	const storeUrl = () => {
		if (!url || url === '') {
			setInfo(`URL cannot be blank`);
			return;
		}
		
		setInfo(`Sending "${url}" to server...`);

		// saving link
		fetch(db_url + db_endpoint + '/link', {
			method: 'POST',
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {'Content-Type': 'application/json'},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({url})
		})
		.then(response => response.json())
		.then(data => {
			setInfo('Scraping & aggregation successful');
		});
	}

	return (
		<div className={styles.Home}>
			<h1>Enter a URL:</h1>
			
			<div class={styles.input}>
				<input
					type='text'
					placeholder='example: https://fabelio.com/ip/blossom-desk.html'
					value={url}
					onChange={updateUrl}/>

				<Button onClick={storeUrl}>Scrap &amp; Aggregate</Button>
			</div>

			<h2>{info}</h2>
		</div>
	)
}

export default Home;
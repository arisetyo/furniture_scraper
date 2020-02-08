/**
 * Home module
 * @author: Arie M. Prasetyo (2020)
 */

import React, {useState} from 'react';
import styles from './Home.css';
import {Button} from '../interface';

const Home = () => {
	const [url, setUrl] = useState();
	const [info, setInfo] = useState('');
	
	const updateUrl = e => {
		setUrl(e.target.value);
	}

	const storeUrl = () => {
		if (!url || url === '') {
			setInfo(`URL cannot be blank`);
			return;
		}
		
		setInfo(`Sending ${url} to server...`);
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
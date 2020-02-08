/**
 * Links module
 * @author: Arie M. Prasetyo (2020)
 */

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {db_url, db_endpoint} from '../utilities/constants';
import {dummyData} from '../utilities/constants';
import styles from './Links.css';

const Links = () => {
	const [links, setLinks] = useState();

	fetch(db_url + db_endpoint + '/links')
		.then(response => response.json())
		.then(data => {
			if (!links) setLinks(data);
		});

	return (
		<div className={styles.Links}>
			<h1>Scraped Links</h1>
			
			<div className={styles.linkContainer}>
				{
					links && links.map( ({_id, url}) => (
						<div className={styles.linkItem}>
							<h4>{url}</h4>
							<Link to={`/details/${_id}`}>See Detail</Link>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Links;
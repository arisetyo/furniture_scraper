/**
 * Details module
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react';
import {useParams} from 'react-router-dom';
import styles from './Details.css';

const Details = () => {
	const {detailId} = useParams();

	return (
		<div className={styles.Details}>
			Details {`${detailId}`}
		</div>
	)
}

export default Details;
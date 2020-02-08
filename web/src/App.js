/**
 * main app
 * @author: Arie M. Prasetyo (2020)
 */

import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Content, Home, Navigation} from './chrome';
import {Links, Details} from './modules';
import styles from './App.css';

const App = () => (
	<HashRouter>
		<div className={styles.App}>
			<Navigation/>
			<Content>
				<Route path="/" exact component={Home} />
				<Route path="/links" exact component={Links} />
				<Route path="/details/:detailId" component={Details}/>
			</Content>
		</div>
	</HashRouter>
);

export default App;
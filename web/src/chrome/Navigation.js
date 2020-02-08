/**
 * navigation bar
 * @author: Arie M. Prasetyo (2020)
 */

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import styles from './Navigation.css';

class Navigation extends Component {
	state = {};

	render() {
		return (
			<div className={styles.Navigation}>
				<Link to="/">
					<div className={styles.logo}>
						LOGO
					</div>
				</Link>
			</div>
		);
	}
}

export default connect(
	state => ({
		user: state && state.user
	}),
	null
)(Navigation);
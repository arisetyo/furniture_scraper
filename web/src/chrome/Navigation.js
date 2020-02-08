/**
 * navigation bar
 * @author: Arie M. Prasetyo (2020)
 */

import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styles from './Navigation.css';

class Navigation extends Component {
	state = {};

	render() {
		const curPath = this.props.location.pathname;

		return (
			<div className={styles.Navigation}>
				<ul>
					<li className={curPath === '/' ? styles.selected : ''}><Link to="/">Home</Link></li>
					<li className={curPath === '/links' ? styles.selected : ''}><Link to="/links">Links</Link></li>
					{
						curPath.substr(0, 8) === '/details' ?
						<li className={`${styles.selected} ${styles.detail}`}>Detail</li> :
						''
					}
				</ul>
			</div>
		);
	}
}

export default withRouter(connect(
	state => ({
		user: state && state.user
	}),
	null
)(Navigation));
import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<ul>
				<NavLink
					activeClassName='activeNavLink'
					className="navLink"
					exact to='/'
				>
					home
				</NavLink>
				<NavLink
					activeClassName='activeNavLink'
					className="navLink"
					to='/shorten/'
				>
					shorten
				</NavLink>
				<NavLink
					activeClassName='activeNavLink'
					className="navLink"
					exact to='/stats/'
				>
					stats
				</NavLink>
			</ul>
		</nav>
	);
}

export default Navbar;
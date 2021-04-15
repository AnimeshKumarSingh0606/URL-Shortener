import  React from 'react';
import Navbar from "./Navbar";

const Layout = ({children}) => {
	return (
		<div className="layout-root">
			<Navbar/>
			{children}
		</div>
	);
};

export default Layout;
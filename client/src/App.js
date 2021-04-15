import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Layout from "./components/Layout";
import StatFinder from "./routes/StatFinder/";
import Stats from "./routes/Stats/";
import Shorten from "./routes/Shorten/";
import Redirect from "./routes/Redirect/";
import Index from "./routes/Home/";

function App() {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/"><Index/></Route>
					<Route exact path="/stats/"><StatFinder/></Route>
					<Route path="/stats/*"><Stats/></Route>
					<Route path="/shorten"><Shorten/></Route>
					<Route path="/*"><Redirect/></Route>
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;

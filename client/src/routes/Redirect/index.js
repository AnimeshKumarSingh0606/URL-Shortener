import React, {useState, useEffect} from 'react';
import {getStats} from "../../helpers/httpRequests";

const Index = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [url, setUrl] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		async function getData() {
			setIsLoading(true);
			const {data} = await getStats(getURLFromPath())
				.catch(err => {
					setErrorMessage("Error occured while fetching data from API");
					console.error(err);
				});

			if(data.status === "error") {
				setErrorMessage("Short URL not found!");
				return;
			}
			setTimeout(() => {
				if (!data.url.startsWith("http")) {
					window.location.replace("https://" + data.url);
				} else {
					window.location.replace(data.url);
				}
			}, 3 * 1000);
			setUrl(data.url);
			setIsLoading(false);
		}

		getData();
	}, []);


	const getURLFromPath = () => {
		const browserURL = window.location.pathname;
		return browserURL.slice(1, browserURL.length);
	};

	return (
		<main className="redirect">
			<>
				<h1>Please wait while we figure out the complex API calls</h1>
				{
					isLoading && !errorMessage.length ?
						<img
							className="spinner"
							src={process.env.PUBLIC_URL + "/loading.svg"}
							alt="spinner"

						/>
						: !errorMessage.length ?
						<h2>All done! Redirecting you to
							<a
								className="redirectionUrl"
								href={url}
							> {url}
							</a>
						</h2>
						:
						<h1>{errorMessage}</h1>
				}
			</>
		</main>
	)
};
export default Index;
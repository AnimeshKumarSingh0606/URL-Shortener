import axios from "axios";

export const shorten = (short, long) => {
	return axios.post('/api/create', {
			short,
			url: long
		}
	)
};


export const getStats = shortURL => axios.get(`/api/stats/${shortURL}`);

export const incrementView = shortURL => axios.post('/api/increment', { short_url: shortURL });

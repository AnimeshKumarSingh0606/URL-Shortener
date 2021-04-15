import  React from 'react';

const Popup = ({message, error}) => {
	return (
			<div className={error ? 'popup error' : 'popup success'}>
				<span>{message}</span>
			</div>
	);
};

export default Popup;
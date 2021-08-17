import { Typography } from '@material-ui/core';
import React from 'react';

const PortfolioValue = ({ value }) => {
	return (
		<span>
			<Typography>Portfolio Value: {value}</Typography>
		</span>
	);
};

export default PortfolioValue;

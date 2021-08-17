import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const SearchInput = ({ globalFilter, setGlobalFilter }) => {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);
	return (
		<span>
			<TextField
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				label='Search ...'
			/>
		</span>
	);
};

export default SearchInput;

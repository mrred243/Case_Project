import { TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateData,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		updateData(index, id, value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	if (id === 'PositionValue') return <Typography>{value}</Typography>;

	return <TextField value={value} onChange={onChange} onBlur={onBlur} />;
};

export default EditableCell;

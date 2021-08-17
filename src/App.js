import React, { useState, useEffect } from 'react';

import { CSVReader } from 'react-papaparse';

import Table from './components/Table';

function App() {
	const [columns, setColumns] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [portfolioValue, setPortfolioVal] = useState(null);

	const [skipPageReset, setSkipPageReset] = useState(false);

	useEffect(() => {
		setSkipPageReset(false);
	}, [tableData]);

	// handle file upload

	const handleOnDrop = (data) => {
		if (!data) return null;
		data = data.map((item) => item.data);

		data = data.map((item) => {
			const newItem = {
				...item,
				PositionValue: positionValueCal(item),
			};
			return newItem;
		});

		const headers = Object.keys(data[0]);
		let newColumns = headers.map((header) => {
			return { Header: header, accessor: header };
		});

		setColumns(newColumns);
		setTableData(data);
		setPortfolioVal(portfolioValueCal(data));
	};

	const handleOnError = (err, file, inputElem, reason) => {
		console.log(err);
	};

	const handleOnRemoveFile = (data) => {};

	// Calculation and Utils Functions

	const positionValueCal = (item) => {
		if (typeof item !== 'object' || item === null) return null;
		let positionValue =
			Number(replaceNumberSeparation(item.Holding)) *
			Number(replaceNumberSeparation(item.FXRate)) *
			Number(replaceNumberSeparation(item.Price));
		positionValue = positionValue.toFixed(2);
		return Number(positionValue);
	};

	const replaceNumberSeparation = (string) => {
		string = string.replace('.', '');
		string = string.replace(',', '.');
		return string;
	};

	const portfolioValueCal = (array) => {
		if (!Array.isArray(array)) return null;
		let value = 0;
		for (let x of array) {
			value += x.PositionValue;
		}
		return value;
	};

	const updateData = (rowIndex, columnId, value) => {
		if (!columnId || !value) return null;
		setSkipPageReset(true);
		let newData = tableData.map((row, index) => {
			if (index === rowIndex) {
				let newRow = {
					...tableData[rowIndex],
					[columnId]: value,
				};
				if (
					columnId === 'Holding' ||
					columnId === 'FXRate' ||
					columnId === 'Price'
				) {
					newRow = {
						...newRow,
						PositionValue: positionValueCal(newRow),
					};
				}
				return newRow;
			}
			return row;
		});
		setTableData(newData);
		setPortfolioVal(portfolioValueCal(newData));
	};

	return (
		<div>
			<h3>Hello World</h3>
			<CSVReader
				onDrop={handleOnDrop}
				onError={handleOnError}
				addRemoveButton
				config={{ header: true }}
				onRemoveFile={handleOnRemoveFile}>
				<span>Drop CSV file here or click to upload.</span>
			</CSVReader>
			{tableData && columns ? (
				<Table
					columns={columns}
					data={tableData}
					portfolioValue={portfolioValue}
					updateData={updateData}
					skipPageReset={skipPageReset}
				/>
			) : null}
		</div>
	);
}

export default App;

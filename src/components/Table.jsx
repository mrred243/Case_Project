import React from 'react';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useGlobalFilter, useTable } from 'react-table';
import SearchInput from './SearchInput';
import PortfolioValue from './PortfolioValue';
import EditableCell from './EditableCell';

const defaultColumn = {
	Cell: EditableCell,
};

function Table({ columns, data, portfolioValue, updateData, skipPageReset }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state,
		visibleColumns,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			updateData,
			autoResetPage: !skipPageReset,
		},
		useGlobalFilter,
	);

	// Render the UI for your table
	return (
		<MaUTable {...getTableProps()}>
			<TableHead>
				<TableRow>
					<TableCell colSpan={visibleColumns.length + 1}>
						<SearchInput
							globalFilter={state.globalFilter}
							setGlobalFilter={setGlobalFilter}
						/>
					</TableCell>
				</TableRow>
				{portfolioValue ? (
					<TableRow>
						<TableCell colSpan={visibleColumns.length + 1}>
							<PortfolioValue value={portfolioValue} />
						</TableCell>
					</TableRow>
				) : null}

				{headerGroups.map((headerGroup) => (
					<TableRow {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<TableCell {...column.getHeaderProps()}>
								{column.render('Header')}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableHead>
			<TableBody>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<TableRow {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<TableCell {...cell.getCellProps()}>
										{cell.render('Cell')}
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
			</TableBody>
		</MaUTable>
	);
}

export default Table;

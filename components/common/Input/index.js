import React, { memo, useState } from 'react';
import { FilledInput } from '@material-ui/core';

export const MyFilledInput = memo(
	({ ref, value, setter, text, type = 'text', ...otherProps }) => {
		const [state, setState] = useState(value);
		const handleChange = (e) => {
			setState(e.target.value);
		};
		return (
			<FilledInput
				{...otherProps}
				type={type}
				label={text}
				value={state}
				onChange={handleChange}
			/>
		);
	},
);

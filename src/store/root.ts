import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RootState {}

const initialState: RootState = {}

export const root = createSlice({
	name: 'root',
	initialState,
	reducers: {
		// add function here
	},
})

export const {
	/* export function here */
} = root.actions

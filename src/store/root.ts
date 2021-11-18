import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INewEntry } from '../types'

export type IModalType = 'create' | 'edit' | 'view' | null
export interface IRootState {
	currentEntry: INewEntry | null
	modalType: IModalType
}

const initialState: IRootState = {
	currentEntry: null,
	modalType: null,
}

export const root = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<IModalType>) => {
			state.modalType = action.payload
		},
		setCurrentEntry: (state, action: PayloadAction<INewEntry | null>) => {
			state.currentEntry = action.payload
		},
		updateCurrentEntry: (state, action: PayloadAction<object>) => {
			state.currentEntry = { ...state.currentEntry, ...action.payload } as INewEntry
		},
	},
})

export const { setCurrentEntry, updateCurrentEntry, setModalType } = root.actions

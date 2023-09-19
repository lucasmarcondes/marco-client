import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IEntry, IModalType, IProperty, ITemplate, IToastMessage } from '../types'

export interface IRootState {
	currentEntry: IEntry | null
	currentTemplate: ITemplate | null
	currentProperty: IProperty | null
	modalType: IModalType
	toastMessages: IToastMessage[]
}

const initialState: IRootState = {
	currentEntry: null,
	currentTemplate: null,
	currentProperty: null,
	modalType: null,
	toastMessages: []
}

export const root = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<IModalType>) => {
			state.modalType = action.payload
		},
		setCurrentProperty: (state, action: PayloadAction<IProperty | null>) => {
			state.currentProperty = action.payload
		},
		setCurrentEntry: (state, action: PayloadAction<IEntry | null>) => {
			state.currentEntry = action.payload
		},
		updateCurrentEntry: (state, action: PayloadAction<IEntry>) => {
			state.currentEntry = { ...state.currentEntry, ...action.payload }
		},
		setCurrentTemplate: (state, action: PayloadAction<ITemplate>) => {
			state.currentTemplate = action.payload
		},
		updateCurrentTemplate: (state, action: PayloadAction<ITemplate>) => {
			state.currentTemplate = { ...state.currentTemplate, ...action.payload }
		},
		pushToastMessage: (state, action: PayloadAction<IToastMessage>) => {
			action.payload.id = new Date().valueOf() + ''
			state.toastMessages.push(action.payload)
		},
		removeToastMessage: (state, action: PayloadAction<IToastMessage>) => {
			state.toastMessages = state.toastMessages.filter((item) => item.id != action.payload.id)
		}
	}
})

export const {
	setCurrentEntry,
	setCurrentProperty,
	updateCurrentEntry,
	updateCurrentTemplate,
	setCurrentTemplate,
	setModalType,
	removeToastMessage,
	pushToastMessage
} = root.actions

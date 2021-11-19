import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INewEntry, IModalType, INotificationType } from '../types'

export interface IRootState {
	currentEntry: INewEntry | null
	modalType: IModalType
	notifications: INotificationType[]
}

const initialState: IRootState = {
	currentEntry: null,
	modalType: null,
	notifications: [],
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
		pushNotification: (state, action: PayloadAction<INotificationType>) => {
			action.payload.id = new Date().valueOf() + ''
			state.notifications.push(action.payload)
		},
		removeNotification: (state, action: PayloadAction<INotificationType>) => {
			state.notifications = state.notifications.filter(item => item.id != action.payload.id)
		},
	},
})

export const { setCurrentEntry, updateCurrentEntry, setModalType, removeNotification, pushNotification } = root.actions

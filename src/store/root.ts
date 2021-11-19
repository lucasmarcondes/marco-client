import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INewEntry, IModalType, INotificationType } from '../types'

const DefaultNotificationTimeout = 5000

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
			state.notifications.push(action.payload)
			setTimeout(
				() => {
					state.notifications.splice(state.notifications.indexOf(action.payload), 1)
				},
				action.payload.timeout ? action.payload.timeout : DefaultNotificationTimeout
			)
		},
		removeNotification: (state, action: PayloadAction<INotificationType>) => {
			state.notifications.splice(state.notifications.indexOf(action.payload), 1)
		},
	},
})

export const { setCurrentEntry, updateCurrentEntry, setModalType, removeNotification, pushNotification } = root.actions

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from './api'
import { root } from './root'

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		root: root.reducer,
	},
	middleware: getDefaultMiddleware => [...getDefaultMiddleware(), api.middleware],
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

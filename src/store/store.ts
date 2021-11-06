import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { userApi } from '../api/user'
import { entryApi } from '../api/entry'
import { templateApi } from '../api/template'

export const store = configureStore({
	reducer: {
		[userApi.reducerPath]: userApi.reducer,
		[entryApi.reducerPath]: entryApi.reducer,
		[templateApi.reducerPath]: templateApi.reducer,
	},
	middleware: getDefaultMiddleware => [...getDefaultMiddleware(), userApi.middleware, entryApi.middleware, templateApi.middleware],
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

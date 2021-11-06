import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Entry } from '../types'

export interface MessageResponse {
	msg: string
}

export const entryApi = createApi({
	reducerPath: 'entryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3030/api/entry/',
		credentials: 'include',
	}),
	endpoints: builder => ({
		entries: builder.query<Array<Entry>, void>({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
		}),
		create: builder.mutation<Entry, Entry>({
			query: entry => ({
				url: '/',
				method: 'POST',
				body: entry,
			}),
		}),

		update: builder.mutation<Entry, Entry>({
			query: entry => ({
				url: `/${entry._id}`,
				method: 'PUT',
				body: entry,
			}),
		}),
		remove: builder.mutation<MessageResponse, string>({
			query: id => ({
				url: `/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const { useEntriesQuery, useCreateMutation, useUpdateMutation, useRemoveMutation } = entryApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, ITemplate, IEntry, INewEntry } from '../types'

export interface ILoginRequest {
	email: string
	password: string
}

export interface IRegisterRequest {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3030/api/',
		credentials: 'include',
	}),
	tagTypes: ['User', 'Entry', 'Template'],
	endpoints: builder => ({
		getUser: builder.query<IUser, void>({
			query: () => ({
				url: 'user',
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
		register: builder.mutation<IUser, IRegisterRequest>({
			query: credentials => ({
				url: 'user',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		login: builder.mutation<string, ILoginRequest>({
			query: credentials => ({
				url: 'user/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'user/logout',
				method: 'POST',
			}),
			invalidatesTags: ['User'],
		}),
		getEntries: builder.query<IEntry[], void>({
			query: () => ({
				url: 'entry',
				method: 'GET',
			}),
			providesTags: ['Entry'],
		}),
		createEntry: builder.mutation<IEntry, INewEntry>({
			query: entry => ({
				url: 'entry',
				method: 'POST',
				body: entry,
			}),
			invalidatesTags: ['Entry'],
		}),

		updateEntry: builder.mutation<IEntry, INewEntry>({
			query: entry => ({
				url: `entry/${entry._id}`,
				method: 'PUT',
				body: entry,
			}),
			invalidatesTags: ['Entry'],
		}),
		removeEntry: builder.mutation<string, string>({
			query: id => ({
				url: `entry/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Entry'],
		}),
		getTemplates: builder.query<ITemplate[], void>({
			query: () => ({
				url: 'template',
				method: 'GET',
			}),
			providesTags: ['Template'],
		}),
		createTemplate: builder.mutation<ITemplate, Omit<ITemplate, '_id'>>({
			query: template => ({
				url: 'template',
				method: 'POST',
				body: template,
			}),
			invalidatesTags: ['Template'],
		}),

		updateTemplate: builder.mutation<ITemplate, ITemplate>({
			query: template => ({
				url: `template/${template._id}`,
				method: 'PUT',
				body: template,
			}),
			invalidatesTags: ['Template'],
		}),
		removeTemplate: builder.mutation<void, string>({
			query: id => ({
				url: `template/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Template'],
		}),
	}),
})

export const {
	useGetUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,

	useGetEntriesQuery,
	useCreateEntryMutation,
	useUpdateEntryMutation,
	useRemoveEntryMutation,

	useGetTemplatesQuery,
	useCreateTemplateMutation,
	useUpdateTemplateMutation,
	useRemoveTemplateMutation,
} = api

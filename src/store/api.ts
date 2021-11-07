import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User, Template, Entry } from '../types'

export interface LoginRequest {
	email: string
	password: string
}

export interface RegisterRequest {
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
		getUser: builder.query<User, void>({
			query: () => ({
				url: 'user',
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
		register: builder.mutation<User, RegisterRequest>({
			query: credentials => ({
				url: 'user',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['User'],
		}),
		login: builder.mutation<User, LoginRequest>({
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
		getEntries: builder.query<Entry[], void>({
			query: () => ({
				url: 'entry',
				method: 'GET',
			}),
			providesTags: ['Entry'],
		}),
		createEntry: builder.mutation<Entry, Omit<Entry, '_id'>>({
			query: entry => ({
				url: 'entry',
				method: 'POST',
				body: entry,
			}),
			invalidatesTags: ['Entry'],
		}),

		updateEntry: builder.mutation<Entry, Entry>({
			query: entry => ({
				url: `entry/${entry._id}`,
				method: 'PUT',
				body: entry,
			}),
			invalidatesTags: ['Entry'],
		}),
		removeEntry: builder.mutation<void, string>({
			query: id => ({
				url: `entry/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Entry'],
		}),
		getTemplates: builder.query<Template[], void>({
			query: () => ({
				url: 'template',
				method: 'GET',
			}),
			providesTags: ['Template'],
		}),
		createTemplate: builder.mutation<Template, Omit<Template, '_id'>>({
			query: template => ({
				url: 'template',
				method: 'POST',
				body: template,
			}),
			invalidatesTags: ['Template'],
		}),

		updateTemplate: builder.mutation<Template, Template>({
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

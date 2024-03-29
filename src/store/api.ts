import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AppResponse, IEntry, ITemplate, IUser } from '../types'

export interface ILoginRequest {
	email: string
	password: string
}

export interface IConfirmationEmailRequest {
	type: string
	email?: string
}
export interface IResetPasswordRequest {
	token: string
	password: string
	confirmPassword: string
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
		credentials: 'include'
	}),
	tagTypes: ['User', 'Entry', 'Template', 'Notification'],
	endpoints: (builder) => ({
		getUser: builder.query<IUser, void>({
			query: () => ({
				url: 'user',
				method: 'GET'
			}),
			providesTags: ['User'],
			transformResponse: (response: AppResponse) => {
				return response.data
			}
		}),
		updateUser: builder.mutation<AppResponse, IUser>({
			query: (credentials) => ({
				url: 'user',
				method: 'PUT',
				body: credentials
			}),
			invalidatesTags: ['User']
		}),
		register: builder.mutation<AppResponse, IRegisterRequest>({
			query: (credentials) => ({
				url: 'user',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['User']
		}),
		sendConfirmationEmail: builder.mutation<AppResponse, IConfirmationEmailRequest>({
			query: (req) => ({
				url: 'user/sendConfirmationEmail',
				method: 'PUT',
				body: req
			})
		}),
		verifyEmail: builder.mutation<AppResponse, string>({
			query: (token) => ({
				url: `verify/${token}`,
				method: 'PUT'
			}),
			// transformResponse: (response: AppResponse) => {
			// 	return response.data
			// },
			invalidatesTags: ['User']
		}),
		resetPassword: builder.mutation<AppResponse, IResetPasswordRequest>({
			query: (req) => ({
				url: 'user/resetPassword',
				method: 'PUT',
				body: req
			}),
			invalidatesTags: ['User']
		}),
		login: builder.mutation<AppResponse, ILoginRequest>({
			query: (credentials) => ({
				url: 'user/login',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['User']
		}),
		logout: builder.mutation<AppResponse, void>({
			query: () => ({
				url: 'user/logout',
				method: 'POST'
			}),
			invalidatesTags: ['User']
		}),
		getEntries: builder.query<IEntry[], void>({
			query: () => ({
				url: 'entry',
				method: 'GET'
			}),
			providesTags: ['Entry'],
			transformResponse: (response: AppResponse) => {
				return response.data
			}
		}),
		createEntry: builder.mutation<IEntry, IEntry>({
			query: (entry) => ({
				url: 'entry',
				method: 'POST',
				body: entry
			}),
			invalidatesTags: ['Entry']
		}),

		updateEntry: builder.mutation<AppResponse, IEntry>({
			query: (entry) => ({
				url: `entry/${entry._id}`,
				method: 'PUT',
				body: entry
			}),
			invalidatesTags: ['Entry']
		}),
		removeEntry: builder.mutation<AppResponse, string>({
			query: (id) => ({
				url: `entry/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Entry']
		}),
		getTemplates: builder.query<ITemplate[], void>({
			query: () => ({
				url: 'template',
				method: 'GET'
			}),
			providesTags: ['Template'],
			transformResponse: (response: AppResponse) => {
				return response.data
			}
		}),
		createTemplate: builder.mutation<ITemplate, Omit<ITemplate, '_id'>>({
			query: (template) => ({
				url: 'template',
				method: 'POST',
				body: template
			}),
			invalidatesTags: ['Template']
		}),

		updateTemplate: builder.mutation<AppResponse, ITemplate>({
			query: (template) => ({
				url: `template/${template._id}`,
				method: 'PUT',
				body: template
			}),
			invalidatesTags: ['Template']
		}),
		removeTemplate: builder.mutation<AppResponse, string>({
			query: (id) => ({
				url: `template/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Template']
		})
	})
})

export const {
	useGetUserQuery,
	useUpdateUserMutation,
	useLoginMutation,
	useRegisterMutation,
	useResetPasswordMutation,
	useVerifyEmailMutation,
	useSendConfirmationEmailMutation,
	useLogoutMutation,

	useGetEntriesQuery,
	useCreateEntryMutation,
	useUpdateEntryMutation,
	useRemoveEntryMutation,

	useGetTemplatesQuery,
	useCreateTemplateMutation,
	useUpdateTemplateMutation,
	useRemoveTemplateMutation
} = api

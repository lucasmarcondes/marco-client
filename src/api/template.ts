import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Template } from '../types'

export interface MessageResponse {
	msg: string
}

export const templateApi = createApi({
	reducerPath: 'templateApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3030/api/template/',
		credentials: 'include',
	}),
	endpoints: builder => ({
		templates: builder.query<Array<Template>, void>({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
		}),
		create: builder.mutation<Template, Template>({
			query: template => ({
				url: '/',
				method: 'POST',
				body: template,
			}),
		}),

		update: builder.mutation<Template, Template>({
			query: template => ({
				url: `/${template._id}`,
				method: 'PUT',
				body: template,
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

export const { useTemplatesQuery, useCreateMutation, useUpdateMutation, useRemoveMutation } = templateApi

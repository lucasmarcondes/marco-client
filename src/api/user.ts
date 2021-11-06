import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types'

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

export interface MessageResponse {
	msg: string
}

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3030/api/user/',
		credentials: 'include',
	}),
	endpoints: builder => ({
		register: builder.mutation<MessageResponse, RegisterRequest>({
			query: credentials => ({
				url: '/',
				method: 'POST',
				body: credentials,
			}),
		}),
		login: builder.mutation<MessageResponse, LoginRequest>({
			query: credentials => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: builder.query<MessageResponse, void>({
			query: () => ({
				url: 'logout',
				method: 'GET',
			}),
		}),
		user: builder.query<User, void>({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
		}),
	}),
})

export const { useUserQuery, useLoginMutation, useRegisterMutation } = userApi

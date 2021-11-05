import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types'

export interface UserResponse {
	user: User
}

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

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/user/' }),
	endpoints: builder => ({
		register: builder.mutation<UserResponse, RegisterRequest>({
			query: credentials => ({
				url: '/',
				method: 'POST',
				body: credentials,
			}),
		}),
		login: builder.mutation<UserResponse, LoginRequest>({
			query: credentials => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: builder.mutation<UserResponse, void>({
			query: () => ({
				url: 'logout',
				method: 'GET',
			}),
		}),
		getUser: builder.mutation<UserResponse, void>({
			query: () => ({
				url: '/',
				method: 'GET',
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation } = userApi

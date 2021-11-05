import { useState } from 'react'
import { useLoginMutation } from '../api/user'

export const Login = () => {
	const [login, { isLoading }] = useLoginMutation()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submit = async () => {
		try {
			const response = await login({ email, password }).unwrap()
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex h-screen items-center justify-center'>
			<form onSubmit={submit} method='POST' className='border rounded-md flex flex-col space-y-3 shadow-sm p-8 w-1/4'>
				<div className='font-semibold text-lg'>Login</div>
				<input onChange={e => setEmail(e.target.value)} type='email' placeholder='email' />
				<input onChange={e => setPassword(e.target.value)} type='password' placeholder='password' />
				<button className='primary'>Login</button>
			</form>
		</div>
	)
}

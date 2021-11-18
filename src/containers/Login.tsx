import { useState } from 'react'
import { useLoginMutation } from '../store/api'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
	const [login, { isLoading }] = useLoginMutation()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const submit = async () => {
		try {
			const response = await login({ email, password }).unwrap()
			navigate('/entries')
			console.log(response)
		} catch (err) {
			console.error(err)
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

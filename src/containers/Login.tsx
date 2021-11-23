import { useState } from 'react'
import { useLoginMutation } from '../store/api'
import { useNavigate } from 'react-router-dom'
import { pushToastMessage } from '../store/root'
import { useDispatch } from 'react-redux'

export const Login = () => {
	const [login, { isLoading }] = useLoginMutation()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const submit = async () => {
		setErrors('')
		login({ email, password })
			.unwrap()
			.then(payload => {
				navigate('/entries')
				dispatch(
					pushToastMessage({
						title: 'Success',
						message: payload.message,
						variant: 'success',
						dismissable: true,
					})
				)
			})
			.catch(({ data: error }) => {
				setErrors(error?.message)
			})
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex h-screen items-center justify-center'>
			<div className='border rounded-md shadow-sm p-8 w-1/4'>
				<form onSubmit={submit} method='POST' className='flex flex-col space-y-3'>
					<div className='font-semibold text-lg'>Login</div>
					<input onChange={e => setEmail(e.target.value)} type='email' placeholder='email' />
					<input onChange={e => setPassword(e.target.value)} type='password' placeholder='password' />
					<button className='primary'>Login</button>
				</form>
				<div className='space-y-1 my-3'>
					{errors && <span className=' text-sm text-red-500'>{errors}</span>}
					<>
						<span>Reset password? </span>
						<a className='cursor-pointer text-blue-500  hover:(underline ) ' onClick={() => navigate('/password-reset')}>
							Click here
						</a>
					</>
					<p>
						Don't have an account?{' '}
						<a className='cursor-pointer text-blue-500  hover:(underline ) ' onClick={() => navigate('/register')}>
							Register here
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

import { useState } from 'react'
import { useRegisterMutation } from '../store/api'
import { pushNotification } from '../store/root'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [register, { isLoading }] = useRegisterMutation()

	const submit = async () => {
		setErrors('')
		register(formData)
			.unwrap()
			.then(payload => {
				navigate('/entries')
				dispatch(
					pushNotification({
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
			<form onSubmit={submit} method='POST' className='border rounded-md flex flex-col space-y-3 shadow-sm p-8 w-1/4'>
				<div className='font-semibold text-lg'>Register</div>
				<input
					value={formData.firstName}
					onChange={e => setFormData({ ...formData, firstName: e.target.value })}
					type='text'
					placeholder='First Name'
				/>
				<input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} type='text' placeholder='Last Name' />
				<input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='Email' />
				<input onChange={e => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password' />
				<input onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} type='password' placeholder='Confirm Password' />
				<button className='primary'>Register</button>
				{errors && <span className='my-2 text-sm text-red-500'>{errors}</span>}
				<span>
					Already have an account?{' '}
					<a className='cursor-pointer text-blue-500  hover:(underline ) ' onClick={() => navigate('/login')}>
						Login
					</a>
				</span>
			</form>
		</div>
	)
}

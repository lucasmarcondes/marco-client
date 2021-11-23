import { useState } from 'react'
import { useRegisterMutation } from '../store/api'
import { pushToastMessage } from '../store/root'
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
	const [showResetPassword, setShowResetPassword] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [register, { isLoading }] = useRegisterMutation()

	const submit = async () => {
		setErrors('')
		setShowResetPassword(false)
		register(formData)
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
				if (error.code == 409) {
					setShowResetPassword(true)
				}
				setErrors(error?.message)
			})
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex h-screen items-center justify-center'>
			<div className='border rounded-md  shadow-sm p-8 w-1/4'>
				<form onSubmit={submit} method='POST' className='flex flex-col space-y-3'>
					<div className='font-semibold text-lg'>Register</div>
					<input
						value={formData.firstName}
						onChange={e => setFormData({ ...formData, firstName: e.target.value })}
						type='text'
						placeholder='First Name'
					/>
					<input
						value={formData.lastName}
						onChange={e => setFormData({ ...formData, lastName: e.target.value })}
						type='text'
						placeholder='Last Name'
					/>
					<input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='Email' />
					<input onChange={e => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password' />
					<input onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} type='password' placeholder='Confirm Password' />
					<button className='primary'>Register</button>
				</form>
				<div className='mt-2 '>
					{errors && (
						<span className='text-sm text-red-500'>
							<p>{errors}</p>
							{showResetPassword && (
								<>
									<a className='cursor-pointer text-blue-500  hover:(underline ) ' onClick={() => navigate('/password-reset')}>
										Click here
									</a>{' '}
									<span>if you would like to reset your password</span>
								</>
							)}
						</span>
					)}
					<p>
						Already have an account?{' '}
						<a className='cursor-pointer text-blue-500  hover:(underline ) ' onClick={() => navigate('/login')}>
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

import { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../store/api'
import { pushToastMessage } from '../store/root'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export const NewPassword = () => {
	const [formData, setFormData] = useState({
		token: '',
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()

	const [resetPassword] = useResetPasswordMutation()

	const submit = async () => {
		let token = location.pathname.split('/').pop()
		setErrors('')
		if (!token) return
		resetPassword({ ...formData, token: token })
			.unwrap()
			.then(payload => {
				dispatch(
					pushToastMessage({
						title: 'Success',
						message: payload.message,
						variant: 'success',
						dismissable: true,
					})
				)
				navigate('/login')
			})
			.catch(({ data: error }) => {
				setErrors(error?.message)
			})
	}

	return (
		<div className='flex h-screen items-center justify-center'>
			<div className='border rounded-md  shadow-sm p-8 w-100'>
				<form className='flex flex-col space-y-3'>
					<div className='font-semibold text-lg'>Enter your new password</div>
					<input onChange={e => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password' />
					<input onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} type='password' placeholder='Confirm Password' />
					<button type='button' onClick={submit} className='primary'>
						Change password
					</button>
				</form>
				<div className='space-y-1 mt-2 text-sm'>
					{errors && (
						<span className='text-red-500'>
							<p>{errors}</p>
						</span>
					)}
					<p>
						Go back to login page?{' '}
						<a className='cursor-pointer text-blue-500 hover:(underline ) ' onClick={() => navigate('/login')}>
							Click here
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

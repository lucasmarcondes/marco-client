import { useState } from 'react'
import { useSendConfirmationEmailMutation } from '../store/api'
import { pushToastMessage } from '../store/root'
import { useDispatch } from 'react-redux'

export const PasswordReset = () => {
	const [email, setEmail] = useState('')
	const [sendConfirmationEmail] = useSendConfirmationEmailMutation()
	const dispatch = useDispatch()

	const resetPassword = e => {
		sendConfirmationEmail({
			type: 'passwordReset',
			email: email,
		})
			.unwrap()
			.then(payload => {
				console.log(payload)
				dispatch(
					pushToastMessage({
						title: payload.message,
						dismissable: true,
						variant: 'success',
					})
				)
			})
			.catch(({ data: error }) => {
				dispatch(
					pushToastMessage({
						title: 'Error sending email',
						message: error?.message,
						dismissable: true,
						variant: 'error',
					})
				)
			})
	}

	return (
		<div className='flex h-screen items-center justify-center'>
			<div className='border rounded-md shadow-sm p-8 w-120'>
				<div className='flex flex-col space-y-3'>
					<div className='font-semibold text-lg'>We'll send you an email to reset your password</div>
					<div className='font-semibold text-md'>Enter your email</div>
					<input required value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='email' />
					<button type='button' className='ml-auto w-1/3 primary' onClick={e => resetPassword(e)}>
						Send Email
					</button>
				</div>
			</div>
		</div>
	)
}

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useSendConfirmationEmailMutation } from '../store/api'
import { pushToastMessage } from '../store/root'

export const PasswordReset = () => {
	const [email, setEmail] = useState('')
	const [sendConfirmationEmail] = useSendConfirmationEmailMutation()
	const dispatch = useDispatch()

	const resetPassword = () => {
		sendConfirmationEmail({
			type: 'passwordReset',
			email: email
		})
			.unwrap()
			.then((payload) => {
				console.log(payload)
				dispatch(
					pushToastMessage({
						title: payload.message,
						dismissable: true,
						variant: 'success'
					})
				)
			})
			.catch(({ data: error }) => {
				dispatch(
					pushToastMessage({
						title: 'Error sending email',
						message: error?.message,
						dismissable: true,
						variant: 'error'
					})
				)
			})
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="w-full rounded-md border p-8 shadow-sm">
				<div className="flex flex-col space-y-3">
					<div className="text-lg font-semibold">We&apos;ll send you an email to reset your password</div>
					<div className="text-lg font-semibold">Enter your email</div>
					<input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
					<button type="button" className="primary ml-auto w-1/3" onClick={() => resetPassword()}>
						Send Email
					</button>
				</div>
			</div>
		</div>
	)
}

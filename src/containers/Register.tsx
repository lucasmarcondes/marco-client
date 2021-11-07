import { useState } from 'react'
import { useRegisterMutation } from '../store/api'

export const Register = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [register, { isLoading }] = useRegisterMutation()

	const submit = async () => {
		try {
			const response = await register(formData).unwrap()
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex h-screen items-center justify-center'>
			<form onSubmit={submit} method='POST' className='border rounded-md flex flex-col space-y-3 shadow-sm p-8 w-1/4'>
				<div className='font-semibold text-lg'>Register</div>
				<input onChange={e => setFormData({ ...formData, firstName: e.target.value })} type='text' placeholder='First Name' />
				<input onChange={e => setFormData({ ...formData, lastName: e.target.value })} type='text' placeholder='Last Name' />
				<input onChange={e => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='Email' />
				<input onChange={e => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password' />
				<input onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} type='password' placeholder='Confirm Password' />
				<button className='primary'>Register</button>
			</form>
		</div>
	)
}

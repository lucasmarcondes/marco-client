import { useState } from 'react'
import { useGetUserQuery, useResendConfirmationEmailMutation, useUpdateUserMutation } from '../store/api'
import { pushToastMessage } from '../store/root'
import { useDispatch } from 'react-redux'
import { BsPerson, BsToggles } from 'react-icons/bs'
import { ColorPicker, Select, Toggle } from '../components/common'
import { IUser } from '../types'

export const Profile = () => {
	const { data: user } = useGetUserQuery()
	const [resendConfirmationEmail] = useResendConfirmationEmailMutation()
	const dispatch = useDispatch()

	const sendConfirmationEmail = () => {
		resendConfirmationEmail()
			.then(payload => {
				console.log(payload)
				dispatch(
					pushToastMessage({
						title: 'Email sent',
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

	const [editMode, setEditMode] = useState(false)

	const userColor = user?.preferences.accentColor

	return (
		<div className='bg-white h-full dark:(bg-gray-500 text-light-200) '>
			{user && (
				<div className=' mx-auto p-5'>
					<div className='rounded-sm no-wrap md:divide-x md:flex md:-mx-2'>
						<div className='mx-2 w-full md:w-3/12'>
							<div className={'border-t-4  p-2 border-' + userColor}>
								<h1 className='font-bold my-1 text-xl leading-8'>
									{user.firstName} {user.lastName}
								</h1>
								<h3 className='flex text-gray-500 items-center'>
									<span>Member since</span>
									<span className=' ml-auto text-sm '>{user.createdDate ? new Date(user.createdDate).toDateString() : ''}</span>
								</h3>
							</div>
							<div className='my-4'></div>
						</div>
						<div className='divide-y w-full px-2 md:w-9/12'>
							<div className='p-2 pb-5'>
								<div className='flex flex-row flex-wrap w-full'>
									<div className='flex font-semibold space-x-2 leading-8 items-center'>
										<span className={'text-' + userColor}>
											<BsPerson className='h-5 w-5' />
										</span>
										<span className='tracking-wide'>About</span>
									</div>
									{!editMode && (
										<button onClick={() => setEditMode(true)} className='ml-auto secondary'>
											Edit
										</button>
									)}
								</div>
								<div>{editMode ? <EditMode user={user} toggleEditMode={() => setEditMode(false)} /> : <ViewMode user={user} />}</div>
								{!user.isEmailConfirmed && !editMode && (
									<p className='text-sm p-2 text-gray-500 dark:(text-white)'>
										Your email needs to be confirmed.{' '}
										<a className='cursor-pointer text-blue-500  dark:(text-blue-300) hover:(underline ) ' onClick={() => sendConfirmationEmail()}>
											Click here
										</a>{' '}
										to resend the confirmation email
									</p>
								)}{' '}
							</div>
							<div className=' p-2'>
								<div className='flex font-semibold space-x-2 pt-5 leading-8 items-center'>
									<span className={'text-' + userColor}>
										<BsToggles className='h-5 w-5' />
									</span>
									<span className='tracking-wide'>Preferences</span>
								</div>
								<Preferences user={user} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

interface IViewMode {
	user: IUser
}
export const ViewMode = ({ user }: IViewMode) => {
	return (
		<>
			<div className='flex flex-row text-sm grid md:grid-cols-2'>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>First Name</div>
					<div className='p-2'>{user.firstName}</div>
				</div>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>Last Name</div>
					<div className='p-2'>{user.lastName}</div>
				</div>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>Email</div>
					<div className='p-2' style={{ color: user.isEmailConfirmed ? 'inherit' : '#fd3737' }}>
						{user.email}
					</div>
				</div>
			</div>
		</>
	)
}

interface IEditMode {
	user: IUser
	toggleEditMode: () => void
}
export const EditMode = ({ user, toggleEditMode }: IEditMode) => {
	const [newValues, setNewValues] = useState(user)
	const [updateUser] = useUpdateUserMutation()
	const dispatch = useDispatch()

	const save = () => {
		updateUser(newValues)
			.unwrap()
			.then(payload => {
				console.log(payload)

				dispatch(
					pushToastMessage({
						title: 'Success',
						message: 'User details updated',
						variant: 'success',
						dismissable: true,
					})
				)
				toggleEditMode()
			})
			.catch(({ data: error }) => {
				pushToastMessage({
					title: 'Error',
					message: error?.message,
					variant: 'error',
					dismissable: true,
				})
			})
	}

	return (
		<div className='divide-y rounded-md flex-row border-1 shadow-md my-2 text-sm w-full pt-5'>
			<div className='w-full grid p-4 md:grid-cols-2'>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>First Name</div>
					<input
						className=' m-2'
						type='text'
						defaultValue={newValues.firstName}
						onChange={e => setNewValues({ ...newValues, firstName: e.target.value })}
					/>
				</div>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>Last Name</div>
					<input
						className=' m-2'
						type='text'
						defaultValue={newValues.lastName}
						onChange={e => setNewValues({ ...newValues, lastName: e.target.value })}
					/>
				</div>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>Email</div>
					<input className=' m-2' type='email' defaultValue={newValues.email} onChange={e => setNewValues({ ...newValues, email: e.target.value })} />
				</div>
			</div>
			<div className='flex flex-row bg-gray-50  px-6 justify-end md:rounded-b-lg dark:( bg-gray-800 border-0 text-light-300) '>
				<div className='flex-row my-auto space-y-2 w-full py-4 md:space-x-2' style={{ textAlignLast: 'right' }}>
					<button onClick={toggleEditMode} className='w-full secondary md:w-1/12'>
						Cancel
					</button>
					<button onClick={save} className='w-full  primary md:w-1/12'>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}

interface IPreferences {
	user: IUser
}
export const Preferences = ({ user }: IPreferences) => {
	const [updateUser] = useUpdateUserMutation()

	return (
		<div className='mt-3'>
			<div className='text-sm grid md:grid-cols-2'>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>Dark Mode</div>
					<div className='p-2'>
						<Toggle
							id='darkMode'
							name='preferences'
							value={user.preferences.darkMode}
							onChange={val => updateUser({ ...user, preferences: { ...user.preferences, darkMode: val } })}
						/>
					</div>
				</div>
				<div className='grid grid-cols-2'>
					<div className='font-semibold p-2'>Accent Color</div>
					<div className='p-2'>
						<ColorPicker
							id='accentColor'
							title='Pick a color'
							value={user.preferences.accentColor}
							onChange={val => updateUser({ ...user, preferences: { ...user.preferences, accentColor: val } })}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

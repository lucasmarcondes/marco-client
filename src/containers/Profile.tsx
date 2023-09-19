import { useState } from 'react'
import { BsPerson, BsToggles } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import { ColorPicker, Toggle } from '../components/common'
import { useGetUserQuery, useSendConfirmationEmailMutation, useUpdateUserMutation } from '../store/api'
import { pushToastMessage } from '../store/root'
import { IUser } from '../types'

export const Profile = () => {
	const { data: user } = useGetUserQuery()
	const [sendConfirmationEmail] = useSendConfirmationEmailMutation()
	const dispatch = useDispatch()

	const verifyEmail = () => {
		sendConfirmationEmail({
			type: 'verifyEmail'
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

	const [editMode, setEditMode] = useState(false)

	const userColor = user?.preferences.accentColor

	return (
		<div className="h-full bg-white dark:bg-gray-500 dark:text-gray-200">
			{user && (
				<div className=" mx-auto p-5">
					<div className="whitespace-nowrap rounded-sm md:-mx-2 md:flex md:divide-x">
						<div className="mx-2 w-full md:w-3/12">
							<div className={'border-  border-t-4 p-2' + userColor}>
								<h1 className="my-1 text-xl font-bold leading-8">
									{user.firstName} {user.lastName}
								</h1>
								<h3 className="flex items-center text-gray-500">
									<span>Member since</span>
									<span className=" ml-auto text-sm ">{user.createdDate ? new Date(user.createdDate).toDateString() : ''}</span>
								</h3>
							</div>
							<div className="my-4"></div>
						</div>
						<div className="w-full divide-y px-2 md:w-9/12">
							<div className="p-2 pb-5">
								<div className="flex w-full flex-row flex-wrap">
									<div className="flex items-center space-x-2 font-semibold leading-8">
										<span className={'text-' + userColor}>
											<BsPerson className="h-5 w-5" />
										</span>
										<span className="tracking-wide">About</span>
									</div>
									{!editMode && (
										<button onClick={() => setEditMode(true)} className="secondary ml-auto">
											Edit
										</button>
									)}
								</div>
								<div>{editMode ? <EditMode user={user} toggleEditMode={() => setEditMode(false)} /> : <ViewMode user={user} />}</div>
								{!user.isEmailConfirmed && !editMode && (
									<p className="p-2 text-sm text-gray-500 dark:text-white">
										Your email needs to be confirmed.{' '}
										<a className="cursor-pointer text-blue-500  hover:underline dark:text-blue-300" onClick={() => verifyEmail()}>
											Click here
										</a>{' '}
										to resend the confirmation email
									</p>
								)}{' '}
							</div>
							<div className=" p-2">
								<div className="flex items-center space-x-2 pt-5 font-semibold leading-8">
									<span className={'text-' + userColor}>
										<BsToggles className="h-5 w-5" />
									</span>
									<span className="tracking-wide">Preferences</span>
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
			<div className="grid flex-row text-sm md:grid-cols-2">
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">First Name</div>
					<div className="p-2">{user.firstName}</div>
				</div>
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">Last Name</div>
					<div className="p-2">{user.lastName}</div>
				</div>
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">Email</div>
					<div className="p-2" style={{ color: user.isEmailConfirmed ? 'inherit' : '#fd3737' }}>
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
			.then((payload) => {
				console.log(payload)

				dispatch(
					pushToastMessage({
						title: 'Success',
						message: 'User details updated',
						variant: 'success',
						dismissable: true
					})
				)
				toggleEditMode()
			})
			.catch(({ data: error }) => {
				pushToastMessage({
					title: 'Error',
					message: error?.message,
					variant: 'error',
					dismissable: true
				})
			})
	}

	return (
		<div className="my-2 w-full flex-row divide-y rounded-md border pt-5 text-sm shadow-md">
			<div className="grid w-full p-4 md:grid-cols-2">
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">First Name</div>
					<input
						className=" m-2"
						type="text"
						defaultValue={newValues.firstName}
						onChange={(e) => setNewValues({ ...newValues, firstName: e.target.value })}
					/>
				</div>
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">Last Name</div>
					<input
						className=" m-2"
						type="text"
						defaultValue={newValues.lastName}
						onChange={(e) => setNewValues({ ...newValues, lastName: e.target.value })}
					/>
				</div>
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">Email</div>
					<input
						className=" m-2"
						type="email"
						defaultValue={newValues.email}
						onChange={(e) => setNewValues({ ...newValues, email: e.target.value })}
					/>
				</div>
			</div>
			<div className="flex flex-row justify-end  bg-gray-50 px-6 dark:border-0 dark:bg-gray-800 dark:text-gray-300 md:rounded-b-lg">
				<div className="my-auto w-full flex-row space-y-2 py-4 md:space-x-2" style={{ textAlignLast: 'right' }}>
					<button onClick={toggleEditMode} className="secondary w-full md:w-1/12">
						Cancel
					</button>
					<button onClick={save} className="primary  w-full md:w-1/12">
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
		<div className="mt-3">
			<div className="grid text-sm md:grid-cols-2">
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">Dark Mode</div>
					<div className="p-2">
						<Toggle
							id="darkMode"
							name="preferences"
							value={user.preferences.darkMode}
							onChange={(val) => updateUser({ ...user, preferences: { ...user.preferences, darkMode: val } })}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2">
					<div className="p-2 font-semibold">Accent Color</div>
					<div className="p-2">
						<ColorPicker
							id="accentColor"
							title="Pick a color"
							value={user.preferences.accentColor}
							onChange={(val) => updateUser({ ...user, preferences: { ...user.preferences, accentColor: val } })}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

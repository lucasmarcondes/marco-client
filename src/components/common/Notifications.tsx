import { useEffect, useRef, useState } from 'react'
import { BsBell, BsX } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import { useGetUserQuery, useSendConfirmationEmailMutation, useUpdateUserMutation } from '../../store/api'
import { pushToastMessage } from '../../store/root'
import { INotification } from '../../types'

export const Notifications = () => {
	const { data: user } = useGetUserQuery()
	const [sendConfirmationEmail] = useSendConfirmationEmailMutation()
	const dispatch = useDispatch()
	const notificationsRef = useRef<HTMLInputElement>(null)
	const [showNotifications, setShowNotifications] = useState(false)

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

	let notifications = user?.notifications ? [...user.notifications] : []
	const emailAlertExists = notifications.some((item) => item.id == 'email-confirmation')
	if (emailAlertExists && user?.isEmailConfirmed) {
		// remove email notification if user confirmed email
		notifications = notifications.filter((item) => item.id != 'email-confirmation')
	} else if (!emailAlertExists && !user?.isEmailConfirmed) {
		// add email notification if user has not confirmed email and it does not exist
		notifications.push({
			id: 'email-confirmation',
			message: (
				<span>
					Your email needs to be confirmed!
					<p>
						<a className="cursor-pointer text-blue-500 hover:underline" onClick={() => verifyEmail()}>
							Click here
						</a>{' '}
						to resend the confirmation email
					</p>
				</span>
			),
			dismissable: false
		})
	}

	useEffect(() => {
		const isOutsideClick = (e: Event) => {
			showNotifications && !notificationsRef.current?.contains(e.target as HTMLElement) && setShowNotifications(false)
		}
		document.addEventListener('mousedown', isOutsideClick)
		return () => {
			document.removeEventListener('mousedown', isOutsideClick)
		}
	}, [showNotifications])

	return (
		<div ref={notificationsRef} className="flex ">
			<button
				onClick={() => notifications.length > 0 && setShowNotifications(!showNotifications)}
				className="my-auto mr-2 rounded-md p-2 text-gray-700 "
				title={`${notifications.length} unread messages`}
			>
				<span className="relative">
					<BsBell className="block h-5 w-5 text-black dark:text-white" />
					{notifications.length > 0 && (
						<span className="absolute -right-7 -top-5 inline-flex -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
							{notifications.length}
						</span>
					)}
				</span>
			</button>
			{notifications.length > 0 && <div className="mr-3"></div>}
			{showNotifications && (
				<div className="absolute right-14 z-50 mt-10 grid w-full grid-cols-1 divide-y divide-gray-300 rounded-sm border bg-white px-2 shadow-md dark:border-black  dark:bg-gray-800 dark:text-gray-300 md:w-1/3">
					<div className=" p-4 pb-2 ">Notifications</div>
					<div className="max-h-80 divide-y divide-gray-300 overflow-y-auto">
						{notifications.map((notification, index) => {
							return (
								<div key={index}>
									<Notification notification={notification} />
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

interface Props {
	notification: INotification
}

export const Notification = ({ notification }: Props) => {
	const [updateUser] = useUpdateUserMutation()
	const { data: user } = useGetUserQuery()

	const removeNotification = (notification: INotification) => {
		if (!user) return
		updateUser({ ...user, notifications: user.notifications.filter((item) => item.id != notification.id) })
	}
	return (
		<div className="-mx-2 flex items-center border-b px-4 py-3 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 ">
			<div className="-mx-3 flex p-2 px-4">
				<div className="mx-3 text-sm">
					<span className="mb-2 font-bold">{notification.title} </span>
					<span className="text-gray-600 dark:text-gray-200">{notification.message}</span>
				</div>
			</div>

			{notification.dismissable && (
				<div className="mb-auto ml-auto ">
					<BsX
						type="button"
						onClick={() => removeNotification(notification)}
						className="my-auto h-6 w-6 transition hover:cursor-pointer hover:text-gray-600 hover:duration-150 dark:text-white"
					/>
				</div>
			)}
		</div>
	)
}

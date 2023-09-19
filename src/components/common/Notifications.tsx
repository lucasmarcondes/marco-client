import { INotification, IUser } from '../../types'
import { BsX, BsBell } from 'react-icons/bs'
import { useGetUserQuery, useUpdateUserMutation, useSendConfirmationEmailMutation } from '../../store/api'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { pushToastMessage } from '../../store/root'

export const Notifications = () => {
	const { data: user } = useGetUserQuery()
	const [sendConfirmationEmail] = useSendConfirmationEmailMutation()
	const dispatch = useDispatch()
	const notificationsRef = useRef<HTMLInputElement>(null)
	const [showNotifications, setShowNotifications] = useState(false)

	const verifyEmail = () => {
		sendConfirmationEmail({
			type: 'verifyEmail',
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

	let notifications = user?.notifications ? [...user.notifications] : []
	let emailAlertExists = notifications.some(item => item.id == 'email-confirmation')
	if (emailAlertExists && user?.isEmailConfirmed) {
		// remove email notification if user confirmed email
		notifications = notifications.filter(item => item.id != 'email-confirmation')
	} else if (!emailAlertExists && !user?.isEmailConfirmed) {
		// add email notification if user has not confirmed email and it does not exist
		notifications.push({
			id: 'email-confirmation',
			message: (
				<span>
					Your email needs to be confirmed!
					<p>
						<a className='cursor-pointer text-blue-500  hoverunderline' onClick={() => verifyEmail()}>
							Click here
						</a>{' '}
						to resend the confirmation email
					</p>
				</span>
			),
			dismissable: false,
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
		<div ref={notificationsRef} className='flex '>
			<button
				onClick={() => notifications.length > 0 && setShowNotifications(!showNotifications)}
				className='rounded-md my-auto mr-2 p-2 text-light-700 '
				title={`${notifications.length} unread messages`}
			>
				<span className='relative'>
					<BsBell className='h-5 text-dark-200 w-5 block dark:text-white' />
					{notifications.length > 0 && (
						<span className='rounded-full font-bold bg-red-600 text-xs leading-none py-1 px-2 transform -top-5 -right-7 text-red-100 translate-x-1/2 -translate-y-1/2 absolute inline-flex items-center justify-center'>
							{notifications.length}
						</span>
					)}
				</span>
			</button>
			{notifications.length > 0 && <div className='mr-3'></div>}
			{showNotifications && (
				<div className='divide-y bg-white rounded-sm divide-gray-300 border-1 shadow-md mt-10 w-ful grid px-2 right-14 animate-fadeIn animate-animated z-50 grid-cols-1 absolute md:w-3/9  dark:bg-gray-800 dark:text-light-300 dark:border-black'>
					<div className=' p-4 pb-2 '>Notifications</div>
					<div className='divide-y divide-gray-300 max-h-80 overflow-y-auto'>
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
		updateUser({ ...user, notifications: user.notifications.filter(item => item.id != notification.id) })
	}
	return (
		<div className='border-b flex -mx-2 py-3 px-4 items-center dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-50 '>
			<div className='flex -mx-3 p-2 px-4'>
				<div className='mx-3 text-sm'>
					<span className='font-bold mb-2'>{notification.title} </span>
					<span className='text-gray-600 dark:text-gray-200'>{notification.message}</span>
				</div>
			</div>

			{notification.dismissable && (
				<div className='mb-auto ml-auto '>
					<BsX
						type='button'
						onClick={() => removeNotification(notification)}
						className='my-auto h-6 transition w-6 dark:text-white hover:cursor-pointer hover:text-gray-600 hover:duration-150'
					/>
				</div>
			)}
		</div>
	)
}

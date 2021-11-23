import { INotificationType } from '../../types'
import { BsX, BsBell, BsCircle, BsMailbox } from 'react-icons/bs'
import { useGetUserQuery, useRemoveNotificationMutation } from '../../store/api'
import { useState, useRef, useEffect } from 'react'

export const Notifications = () => {
	// const { data: user } = useGetUserQuery()
	// const userColor = user?.preferences.accentColor ? user.preferences.accentColor : '#BFDBFF'
	// const textColor = user?.preferences.textColor ? user.preferences.textColor : 'black'
	const notificationsRef = useRef<HTMLInputElement>(null)
	const [showNotifications, setShowNotifications] = useState(false)
	const notifications: INotificationType[] = [
		{
			id: '6',
			message: 'You need to confirm your email',
		},
		{ id: '1', message: 'This is a test', title: 'Test Notification' },
		{ id: '2', message: 'This is a test', title: 'Test Notification' },
		{ id: '3', message: 'This is a test', title: 'Test Notification' },
		{ id: '4', message: 'This is a test', title: 'Test Notification' },
		{ id: '5', message: 'This is a test', title: 'Test Notification' },
	]

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
		<div ref={notificationsRef} className='flex'>
			<button onClick={() => setShowNotifications(!showNotifications)} className='rounded-md my-auto mr-5 p-2 text-light-700 '>
				<span className='relative'>
					<BsBell className='h-5 text-dark-200 w-5 block dark:(text-white ) ' />
					{notifications.length > 0 && (
						<span className='rounded-full font-bold bg-red-600 text-xs leading-none py-1 px-2 transform -top-5 -right-7 text-red-100 translate-x-1/2 -translate-y-1/2 absolute inline-flex items-center justify-center'>
							{notifications.length}
						</span>
					)}
				</span>
			</button>
			{showNotifications && (
				<div className='divide-y bg-white rounded-md divide-gray-300 shadow-md mt-10 grid px-2 right-14 animate-fadeIn animate-animated w-3/9 z-50 grid-cols-1 absolute dark:( bg-gray-800 rounded-md text-light-300 ) '>
					<div className=' p-4 pb-2 '>Notifications</div>
					<div className='divide-y divide-gray-300 h-80 overflow-y-auto'>
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
	notification: INotificationType
}

export const Notification = ({ notification }: Props) => {
	const [removeNotifiction] = useRemoveNotificationMutation()

	return (
		<a className='border-b flex -mx-2 py-3 px-4 items-center dark:(bg-gray-800 hover:bg-gray-700) hover:bg-gray-50 '>
			<div className='flex -mx-3 py-2 px-4'>
				<div className='mx-3 text-sm'>
					<span className='font-bold mb-2'>{notification.title} </span>
					<p className='text-gray-600 dark:text-gray-200'>{notification.message}</p>
				</div>
			</div>

			<div className='ml-auto '>
				<BsX
					type='button'
					onClick={() => removeNotifiction(notification)}
					className='my-auto h-6 transition w-6 dark:(text-white) hover:(cursor-pointer text-gray-600 duration-150) '
				/>
			</div>
		</a>
	)
}

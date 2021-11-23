import { INotificationType } from '../../types'
import { BsX, BsBell, BsCircle } from 'react-icons/bs'
import { useRemoveNotificationMutation } from '../../store/api'
import { useState, useRef, useEffect } from 'react'

export const Notifications = () => {
	const notificationsRef = useRef<HTMLInputElement>(null)
	const [showNotifications, setShowNotifications] = useState(false)
	const notifications: INotificationType[] = [
		{ id: '1', message: 'test' },
		{ id: '2', message: 'test' },
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
			<button onClick={() => setShowNotifications(!showNotifications)} className='rounded-md my-auto mr-2 p-2 text-light-700 '>
				<BsBell className='h-5 text-dark-200 w-5 block dark:(text-white ) ' />
			</button>
			{notifications.length > 0 && <div className='rounded-full bg-red-600 h-2 top-3 right-16 w-2 absolute'></div>}
			{showNotifications && (
				<div className='divide-y bg-white rounded-md divide-gray-300 shadow-md mt-10 grid px-2 right-14 animate-fadeIn animate-animated w-3/9 z-50 grid-cols-1 absolute dark:( bg-gray-800 rounded-md text-light-300 ) '>
					{notifications.map((notification, index) => {
						return (
							<div key={index}>
								<Notification notification={notification} />
							</div>
						)
					})}
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
		<div className='bg-white flex w-full py-2 pb-4 overflow-hidden dark:(bg-gray-800) hover:(opacity-80)'>
			<div className='-mx-3 py-2 px-4'>
				<div className='mx-3'>
					<p className='text-sm text-gray-600 dark:text-gray-200'>{notification.message}</p>
				</div>
			</div>

			<div className='ml-auto '>
				<BsX
					type='button'
					onClick={() => removeNotifiction(notification)}
					className='my-auto h-6 transition w-6 dark:(text-white) hover:(cursor-pointer text-gray-600 duration-150) '
				/>
			</div>
		</div>
	)
}

import { INotificationType } from '../../types'
import { BsX, BsCheckCircle, BsExclamationCircle, BsExclamationDiamond, BsXCircle } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { removeNotification } from '../../store/root'
import { useEffect } from 'react'

const DefaultNotificationTimeout = 5000

export const Notifications = () => {
	let notifications = useSelector((state: RootState) => state.root.notifications)

	return (
		<div className='flex flex-col m-3 w-min right-0 bottom-0 z-999 fixed'>
			{notifications.map((notification, index) => {
				return (
					<div key={'notification-' + index}>
						<Notification notification={notification} />
					</div>
				)
			})}
		</div>
	)
}

interface Props {
	notification: INotificationType
}

export const Notification = ({ notification }: Props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		setTimeout(
			() => {
				dispatch(removeNotification(notification))
			},
			notification.timeout ? notification.timeout : DefaultNotificationTimeout
		)
	}, [notification])

	let variant = getVarient(notification.variant)
	return (
		<div className='bg-white rounded-lg flex shadow-lg mt-2 w-md animate-slideInUp animate-animated overflow-hidden dark:(bg-gray-800) '>
			{variant.icon}

			<div className='-mx-3 py-2 px-4'>
				<div className='mx-3'>
					<span className={variant.titleStyle}>{notification.title}</span>
					<p className='text-sm text-gray-600 dark:text-gray-200'>{notification.message}</p>
				</div>
			</div>

			{notification.dismissable && (
				<div className='ml-auto '>
					<BsX
						type='button'
						onClick={() => dispatch(removeNotification(notification))}
						className='my-auto h-6 transition w-6 dark:(text-white) hover:(cursor-pointer text-gray-600 duration-150) '
					/>
				</div>
			)}
		</div>
	)
}

const getVarient = (variant: string) => {
	let obj = {
		titleStyle: 'font-semibold text-green-500 dark:text-green-400',
		icon: <> </>,
	}
	switch (variant) {
		case 'success':
			obj.icon = (
				<div className='flex bg-green-500 min-w-12 items-center justify-center'>
					<BsCheckCircle className='h-6 fill-current text-white w-6' />
				</div>
			)
			obj.titleStyle = 'font-semibold text-green-500 dark:text-green-400'
			break
		case 'error':
			obj.icon = (
				<div className='flex bg-red-500 min-w-12 items-center justify-center'>
					<BsXCircle className='h-6 fill-current text-white w-6' />
				</div>
			)
			obj.titleStyle = 'font-semibold text-red-500 dark:text-red-400'
			break
		case 'info':
			obj.icon = (
				<div className='flex bg-blue-500 min-w-12 items-center justify-center'>
					<BsExclamationCircle className='h-6 fill-current text-white w-6' />
				</div>
			)
			obj.titleStyle = 'font-semibold text-blue-500 dark:text-blue-400'
			break
		case 'warning':
			obj.icon = (
				<div className='flex bg-yellow-400 min-w-12 items-center justify-center'>
					<BsExclamationDiamond className='h-6 fill-current text-white w-6' />
				</div>
			)
			obj.titleStyle = 'font-semibold text-yellow-400 dark:text-yellow-300'
			break
	}
	return obj
}

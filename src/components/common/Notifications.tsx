import { INotificationType } from '../../types'
import { BsX } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { removeNotification } from '../../store/root'
import { Switch } from 'react-router'

export const Notifications = () => {
	const notifications = useSelector((state: RootState) => state.root.notifications)
	const dispatch = useDispatch()

	const dismiss = () => {
		alert('close')
	}
	return (
		<div>
			{notifications.map(notification => (
				<div className='bg-white rounded-lg flex ml-auto max-w-sm border-gray-300 border-1 shadow-sm w-full right-3 bottom-3 overflow-hidden fixed dark:bg-gray-800'>
					{getVariant(notification.variant)}

					<div className='-mx-3 py-2 px-4'>
						<div className='mx-3'>
							<span className='font-semibold text-green-500 dark:text-green-400'>{notification.title}</span>
							<p className='text-sm text-gray-600 dark:text-gray-200'>{notification.message}</p>
						</div>
					</div>

					{notification.dismissable && (
						<div className='ml-auto '>
							<BsX
								type='button'
								onClick={() => dispatch(removeNotification(notification))}
								className='my-auto h-6 transition w-6 hover:(cursor-pointer text-gray-600 duration-150) '
							/>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

const getVariant = (variant: string) => {
	switch (variant) {
		case 'success':
			break
		case 'error':
			break
		case 'info':
			break
		default:
			break
	}
	return (
		<div className='flex bg-green-500 w-12 items-center justify-center'>
			<svg className='h-6 fill-current text-white w-6' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
				<path d='M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z' />
			</svg>
		</div>
	)
}

import { IToastMessage } from '../../types'
import { BsX, BsCheckCircle, BsExclamationCircle, BsExclamationDiamond, BsXCircle } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { removeToastMessage } from '../../store/root'
import { useEffect } from 'react'

const DefaultToastMessageTimeout = 5000

export const ToastMessages = () => {
	let toastMessages = useSelector((state: RootState) => state.root.toastMessages)

	return (
		<div className='flex flex-col m-3 w-min right-0 bottom-0 z-999 fixed'>
			{toastMessages.map((toastMessage, index) => {
				return (
					<div key={'toastMessage-' + index}>
						<ToastMessage toastMessage={toastMessage} />
					</div>
				)
			})}
		</div>
	)
}

interface Props {
	toastMessage: IToastMessage
}

export const ToastMessage = ({ toastMessage }: Props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		toastMessage.dismissable &&
			setTimeout(
				() => {
					dispatch(removeToastMessage(toastMessage))
				},
				toastMessage.timeout ? toastMessage.timeout : DefaultToastMessageTimeout
			)
	}, [toastMessage])

	let variant = getVarient(toastMessage.variant)
	return (
		<div className='bg-white rounded-lg flex shadow-lg mt-2 w-md animate-slideInUp animate-animated overflow-hidden dark:(bg-gray-800) '>
			{variant.icon}

			<div className='-mx-3 py-2 px-4'>
				<div className='mx-3'>
					<span className={variant.titleStyle}>{toastMessage.title}</span>
					<p className='text-sm text-gray-600 dark:text-gray-200'>{toastMessage.message}</p>
				</div>
			</div>

			<div className='ml-auto '>
				<BsX
					type='button'
					onClick={() => dispatch(removeToastMessage(toastMessage))}
					className='my-auto h-6 transition w-6 dark:(text-white) hover:(cursor-pointer text-gray-600 duration-150) '
				/>
			</div>
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

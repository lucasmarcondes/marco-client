import { useEffect } from 'react'
import { BsCheckCircle, BsExclamationCircle, BsExclamationDiamond, BsX, BsXCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { removeToastMessage } from '../../store/root'
import { RootState } from '../../store/store'
import { IToastMessage } from '../../types'

const DefaultToastMessageTimeout = 5000

export const ToastMessages = () => {
	const toastMessages = useSelector((state: RootState) => state.root.toastMessages)

	return (
		<div className="fixed bottom-0 right-0 z-50 m-3 flex w-min flex-col">
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

	const variant = getVarient(toastMessage.variant)
	return (
		<div className="mt-2 flex overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
			{variant.icon}

			<div className="-mx-3 px-4 py-2">
				<div className="mx-3">
					<span className={variant.titleStyle}>{toastMessage.title}</span>
					<p className="text-sm text-gray-600 dark:text-gray-200">{toastMessage.message}</p>
				</div>
			</div>

			<div className="ml-auto ">
				<BsX
					type="button"
					onClick={() => dispatch(removeToastMessage(toastMessage))}
					className="my-auto h-6 w-6 transition hover:cursor-pointer hover:text-gray-600 hover:duration-150 dark:text-white"
				/>
			</div>
		</div>
	)
}

const getVarient = (variant: string) => {
	const obj = {
		titleStyle: 'font-semibold text-green-500 dark:text-green-400',
		icon: <> </>
	}
	switch (variant) {
		case 'success':
			obj.icon = (
				<div className="flex min-w-min items-center justify-center bg-green-500">
					<BsCheckCircle className="h-6 w-6 fill-current text-white" />
				</div>
			)
			obj.titleStyle = 'font-semibold text-green-500 dark:text-green-400'
			break
		case 'error':
			obj.icon = (
				<div className="flex min-w-min items-center justify-center bg-red-500">
					<BsXCircle className="h-6 w-6 fill-current text-white" />
				</div>
			)
			obj.titleStyle = 'font-semibold text-red-500 dark:text-red-400'
			break
		case 'info':
			obj.icon = (
				<div className="flex min-w-min items-center justify-center bg-blue-500">
					<BsExclamationCircle className="h-6 w-6 fill-current text-white" />
				</div>
			)
			obj.titleStyle = 'font-semibold text-blue-500 dark:text-blue-400'
			break
		case 'warning':
			obj.icon = (
				<div className="flex min-w-min items-center justify-center bg-yellow-400">
					<BsExclamationDiamond className="h-6 w-6 fill-current text-white" />
				</div>
			)
			obj.titleStyle = 'font-semibold text-yellow-400 dark:text-yellow-300'
			break
	}
	return obj
}

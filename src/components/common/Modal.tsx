import { ReactNode, useEffect } from 'react'
import { BsX } from 'react-icons/bs'

export type IModalContent = null | {
	title?: ReactNode
	content: ReactNode
	actions?: ReactNode
	size?: string
}

interface IModalProps {
	modalContent: IModalContent
	onClose: () => void
}

export const Modal = ({ modalContent, onClose }: IModalProps) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])
	const css = `${
		modalContent?.size ? modalContent.size : ''
	} bg-white rounded-lg flex flex-col my-auto shadow-lg dark:bg-gray-800 dark:border-0 dark:text-light-300)`
	return (
		modalContent && (
			<div className='flex bg-gray-700 bg-opacity-70 w-full inset-0 animate-fade-in animate-animated z-50 fixed justify-center'>
				<div className={css}>
					{modalContent.title && (
						<div className='rounded-t-md flex px-4 pt-4 justify-between'>
							<span className='font-medium my-auto text-xl w-full'>{modalContent.title}</span>
							<BsX type='button' onClick={onClose} className='my-auto h-8 transition w-8 hover:cursor-pointer hover:text-gray-600 hover:duration-150' />
						</div>
					)}
					<div className='flex-1 p-4'>{modalContent.content}</div>
					{modalContent.actions && (
						<div className='flex flex-row bg-gray-50  px-4 justify-end md:rounded-b-lg dark:bg-gray-800 dark:border-0 dark:text-light-300'>
							<div className='flex-row my-auto space-y-2 w-full py-4 md:space-x-2' style={{ textAlignLast: 'right' }}>
								{modalContent.actions}
							</div>
						</div>
					)}
				</div>
			</div>
		)
	)
}

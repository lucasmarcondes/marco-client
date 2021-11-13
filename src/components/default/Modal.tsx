import { ReactNode, useEffect } from 'react'
import { BsX } from 'react-icons/bs'

export type IModalContent = null | {
	title?: string
	content: ReactNode
	actions?: ReactNode
	size?: string
}

interface Props {
	modalContent: IModalContent
	onClose: () => void
}

export const useDisableBackgroundScroll = (open: boolean) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [open])
}

export const Modal = ({ modalContent, onClose }: Props) => {
	const css = `${modalContent?.size ? modalContent.size : ''} bg-white rounded-lg flex flex-col my-auto shadow-lg`
	useDisableBackgroundScroll(!!modalContent)
	return (
		modalContent && (
			<div className='flex bg-gray-700 bg-opacity-70 w-full inset-0 animate-fade-in animate-animated z-50 fixed justify-center'>
				<div className={css}>
					{modalContent.title && (
						<div className='rounded-t-md flex px-4 pt-4 justify-between'>
							<span className='font-medium my-auto text-xl'>{modalContent.title}</span>
							<BsX type='button' onClick={onClose} className='my-auto h-8 transition w-8 hover:(cursor-pointer text-gray-600 duration-150) ' />
						</div>
					)}
					<div className='flex-1 p-4'>{modalContent.content}</div>
					{modalContent.actions && (
						<div className='flex bg-gray-50 px-4 justify-end md:rounded-b-lg'>
							<div className='my-auto space-x-2 py-4 inline-flex'>{modalContent.actions}</div>
						</div>
					)}
				</div>
				)
			</div>
		)
	)
}

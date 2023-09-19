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
			<div className="fixed inset-0 z-50 flex w-full justify-center bg-gray-700 opacity-70">
				<div className={css}>
					{modalContent.title && (
						<div className="flex justify-between rounded-t-md px-4 pt-4">
							<span className="my-auto w-full text-xl font-medium">{modalContent.title}</span>
							<BsX
								type="button"
								onClick={onClose}
								className="my-auto h-8 w-8 transition hover:cursor-pointer hover:text-gray-600 hover:duration-150"
							/>
						</div>
					)}
					<div className="flex-1 p-4">{modalContent.content}</div>
					{modalContent.actions && (
						<div className="flex flex-row justify-end  bg-gray-50 px-4 dark:border-0 dark:bg-gray-800 dark:text-gray-300 md:rounded-b-lg">
							<div className="my-auto w-full flex-row space-y-2 py-4 md:space-x-2" style={{ textAlignLast: 'right' }}>
								{modalContent.actions}
							</div>
						</div>
					)}
				</div>
			</div>
		)
	)
}

import { Modal } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentEntry, setModalType, updateCurrentEntry } from '../../store/root'
import { EntryTemplate } from '.'
import { useGetTemplatesQuery, useCreateEntryMutation, useUpdateEntryMutation, useRemoveEntryMutation } from '../../store/api'
import { IModalContent } from '../common/Modal'
import { RootState } from '../../store/store'
import { INewEntry } from '../../types'

export const EntryModal = () => {
	const [createEntry] = useCreateEntryMutation()
	const [updateEntry] = useUpdateEntryMutation()
	const [removeEntry] = useRemoveEntryMutation()
	const dispatch = useDispatch()

	const type = useSelector((state: RootState) => state.root.modalType)
	const entry = useSelector((state: RootState) => state.root.currentEntry)

	const { data: templates } = useGetTemplatesQuery()

	let modalContent: IModalContent = null

	const closeModal = (action: 'create' | 'update' | 'delete' | 'cancel', val?: INewEntry) => {
		switch (action) {
			case 'create':
				val && createEntry(val)
				break
			case 'update':
				val && updateEntry(val)
				break
			case 'delete':
				val?._id && removeEntry(val._id)
				break
		}
		dispatch(setModalType(null))
		dispatch(setCurrentEntry(null))
	}

	if (entry) {
		modalContent = {
			title: (
				<input
					onKeyUp={e => dispatch(updateCurrentEntry({ title: (e.target as HTMLInputElement).value }))}
					defaultValue={entry.title}
					className='bg-transparent rounded-md w-full p-1 pl-0 text-3xl md:text-4xl'
					placeholder='Title'
				/>
			),
			content: <EntryTemplate entry={entry} />,
			size: 'h-[80%] w-2/3',
			actions: (
				<>
					<button className='danger' onClick={() => closeModal('delete', entry)}>
						Delete
					</button>
					<button className='secondary' onClick={() => closeModal('cancel')}>
						Cancel
					</button>
					{type === 'create' ? (
						<button className='primary' onClick={() => closeModal('create', entry)}>
							Create
						</button>
					) : (
						<button className='primary' onClick={() => closeModal('update', entry)}>
							Save
						</button>
					)}
				</>
			),
		}
	} else {
		if (templates?.length === 1) {
			const { _id: templateId, properties } = templates[0]
			dispatch(setCurrentEntry({ templateId, properties }))
		} else {
			modalContent = {
				title: 'Select a Template',
				content: (
					<ul className='divide-y bg-white border rounded-lg shadow-sm text-lg w-80'>
						{templates?.map((template, index) => (
							<button
								onClick={() => {
									const { _id: templateId, properties } = template
									dispatch(setCurrentEntry({ templateId, properties }))
									modalContent = null
								}}
								className=' border-gray-300 w-full py-2 text-gray-700 block hover:bg-gray-100'
								key={index}
							>
								{template.description}
							</button>
						))}
					</ul>
				),
			}
		}
	}
	return (
		<Modal
			modalContent={modalContent}
			onClose={() => {
				dispatch(setModalType(null))
				dispatch(setCurrentEntry(null))
			}}
		/>
	)
}

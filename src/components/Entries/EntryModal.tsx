import { Modal } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import { pushNotification, setCurrentEntry, setModalType, updateCurrentEntry } from '../../store/root'
import { EntryContainer } from '.'
import { useGetTemplatesQuery, useCreateEntryMutation, useUpdateEntryMutation, useRemoveEntryMutation } from '../../store/api'
import { IModalContent } from '../common/Modal'
import { RootState } from '../../store/store'
import { IEntry } from '../../types'

export const EntryModal = () => {
	const [createEntry] = useCreateEntryMutation()
	const [updateEntry] = useUpdateEntryMutation()
	const [removeEntry] = useRemoveEntryMutation()
	const dispatch = useDispatch()

	const type = useSelector((state: RootState) => state.root.modalType)
	const entry = useSelector((state: RootState) => state.root.currentEntry)

	const { data: templates } = useGetTemplatesQuery()

	let modalContent: IModalContent = null

	const closeModal = async (action: 'create' | 'update' | 'delete' | 'cancel', val?: IEntry) => {
		let hasError = false
		switch (action) {
			case 'create':
				val &&
					(await createEntry(val)
						.unwrap()
						.then(payload => {
							dispatch(
								pushNotification({
									title: 'Success',
									message: 'Entry created successfully',
									variant: 'success',
									dismissable: true,
								})
							)
						})
						.catch(error => {
							hasError = true
							dispatch(
								pushNotification({
									title: 'Error',
									message: error.data,
									variant: 'error',
									dismissable: true,
								})
							)
						}))
				break
			case 'update':
				val &&
					(await updateEntry(val)
						.unwrap()
						.then(payload => {
							dispatch(
								pushNotification({
									title: 'Success',
									message: 'Entry updated successfully',
									variant: 'success',
									dismissable: true,
								})
							)
						})
						.catch(error => {
							hasError = true
							dispatch(
								pushNotification({
									title: 'Error',
									message: error.data,
									variant: 'error',
									dismissable: true,
								})
							)
						}))
				break
			case 'delete':
				val?._id &&
					(await removeEntry(val._id)
						.unwrap()
						.then(payload => {
							dispatch(
								pushNotification({
									title: 'Success',
									message: payload,
									variant: 'success',
									dismissable: true,
								})
							)
						})
						.catch(error => {
							hasError = true
							dispatch(
								pushNotification({
									title: 'Error',
									message: error.data,
									variant: 'error',
									dismissable: true,
								})
							)
						}))
				break
		}
		if (!hasError) {
			dispatch(setModalType(null))
			dispatch(setCurrentEntry(null))
		}
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
			content: <EntryContainer entry={entry} />,
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

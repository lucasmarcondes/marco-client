import { useDispatch, useSelector } from 'react-redux'

import { useCreateEntryMutation, useGetTemplatesQuery, useRemoveEntryMutation, useUpdateEntryMutation } from '../../store/api'
import { pushToastMessage, setCurrentEntry, setModalType, updateCurrentEntry } from '../../store/root'
import { RootState } from '../../store/store'
import { IEntry } from '../../types'
import { Modal } from '../common'
import { IModalContent } from '../common/Modal'
import { EntryContainer } from './'

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
						.then(() => {
							dispatch(
								pushToastMessage({
									title: 'Success',
									message: 'Entry created successfully',
									variant: 'success',
									dismissable: true
								})
							)
						})
						.catch(({ data: error }) => {
							hasError = true
							dispatch(
								pushToastMessage({
									title: 'Error',
									message: error.message,
									variant: 'error',
									dismissable: true
								})
							)
						}))
				break
			case 'update':
				val &&
					(await updateEntry(val)
						.unwrap()
						.then((payload) => {
							dispatch(
								pushToastMessage({
									title: 'Success',
									message: payload.message,
									variant: 'success',
									dismissable: true
								})
							)
						})
						.catch(({ data: error }) => {
							hasError = true
							dispatch(
								pushToastMessage({
									title: 'Error',
									message: error.message,
									variant: 'error',
									dismissable: true
								})
							)
						}))
				break
			case 'delete':
				val?._id &&
					(await removeEntry(val._id)
						.unwrap()
						.then((payload) => {
							dispatch(
								pushToastMessage({
									title: 'Success',
									message: payload.message,
									variant: 'success',
									dismissable: true
								})
							)
						})
						.catch(({ data: error }) => {
							hasError = true
							dispatch(
								pushToastMessage({
									title: 'Error',
									message: error.message,
									variant: 'error',
									dismissable: true
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
					onKeyUp={(e) => dispatch(updateCurrentEntry({ title: (e.target as HTMLInputElement).value }))}
					defaultValue={entry.title}
					className="w-full rounded-md bg-transparent p-1 pl-0 text-3xl md:text-4xl"
					placeholder="Title"
				/>
			),
			content: <EntryContainer entry={entry} />,
			size: 'h-4/5vh w-2/3',
			actions: (
				<>
					{type != 'create' && (
						<button className="danger w-full md:w-1/12" onClick={() => closeModal('delete', entry)}>
							Delete
						</button>
					)}
					<button className="secondary  w-full md:w-1/12" onClick={() => closeModal('cancel')}>
						Cancel
					</button>
					{type === 'create' ? (
						<button className="primary  w-full md:w-1/12" onClick={() => closeModal('create', entry)}>
							Create
						</button>
					) : (
						<button className="primary w-full md:w-1/12" onClick={() => closeModal('update', entry)}>
							Save
						</button>
					)}
				</>
			)
		}
	} else {
		if (templates?.length === 1) {
			const { _id: templateId, properties } = templates[0]
			dispatch(setCurrentEntry({ templateId, properties }))
		} else {
			modalContent = {
				title: 'Select a Template',
				content: (
					<ul className="w-80 divide-y rounded-lg border bg-white text-lg shadow-sm dark:border-0 dark:bg-gray-800 dark:text-gray-300">
						{templates?.map((template, index) => (
							<button
								onClick={() => {
									const { _id: templateId, properties } = template
									dispatch(setCurrentEntry({ templateId, properties }))
									modalContent = null
								}}
								className=" block w-full border-gray-300 py-2 text-gray-700 hover:bg-gray-100"
								key={index}
							>
								{template.description}
							</button>
						))}
					</ul>
				)
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

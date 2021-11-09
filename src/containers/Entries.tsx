import { Filters, Entry, SearchBar } from '../components/entries'
import { Modal } from '../components/default/Modal'
import { useState } from 'react'
import { LooseObject, Entry as EntryType } from '../types'
import { BsPlus } from 'react-icons/bs'
import { IModalContent } from '../components/default/Modal'

import { useGetEntriesQuery, useGetTemplatesQuery } from '../store/api'

export const Entries = () => {
	const { data: entries } = useGetEntriesQuery()
	const { data: templates } = useGetTemplatesQuery()

	const [state, setState] = useState({
		searchKey: '',
		filters: { chronoSort: 'newFirst', properties: new Array<String>(), templates: new Array<String>(), startDate: null, endDate: null },
		modalContent: null as IModalContent,
		currentEntry: {} as EntryType,
	})

	const searchAgainst = ['title', 'properties', 'text', 'createdDate']

	let filteredEntries =
		entries &&
		entries.filter(entry => {
			let obj: LooseObject = { ...entry }
			let searchList: string[] = []
			let matches = true
			searchAgainst.forEach(key => {
				searchList.push(obj[key])
			})
			if (state.filters.templates.length > 0) {
				matches = state.filters.templates.includes(obj.templateId)
			}
			if (matches && state.filters.properties.length > 0) {
				matches = state.filters.properties.every((prop: any) => obj.properties.some((e: any) => e.type === prop))
			}
			if (matches && state.filters.startDate) {
				matches = new Date(obj.lastModifiedDate).getTime() - new Date(state.filters.startDate).getTime() > 0
			}
			if (matches && state.filters.endDate) {
				matches = new Date(obj.lastModifiedDate).getTime() - new Date(state.filters.endDate).getTime() < 0
			}
			return matches && JSON.stringify(searchList).toLowerCase().includes(state.searchKey.toLowerCase())
		})
	if (state.filters.chronoSort == 'newFirst') {
		filteredEntries =
			filteredEntries &&
			filteredEntries
				.sort((a, b) => {
					return new Date(a.lastModifiedDate).getTime() - new Date(b.lastModifiedDate).getTime()
				})
				.reverse()
	} else {
		filteredEntries =
			filteredEntries &&
			filteredEntries.sort((a, b) => {
				return new Date(a.lastModifiedDate).getTime() - new Date(b.lastModifiedDate).getTime()
			})
	}

	const updateSearchKey = (searchKey: string) => {
		setState({ ...state, searchKey })
	}
	const updateFilters = (filters: any) => {
		setState({ ...state, filters })
	}

	const closeModal = () => {
		setState({ ...state, modalContent: null })
	}

	const updateCurrentEntry = (val: any) => {
		setState({ ...state, currentEntry: { ...state.currentEntry, ...val } })
	}

	const showTemplateSelectionModal = () => {
		if (templates?.length === 1) {
			updateCurrentEntry({ templateId: templates[0]._id })
			return showEntryModal()
		}
		setState({
			...state,
			modalContent: {
				title: 'Select a template',
				content: (
					<ul className='divide-y bg-white border rounded-lg shadow-sm text-lg w-80'>
						{templates?.map((template, index) => (
							<button
								onClick={() => {
									updateCurrentEntry({ templateId: template._id })
									showEntryModal()
								}}
								className=' border-gray-300 w-full py-2 text-gray-700 block hover:bg-gray-100'
								key={index}
							>
								{template.description}
							</button>
						))}
					</ul>
				),
			},
		})
	}

	const showEntryModal = () => {
		setState({
			...state,
			modalContent: {
				title: 'New Entry',
				content: <div>Insert new Entry Information Here</div>,
				actions: (
					<>
						<button className='danger'>Delete</button>
						<button className='secondary' onClick={closeModal}>
							Cancel
						</button>
						<button className='primary'>Edit</button>
						<button className='primary'>Submit</button>
					</>
				),
			},
		})
	}

	return (
		<div className='flex p-4 md:p-8'>
			<div className='w-80'>
				<Filters filters={state.filters} onChange={updateFilters} />
			</div>
			<div className='flex-1'>
				<div className='border-solid border-light-800 border-l-1 ml-10'>
					<div className='flex m-8 mb-5'>
						<SearchBar className='grow' onSearch={updateSearchKey} />
						<NewEntryButton onClick={showTemplateSelectionModal} />
					</div>
					{entries && (
						<div>
							<EntryList entries={filteredEntries} searchedText={state.searchKey} />
						</div>
					)}
				</div>
			</div>
			<Modal modalContent={state.modalContent} onClose={closeModal} />
		</div>
	)
}

type EntryListProps = {
	entries: EntryType[] | undefined
	searchedText: string
}
export const EntryList = ({ entries, searchedText }: EntryListProps) => {
	return <div>{entries && entries.map((val, index) => <Entry key={index} entry={val} index={index} searchedText={searchedText} />)}</div>
}

interface NewEntryButtonProps {
	onClick: () => void
}
export const NewEntryButton = ({ onClick }: NewEntryButtonProps) => (
	<button onClick={onClick} className='ml-2 secondary'>
		<BsPlus className='my-auto h-6 w-6' />
		<span className='my-auto w-max'>New Entry</span>
	</button>
)

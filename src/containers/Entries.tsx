import { Filters, Entry, SearchBar, EntryModal } from '../components/entries'
import { useState } from 'react'
import { ILooseObject, IEntry, IModalType } from '../types'
import { BsPlus } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentEntry, setModalType } from '../store/root'
import { RootState } from '../store/store'

import { useGetEntriesQuery } from '../store/api'

const SearchProps = ['title', 'properties', 'text', 'createdDate']
const PageSize = 5

export const Entries = () => {
	const { data: entries } = useGetEntriesQuery()
	const modalType = useSelector((state: RootState) => state.root.modalType)
	const dispatch = useDispatch()

	interface IStateProps {
		searchKey: string
		filters: any
		currentPage: any
	}

	const [state, setState] = useState<IStateProps>({
		searchKey: '',
		currentPage: 1,
		filters: { chronoSort: 'newFirst', properties: new Array<String>(), templates: new Array<String>(), startDate: null, endDate: null },
	})

	let filteredEntries = !entries
		? new Array<IEntry>(PageSize)
		: entries.filter(entry => {
				let obj: ILooseObject = { ...entry }
				let searchList: string[] = []
				let matches = true
				SearchProps.forEach(key => {
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
		filteredEntries = filteredEntries
			.sort((a, b) => {
				if (a?.lastModifiedDate && b?.lastModifiedDate) {
					return new Date(a.lastModifiedDate).getTime() - new Date(b.lastModifiedDate).getTime()
				}
				return 0
			})
			.reverse()
	} else {
		filteredEntries = filteredEntries.sort((a, b) => {
			if (a?.lastModifiedDate && b?.lastModifiedDate) {
				return new Date(a.lastModifiedDate).getTime() - new Date(b.lastModifiedDate).getTime()
			}
			return 0
		})
	}

	const updateSearchKey = (searchKey: string) => {
		setState({ ...state, currentPage: 1, searchKey: searchKey })
	}
	const updateFilters = (filters: any) => {
		setState({ ...state, currentPage: 1, filters })
	}

	const openModal = (type: IModalType, entry?: IEntry | null) => {
		entry && dispatch(setCurrentEntry(entry))
		dispatch(setModalType(type))
	}

	return (
		<div className='flex h-full p-4 md:p-8 dark:bg-gray-500 dark:border-0 dark:text-light-300'>
			<div className='top-4 w-80 sticky'>
				<Filters filters={state.filters} onChange={updateFilters} />
			</div>
			<div className='flex-1'>
				<div className='border-solid border-light-800 border-l-1 ml-10'>
					<div className='flex m-8 mb-5'>
						<SearchBar className='grow' onSearch={updateSearchKey} />
						<NewEntryButton onClick={() => openModal('create')} />
					</div>
					{filteredEntries.map((entry, index) => (
						<Entry key={index} entry={entry} searchedText={state.searchKey} onClick={openModal} />
					))}
				</div>
			</div>
			{modalType && <EntryModal />}
		</div>
	)
}

interface INewEntryButtonProps {
	onClick: () => void
}
export const NewEntryButton = ({ onClick }: INewEntryButtonProps) => (
	<button onClick={onClick} className='ml-2 py-0 secondary'>
		<BsPlus className='my-auto h-5 w-6' />
		<span className='my-auto w-max  hidden md:block'>New Entry</span>
	</button>
)

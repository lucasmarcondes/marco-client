import { Filters, Entry, SearchBar, EntryModal } from '../components/entries'
import { useState } from 'react'
import { ILooseObject, IEntry, IModalType } from '../types'
import { BsChevronLeft, BsChevronRight, BsPlus } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentEntry, setModalType } from '../store/root'
import { RootState } from '../store/store'

import { useGetEntriesQuery } from '../store/api'

const SearchProps = ['title', 'properties', 'text', 'createdDate']
const PageSize = 1

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
		? []
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
		setState({ ...state, currentPage: 1, searchKey: searchKey })
	}
	const updateFilters = (filters: any) => {
		setState({ ...state, currentPage: 1, filters })
	}
	const updateCurrentPage = (page: number) => {
		setState({ ...state, currentPage: page })
	}

	const lastPageIndex: number = state.currentPage * PageSize
	const firstPageIndex: number = lastPageIndex - PageSize
	const pages: number = Math.ceil(filteredEntries.length / PageSize)
	const currentEntries = filteredEntries && filteredEntries.slice(firstPageIndex, lastPageIndex)

	let pageNumbers = [state.currentPage, pages]
	if (!pageNumbers.includes(1)) pageNumbers.unshift(1)
	// let range = 2
	// for (let i = 1; i < range; i++) {
	// 	if (state.currentPage - i > 0) pageNumbers.unshift(state.currentPage - i)
	// 	if (state.currentPage + i <= pages) pageNumbers.push(state.currentPage + i)
	// }
	// if (state.currentPage == 1) pageNumbers.push(state.currentPage + 2)
	// if (state.currentPage == pages) pageNumbers.unshift(state.currentPage - 2)

	const openModal = (type: IModalType, entry?: IEntry | null) => {
		entry && dispatch(setCurrentEntry(entry))
		dispatch(setModalType(type))
	}

	return (
		<div className='flex p-4 md:p-8'>
			<div className='top-4 w-80 sticky'>
				<Filters filters={state.filters} onChange={updateFilters} />
			</div>
			<div className='flex-1'>
				<div className='border-solid border-light-800 border-l-1 ml-10'>
					<div className='flex m-8 mb-5'>
						<SearchBar className='grow' onSearch={updateSearchKey} />
						<NewEntryButton onClick={() => openModal('create')} />
					</div>
					{currentEntries &&
						currentEntries.map((entry, index) => <Entry key={index} entry={entry} searchedText={state.searchKey} onClick={openModal} />)}
					{!currentEntries &&
						[...new Array<IEntry>(PageSize)].map((entry, index) => (
							<Entry key={index} entry={entry} searchedText={state.searchKey} onClick={openModal} />
						))}
					{filteredEntries && filteredEntries?.length > PageSize && (
						<div className='flex w-full justify-center'>
							<button onClick={() => updateCurrentPage(state.currentPage - 1)} disabled={state.currentPage == 1} className='mx-1 secondary'>
								<BsChevronLeft className='my-auto h-3 mr-2 w-3' />
								Previous
							</button>
							{state.currentPage != 1 && (
								<>
									<button onClick={() => updateCurrentPage(1)} className='mx-1 secondary'>
										1
									</button>
									{state.currentPage > 2 && <span className='self-end'>...</span>}
								</>
							)}
							{state.currentPage > 2 && (
								<>
									<button onClick={() => updateCurrentPage(state.currentPage - 1)} className='mx-1 secondary'>
										{state.currentPage - 1}
									</button>
								</>
							)}
							<button onClick={() => updateCurrentPage(state.currentPage)} className='mx-1 primary'>
								{state.currentPage}
							</button>
							{state.currentPage < pages - 1 && (
								<>
									<button onClick={() => updateCurrentPage(state.currentPage + 1)} className='mx-1 secondary'>
										{state.currentPage + 1}
									</button>
								</>
							)}
							{state.currentPage != pages && (
								<>
									{state.currentPage < pages - 2 && <span className='self-end'>...</span>}
									<button onClick={() => updateCurrentPage(pages)} className='mx-1 secondary'>
										{pages}
									</button>
								</>
							)}
							<button onClick={() => updateCurrentPage(state.currentPage + 1)} disabled={state.currentPage == pages} className='mx-1 secondary'>
								Next
								<BsChevronRight className='my-auto h-3 ml-2 w-3' />
							</button>
							{/* {filteredEntries.length} */}
						</div>
					)}
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
	<button onClick={onClick} className='ml-2 secondary'>
		<BsPlus className='my-auto h-6 w-6' />
		<span className='my-auto w-max'>New Entry</span>
	</button>
)

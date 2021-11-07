import { Filters, Entry, SearchBar } from '../components/entries'
import { useState } from 'react'
import { LooseObject, Entry as EntryType } from '../types'

import { useGetEntriesQuery } from '../store/api'

export const Entries = () => {
	const { data: entries, isLoading } = useGetEntriesQuery()

	const [state, setState] = useState({
		searchKey: '',
		filters: {
			chronoSort: 'newFirst',
			properties: new Array<String>(),
			templates: new Array<String>(),
			startDate: null,
			endDate: null,
		},
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
				if (!state.filters.templates.includes(obj.templateId)) {
					matches = false
				}
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

	const updateSearchKey = (key: any) => {
		setState({ ...state, searchKey: key })
	}
	const updateFilters = (filters: any) => {
		setState({ ...state, filters: filters })
	}
	return (
		<div className='flex p-4 md:p-8'>
			<div className='w-80'>
				<Filters filters={state.filters} onChange={updateFilters} />
			</div>
			<div className='flex-1'>
				<div className='border-solid border-light-800 border-l-1 ml-10'>
					<div className='m-8 mb-5'>
						<SearchBar onSearch={updateSearchKey} />
					</div>
					<div>{!isLoading && entries ? <EntryList entries={filteredEntries} searchedText={state.searchKey} /> : null}</div>
				</div>
			</div>
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

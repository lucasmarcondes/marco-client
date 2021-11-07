import { Filters, Entry, SearchBar } from '../components/entries'
import { useState } from 'react'
import { LooseObject, Entry as EntryType } from '../types'

import { useGetEntriesQuery } from '../store/api'

export const Entries = () => {
	const { data: entries, isLoading } = useGetEntriesQuery()

	const [state, setState] = useState({
		searchKey: '',
	})

	const searchAgainst = ['title', 'properties', 'text', 'createdDate']

	const filteredEntries =
		entries &&
		entries.filter(entry => {
			let obj: LooseObject = { ...entry }
			let searchList: string[] = []
			searchAgainst.forEach(key => {
				// if (key.toLowerCase().includes('date')) {
				// 	obj[key] = obj[key].toLocaleDateString()
				// }
				searchList.push(obj[key])
			})
			// console.log('searching:', searchList)
			return JSON.stringify(searchList).toLowerCase().includes(state.searchKey.toLowerCase())
		})

	const updateSearchKey = (key: any) => {
		setState({ ...state, searchKey: key })
	}
	return (
		<div className='flex p-4 md:p-8'>
			<div className='w-80'>
				<Filters />
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

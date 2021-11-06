import { Filters, EntryList, SearchBar } from '../components/entries'
import { useState } from 'react'
import { entries } from '../testData'
import { LooseObject } from '../types'

export const Entries = () => {
	const [state, setState] = useState({
		searchKey: '',
	})

	const searchAgainst = ['title', 'properties', 'text', 'createdDate']

	const filteredEntries = entries.filter(entry => {
		let obj: LooseObject = { ...entry }
		let searchList: string[] = []
		searchAgainst.forEach(key => {
			if (key.toLowerCase().includes('date')) {
				obj[key] = obj[key].toLocaleDateString()
			}
			searchList.push(obj[key])
		})
		// console.log('searching:', searchList)
		return JSON.stringify(searchList).toLowerCase().includes(state.searchKey.toLowerCase())
	})

	const updateSearchKey = (key: any) => {
		setState({ searchKey: key })
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
					<div>
						<EntryList entries={filteredEntries} searchedText={state.searchKey} />
					</div>
				</div>
			</div>
		</div>
	)
}

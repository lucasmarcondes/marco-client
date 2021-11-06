import { Filters, Entry } from '../components/entries'
import { useEntriesQuery } from '../api/entry'

export const Entries = () => {
	const { data: entries, isLoading } = useEntriesQuery()
	return (
		<div className='flex p-4 md:p-8'>
			<div className='w-80'>
				<Filters />
			</div>
			<div className='flex-1'>
				<div className='border-solid border-light-800 border-l-2 ml-10'>
					{!isLoading && entries ? entries.map((val, index) => <Entry key={index} entry={val} />) : null}
				</div>
			</div>
		</div>
	)
}

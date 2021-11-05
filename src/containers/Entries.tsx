import { Filters, Entry } from '../components/entries'

export const Entries = () => {
	let entries = new Array(10)
	return (
		<div className='flex p-4 md:p-8'>
			<div className='w-80'>
				<Filters />
			</div>
			<div className='flex-1'>
				<div className='border-solid border-light-800 border-l-2 ml-10'>
					{[...entries].map((val, index) => {
						return <Entry key={index} entry={val} index={index} />
					})}
				</div>
			</div>
		</div>
	)
}

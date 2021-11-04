import { Filters, Entry } from '../components/entries'

export const Entries = () => {
	let entries = new Array(10)
	return (
		<div className='flex'>
			<div className='w-80'>
				<Filters />
			</div>
			<div className='flex-1'>
				<div className='border-light-800 border-solid border-l-2 ml-10'>
					{[...entries].map((val, index) => {
						return <Entry key={index} entry={val} index={index} />
					})}
				</div>
			</div>
		</div>
	)
}

import { Filters, Entry } from '../components/entries'

export const Entries = () => {
	return (
		<div className='flex'>
			<div className='w-80'>
				<Filters />
			</div>
			<div className='flex-1'>
				{[...new Array(10)].map((val, index) => {
					return <Entry key={index} />
				})}
			</div>
		</div>
	)
}

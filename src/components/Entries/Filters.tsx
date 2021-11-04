import { Tag } from '../default'

const properties = [
	{ title: 'Checkbox', type: 'checkbox' },
	{ title: 'Text', type: 'text' },
	{ title: 'Select', type: 'select' },
	{ title: 'Number	', type: 'number' },
]

export const Filters = () => {
	return (
		<div className='sticky top-4'>
			<h2 className='text-lg mb-1 font-semibold'>Sort by</h2>
			<fieldset id='chronoSort' className='mb-4 flex flex-col'>
				<div>
					<label>
						<input type='radio' name='chronoSort' value='newest' className='align-text-bottom' defaultChecked />
						<span className='pl-2'>Newest First</span>
					</label>
				</div>
				<div>
					<label>
						<input type='radio' name='chronoSort' value='oldest' className='align-text-bottom' />
						<span className='pl-2'>Oldest First</span>
					</label>
				</div>
			</fieldset>
			<h2 className='text-lg mb-1 font-semibold'>Templates</h2>
			<div className='mb-4 flex flex-col'>
				{[...new Array(4)].map((val, index) => {
					return (
						<label key={index}>
							<input type='checkbox' />
							<span className='pl-2'>Template {index + 1}</span>
						</label>
					)
				})}
			</div>
			<h2 className='text-lg mb-1 font-semibold'>Properties</h2>
			<div className='flex flex-wrap mb-4'>
				{[...properties].map((val, index) => {
					return <Tag key={index} label={val.title} className='m-1' property={val} />
				})}
			</div>
			<h2 className='text-lg mb-1 font-semibold'>Dates</h2>
			<div className='flex flex-col'>
				<label className='flex flex-col'>
					<span>Begin</span>
					<input type='date' className='mb-2 dark:( bg-gray-400 border-gray-500)' />
				</label>

				<label className='flex flex-col'>
					<span>End</span>
					<input id='endDate' type='date' className='dark:( bg-gray-400 border-gray-500)' />
				</label>
			</div>
		</div>
	)
}

import { Tag } from '../default'

export const Filters = () => {
	return (
		<div className='top-4 sticky'>
			<h2 className='font-semibold text-lg mb-1'>Sort by</h2>
			<fieldset id='chronoSort' className='flex flex-col mb-4'>
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
			<h2 className='font-semibold text-lg mb-1'>Templates</h2>
			<div className='flex flex-col mb-4'>
				{[...new Array(4)].map((val, index) => {
					return (
						<label key={index}>
							<input type='checkbox' />
							<span className='pl-2'>Template {index + 1}</span>
						</label>
					)
				})}
			</div>
			<h2 className='font-semibold text-lg mb-1'>Properties</h2>
			<div className='flex flex-wrap mb-4'>
				{[...new Array(5)].map((val, index) => {
					return <Tag key={index} label={`Property ${index}`} className='m-1' />
				})}
			</div>
			<h2 className='font-semibold text-lg mb-1'>Dates</h2>
			<div className='flex flex-col'>
				<label className='flex flex-col'>
					<span>Begin</span>
					<input type='date' className='mb-2' />
				</label>

				<label className='flex flex-col'>
					<span>End</span>
					<input id='endDate' type='date' />
				</label>
			</div>
		</div>
	)
}

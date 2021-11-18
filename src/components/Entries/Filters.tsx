import { Tag } from '../default'
import { useGetTemplatesQuery } from '../../store/api'
import { ILooseObject } from '../../types'

const properties = [
	{ title: 'Checkbox', type: 'checkbox' },
	{ title: 'Text', type: 'text' },
	{ title: 'Select', type: 'select' },
	{ title: 'Number	', type: 'number' },
]

type FiltersProp = {
	onChange: (filters: any) => void
	filters: ILooseObject
}

export const Filters = ({ onChange, filters }: FiltersProp) => {
	const { data: templates, isLoading } = useGetTemplatesQuery()

	const handleFilterChange = (e: any) => {
		// handle adding to list
		switch (e.target.name) {
			case 'properties':
			case 'templates':
				let filterList = [...filters[e.target.name]]
				let index = filterList.indexOf(e.target.id)
				if (index > -1) filterList.splice(index, 1)
				else filterList.push(e.target.id)
				onChange({ ...filters, [e.target.name]: filterList })
				break
			case 'startDate':
			case 'endDate':
				onChange({ ...filters, [e.target.name]: e.target.value })
				break
			default:
				onChange({ ...filters, [e.target.name]: e.target.id })
				break
		}
	}

	return (
		<form onChange={handleFilterChange}>
			<div className='top-4 sticky'>
				<h2 className='font-semibold text-lg mb-1'>Sort by</h2>
				<fieldset id='chronoSort' className='flex flex-col mb-4'>
					<div>
						<label>
							<input id='newFirst' type='radio' name='chronoSort' value='newest' className='align-text-bottom' defaultChecked />
							<span className='pl-2'>Newest First</span>
						</label>
					</div>
					<div>
						<label>
							<input id='oldFirst' type='radio' name='chronoSort' value='oldest' className='align-text-bottom' />
							<span className='pl-2'>Oldest First</span>
						</label>
					</div>
				</fieldset>
				<h2 className='font-semibold text-lg mb-1'>Templates</h2>
				<div className='flex flex-col mb-4'>
					{!isLoading &&
						templates &&
						templates.map((val, index) => {
							return (
								<label key={index}>
									<input name='templates' type='checkbox' id={val._id} />
									<span className='pl-2'>{val.description}</span>
								</label>
							)
						})}
				</div>
				<h2 className='font-semibold text-lg mb-1'>Properties</h2>
				<div className='flex flex-wrap mb-4'>
					{properties.map(prop => {
						let type = filters.properties.includes(prop.type) ? 'checked' : prop.type
						return (
							<span key={prop.type}>
								<input type='checkbox' name='properties' id={prop.type} className='hidden' onClick={handleFilterChange} />
								<label htmlFor={prop.type}>
									<Tag type={type} label={prop.title} className='border-1 m-1 hover:(cursor-pointer bg-light-200 border-dark-100) ' />
								</label>
							</span>
						)
					})}
				</div>
				<h2 className='font-semibold text-lg mb-1'>Dates</h2>
				<div className='flex flex-col'>
					<label className='flex flex-col'>
						<span>Begin</span>
						<input name='startDate' type='date' className='mb-2 dark:( bg-gray-400 border-gray-500) ' />
					</label>

					<label className='flex flex-col'>
						<span>End</span>
						<input name='endDate' type='date' className='dark:( bg-gray-400 border-gray-500) ' />
					</label>
				</div>
			</div>
		</form>
	)
}

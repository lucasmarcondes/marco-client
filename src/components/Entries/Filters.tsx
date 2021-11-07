import { Tag } from '../default'
import { useGetTemplatesQuery } from '../../store/api'
import { useState, useEffect } from 'react'

const properties = [
	{ title: 'Checkbox', type: 'checkbox' },
	{ title: 'Text', type: 'text' },
	{ title: 'Select', type: 'select' },
	{ title: 'Number	', type: 'number' },
]

type FiltersProp = {
	onChange: (filters: any) => void
	filters: {}
}

export const Filters = ({ onChange, filters }: FiltersProp) => {
	const { data: templates, isLoading } = useGetTemplatesQuery()

	const handleFilterChange = (e: any) => {
		switch (e.target.name) {
			case 'startDate' || 'endDate':
				onChange({ ...filters, [e.target.name]: e.target.value })
			default:
				onChange({ ...filters, [e.target.name]: e.target.id })
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
					{!isLoading && templates
						? templates.map((val, index) => {
								return (
									<label key={index}>
										<input name='templates' type='checkbox' id={val._id} />
										<span className='pl-2'>Template {index + 1}</span>
									</label>
								)
						  })
						: ''}
				</div>
				<h2 className='font-semibold text-lg mb-1'>Properties</h2>
				<div className='flex flex-wrap mb-4'>
					{[...properties].map(val => {
						return (
							<span key={val.type}>
								<input name='properties' id={val.type} className='hidden' onClick={handleFilterChange} />
								<label htmlFor={val.type}>
									<Tag label={val.title} className='m-1' property={val} />
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

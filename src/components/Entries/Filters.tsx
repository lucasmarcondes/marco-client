import { useGetTemplatesQuery } from '../../store/api'
import { ILooseObject } from '../../types'
import { Tag } from '../common'

const properties = [
	{ title: 'Checkbox', type: 'checkbox' },
	{ title: 'Text', type: 'text' },
	{ title: 'Select', type: 'select' },
	{ title: 'Number	', type: 'number' }
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
				const filterList = [...filters[e.target.name]]
				const index = filterList.indexOf(e.target.id)
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
			<div className="sticky top-4">
				<h2 className="mb-1 text-lg font-semibold">Sort by</h2>
				<fieldset id="chronoSort" className="mb-4 flex flex-col">
					<div>
						<label>
							<input
								id="newFirst"
								type="radio"
								name="chronoSort"
								value="newest"
								className="selected:dark:bg-gray-300 selected:dark:text-black border-black align-text-bottom dark:border-black dark:text-black"
								defaultChecked
							/>
							<span className="pl-2">Newest First</span>
						</label>
					</div>
					<div>
						<label>
							<input
								id="oldFirst"
								type="radio"
								name="chronoSort"
								value="oldest"
								className="selected:dark:bg-gray-300 selected:dark:text-black border-black align-text-bottom dark:border-black dark:text-black"
							/>
							<span className="pl-2">Oldest First</span>
						</label>
					</div>
				</fieldset>
				<h2 className="mb-1 text-lg font-semibold">Templates</h2>
				<div className="mb-4 flex flex-col">
					{!isLoading &&
						templates &&
						templates.map((val, index) => {
							return (
								<label key={index}>
									<input
										name="templates"
										type="checkbox"
										id={val._id}
										className="selected:dark:bg-gray-300 selected:dark:text-black border-black align-text-bottom dark:border-black dark:text-black"
									/>
									<span className="pl-2">{val.description}</span>
								</label>
							)
						})}
				</div>
				<h2 className="mb-1 text-lg font-semibold">Properties</h2>
				<div className="mb-4 flex flex-wrap">
					{properties.map((prop) => {
						const type = filters.properties.includes(prop.type) ? 'checked' : prop.type
						return (
							<span key={prop.type}>
								<input type="checkbox" name="properties" id={prop.type} className="hidden" onClick={handleFilterChange} />
								<label htmlFor={prop.type}>
									<Tag
										type={type}
										label={prop.title}
										className="m-1 border hover:cursor-pointer hover:border-gray-500 hover:bg-gray-200 dark:border-gray-500"
									/>
								</label>
							</span>
						)
					})}
				</div>
				<h2 className="mb-1 text-lg font-semibold">Dates</h2>
				<div className="flex flex-col">
					<label className="flex flex-col">
						<span>Begin</span>
						<input name="startDate" type="date" className="mb-2 dark:border-gray-800 dark:bg-gray-300 dark:text-black" />
					</label>

					<label className="flex flex-col">
						<span>End</span>
						<input name="endDate" type="date" className="dark:border-gray-800 dark:bg-gray-300 dark:text-black" />
					</label>
				</div>
			</div>
		</form>
	)
}

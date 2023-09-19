import { useDispatch } from 'react-redux'

import { updateCurrentTemplate } from '../../store/root'
import { ITemplate } from '../../types'

export interface ITemplateListProps {
	templates: ITemplate[]
	currentTemplate: ITemplate
}

export const TemplateList = ({ templates, currentTemplate }: ITemplateListProps) => {
	const dispatch = useDispatch()

	return (
		<>
			{templates?.map((template) => (
				<button
					key={template._id}
					onClick={() => dispatch(updateCurrentTemplate(template))}
					className={`${
						template._id === currentTemplate?._id ? 'bg-gray-800 text-white' : 'hover:bg-gray-200'
					} my-1 block w-full rounded-l-md px-3 py-2 text-left transition ease-in`}
				>
					{template.description}
				</button>
			))}
			<button
				onClick={() => dispatch(updateCurrentTemplate(template))}
				className="my-1 block w-full rounded-l-md px-3 py-2 text-left text-blue-500 transition ease-in hover:bg-gray-200"
			>
				Add a New Template
			</button>
		</>
	)
}

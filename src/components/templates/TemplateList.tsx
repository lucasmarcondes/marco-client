import { updateCurrentTemplate } from '../../store/root'
import { useDispatch } from 'react-redux'
import { ITemplate } from '../../types'

export interface ITemplateListProps {
	templates: ITemplate[]
	currentTemplate: ITemplate
}

export const TemplateList = ({ templates, currentTemplate }: ITemplateListProps) => {
	const dispatch = useDispatch()

	return (
		<>
			{templates?.map(template => (
				<button
					key={template._id}
					onClick={() => dispatch(updateCurrentTemplate(template))}
					className={`${
						template._id === currentTemplate?._id ? 'bg-gray-800 text-white' : 'hover:bg-gray-200'
					} my-1 rounded-l-md text-left w-full py-2 px-3 transition ease-in block`}
				>
					{template.description}
				</button>
			))}
			<button
				onClick={() => dispatch(updateCurrentTemplate(template))}
				className='rounded-l-md my-1 text-left w-full py-2 px-3 transition ease-in text-blue-500 block hover:bg-gray-200'
			>
				Add a New Template
			</button>
		</>
	)
}

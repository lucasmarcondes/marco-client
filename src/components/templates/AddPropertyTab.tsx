import { IconType } from 'react-icons'
import { BsCheck, BsHash, BsMenuButtonWide, BsType } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import { updateCurrentTemplate } from '../../store/root'
import { IProperty, ITemplate, PropertyType } from '../../types'

export interface IAddPropertyTabProps {
	template: ITemplate
}

export const AddPropertyTab = ({ template }: IAddPropertyTabProps) => {
	const dispatch = useDispatch()

	const addProperty = (type: PropertyType) => {
		const newProperty: IProperty = { _id: new Date().getTime().toString(), type, description: 'description', showOnCard: false }
		const properties = [...(template.properties as IProperty[]), newProperty]
		dispatch(updateCurrentTemplate({ properties }))
	}

	interface IPropButton {
		type: PropertyType
		description: string
		icon: IconType
	}

	const propButtons: IPropButton[] = [
		{ type: 'text', description: 'single line of text', icon: BsType },
		{ type: 'checkbox', description: 'true or false input', icon: BsCheck },
		{ type: 'number', description: 'number-based input', icon: BsHash },
		{ type: 'select', description: 'dropdown for single or multiple items', icon: BsMenuButtonWide }
	]
	return (
		<>
			{propButtons.map((btn, index) => (
				<button
					onClick={() => addProperty(btn.type)}
					key={index}
					className="group my-1 flex w-full rounded-md py-2 transition ease-in hover:bg-gray-200"
				>
					<btn.icon className="mx-3 my-auto h-9 w-9 rounded-md bg-gray-100 p-2 transition ease-in group-hover:bg-white" />
					<div className="pr-1 text-left">
						<div className="text-lg font-bold">{btn.type.charAt(0).toUpperCase() + btn.type.slice(1)}</div>
						<span>{btn.description}</span>
					</div>
				</button>
			))}
		</>
	)
}

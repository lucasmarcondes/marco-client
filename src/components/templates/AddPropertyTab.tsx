import { BsType, BsCheck, BsHash, BsMenuButtonWide } from 'react-icons/bs'
import { IconType } from 'react-icons'
import { ITemplate, IProperty, PropertyType } from '../../types'
import { useDispatch } from 'react-redux'
import { updateCurrentTemplate } from '../../store/root'

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
		{ type: 'select', description: 'dropdown for single or multiple items', icon: BsMenuButtonWide },
	]
	return (
		<>
			{propButtons.map((btn, index) => (
				<button
					onClick={() => addProperty(btn.type)}
					key={index}
					className='rounded-md flex my-1 w-full py-2 transition ease-in group hover:bg-gray-200'
				>
					<btn.icon className='rounded-md my-auto bg-gray-100 h-9 mx-3 p-2 transition ease-in w-9 group-hover:bg-white' />
					<div className='text-left pr-1'>
						<div className='font-bold text-medium'>{btn.type.charAt(0).toUpperCase() + btn.type.slice(1)}</div>
						<span>{btn.description}</span>
					</div>
				</button>
			))}
		</>
	)
}

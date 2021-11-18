import { MultiSelect, Select } from '../default'
import { IProperty } from '../../types'
import { Entry } from '.'

type IPropertyValue = string | string[] | boolean

export interface IPropertyProps {
	property: IProperty
	onChange: (val: IProperty) => void
}

const renderComponent = (property: IProperty, onChange: (val: IProperty) => void) => {
	const updateProperty = (val: IPropertyValue) => {
		const newProperty = { ...property }
		newProperty.value = val
		onChange(newProperty)
	}

	switch (property.type) {
		case 'text':
		case 'number':
			return (
				<input
					type={property.type}
					defaultValue={`${property.value || property.default}`}
					className='w-full'
					onInput={e => updateProperty((e.target as HTMLInputElement).value)}
				/>
			)
		case 'checkbox':
			return (
				<div className='border rounded-md flex border-gray-300 h-10'>
					<input
						type='checkbox'
						defaultChecked={!!property.value || !!property.default}
						className='my-auto ml-2'
						onInput={e => updateProperty((e.target as HTMLInputElement).checked)}
					/>
				</div>
			)
		case 'select':
			const Component = property.multipleValues ? MultiSelect : Select
			return <Component defaultValue={property.default as string & string[]} options={property.options as string[]} onSelect={updateProperty} />
	}
}

export const Property = ({ property, onChange }: IPropertyProps) => (
	<label>
		<span className='text-sm'>{property.description}</span>
		{renderComponent(property, onChange)}
	</label>
)

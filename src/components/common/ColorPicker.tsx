import { useEffect, useState } from 'react'
import { BsEyedropper } from 'react-icons/bs'

export interface IColorPickerProps {
	value: string
	title?: string
	id: string
	onChange: (color: string) => void
}
export const ColorPicker = ({ value, onChange, title, id }: IColorPickerProps) => {
	const setValue = (val: string) => {
		onChange(val)
	}

	let style = { background: value }

	return (
		<div className='flex' title={title}>
			<input
				type='color'
				id={id}
				defaultValue={value}
				onBlur={e => setValue(e.target.value)}
				className='h-0 w-0'
				style={{ background: value, borderColor: value }}
			/>
			<label htmlFor={id} className='rounded-full cursor-pointer flex my-auto border-2 h-6 w-6' style={style}></label>
		</div>
	)
}

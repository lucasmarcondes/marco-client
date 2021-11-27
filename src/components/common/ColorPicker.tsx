import { useEffect, useState } from 'react'
import { BsEyedropper } from 'react-icons/bs'

export interface IColorPickerProps {
	value: string
	title?: string
	id: string
	onChange: (color: string) => void
}
const colors = ['red', 'green', 'blue', 'warm-gray']
const variants = [500]
export const ColorPicker = ({ value, onChange, title, id }: IColorPickerProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [textColor, setTextColor] = useState('text-white')
	const setValue = (color: string, variant: number) => {
		onChange(color + '-' + variant)
	}

	useEffect(() => {
		if (value) {
			let variant = value.split('-').pop()
			if (variant && parseInt(variant) > 400) {
				setTextColor('text-white')
			} else {
				setTextColor('text-black')
			}
		}
	}, [value])

	return (
		<div className='flex relative' title={title}>
			{/* <input
				type='color'
				id={id}
				defaultValue={value}
				onBlur={e => setValue(e.target.value)}
				className='h-0 w-0'
				style={{ background: value, textColor: value }}
			/>
			<label htmlFor={id} className='rounded-full cursor-pointer flex my-auto border-2 h-6 w-6' style={style}></label> */}
			<div onClick={() => setIsOpen(!isOpen)} className={'rounded-full cursor-pointer flex my-auto border-1 h-8 w-8 bg-' + value}>
				<BsEyedropper className={'m-auto h-4 w-4 ' + textColor} />
			</div>
			{isOpen && (
				<div className='border rounded-md border-gray-300 top-full shadow-lg mt-2 origin-top-right right-50 absolute'>
					<div className='bg-white rounded-md shadow-xs p-2'>
						<div className='flex'>
							{colors.map(color => (
								<div key={color} className=''>
									{variants.map(variant => (
										<div
											key={color + '-' + variant}
											onClick={() => setValue(color, variant)}
											className={'rounded-full cursor-pointer h-6 my-1 mx-1 w-6 bg-' + color + '-' + variant}
										></div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

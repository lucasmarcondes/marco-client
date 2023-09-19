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
export const ColorPicker = ({ value, onChange, title }: IColorPickerProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [textColor, setTextColor] = useState('text-white')
	const setValue = (color: string, variant: number) => {
		onChange(color + '-' + variant)
	}

	useEffect(() => {
		if (value) {
			const variant = value.split('-').pop()
			if (variant && parseInt(variant) > 400) {
				setTextColor('text-white')
			} else {
				setTextColor('text-black')
			}
		}
	}, [value])

	return (
		<div className="relative flex" title={title}>
			{/* <input
				type='color'
				id={id}
				defaultValue={value}
				onBlur={e => setValue(e.target.value)}
				className='h-0 w-0'
				style={{ background: value, textColor: value }}
			/>
			<label htmlFor={id} className='rounded-full cursor-pointer flex my-auto border-2 h-6 w-6' style={style}></label> */}
			<div onClick={() => setIsOpen(!isOpen)} className={'border-1 bg- my-auto flex h-8 w-8 cursor-pointer rounded-full' + value}>
				<BsEyedropper className={'m-auto h-4 w-4 ' + textColor} />
			</div>
			{isOpen && (
				<div className="absolute top-full mt-2 origin-top-right rounded-md border border-gray-300 shadow-lg">
					<div className="rounded-md bg-white p-2 shadow-sm">
						<div className="flex">
							{colors.map((color) => (
								<div key={color} className="">
									{variants.map((variant) => (
										<div
											key={color + '-' + variant}
											onClick={() => setValue(color, variant)}
											className={'bg- mx-1 my-1 h-6 w-6 cursor-pointer rounded-full' + color + '-' + variant}
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

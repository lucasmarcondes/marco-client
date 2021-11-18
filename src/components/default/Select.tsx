import { useState } from 'react'
import { useCombobox } from 'downshift'
import { BsChevronDown } from 'react-icons/bs'

export interface ISelectProps {
	options: string[]
	defaultValue: string
	onSelect: (val: any) => void
}

export const Select = ({ defaultValue, onSelect, options }: ISelectProps) => {
	const [inputOptions, setInputOptions] = useState<string[]>(options)
	const { openMenu, isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } =
		useCombobox({
			items: inputOptions,
			selectedItem: defaultValue,
			onSelectedItemChange: ({ selectedItem }) => {
				onSelect(selectedItem)
			},
			onInputValueChange: ({ inputValue }) => {
				setInputOptions(options.filter(item => item.toLowerCase().startsWith((inputValue as string).toLowerCase())))
			},
		})
	return (
		<div className='h-10 relative'>
			<div
				className={`${
					isOpen && 'shadow-lg border-blue-200 ring-offset-0 ring-2 ring-opacity-50 ring-blue-500 transition ease-in duration-25 z-50'
				} absolute rounded-md border border-gray-300 w-full bg-white min-h-10 flex flex-col`}
			>
				<div className='flex p-1' {...getComboboxProps()}>
					<input
						className='bg-transparent flex-1 p-1'
						{...getInputProps({
							onFocus: e => {
								!e.target.value && !isOpen ? openMenu() : e.target.select()
							},
						})}
					/>
					<button type='button' className='flex' {...getToggleButtonProps()} aria-label={'toggle menu'}>
						<BsChevronDown className={`${isOpen && 'transform rotate-180'} mt-2 mr-2`} />
					</button>
				</div>
				<ul {...getMenuProps()}>
					{isOpen && inputOptions.length > 0
						? inputOptions.map((item, index) => (
								<li
									className={`${highlightedIndex === index && 'bg-gray-100'} bg-white py-1 px-2 last:rounded-b-md`}
									key={`${item}${index}`}
									{...getItemProps({ item, index })}
								>
									{item}
								</li>
						  ))
						: isOpen && <li className='m-1 text-sm'>No results found</li>}
				</ul>
			</div>
		</div>
	)
}

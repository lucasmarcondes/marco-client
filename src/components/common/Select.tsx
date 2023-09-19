import { useCombobox } from 'downshift'
import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

export interface ISelectProps {
	options: string[]
	defaultValue: string
	onSelect: (val: any) => void
}

export const Select = ({ defaultValue, onSelect, options }: ISelectProps) => {
	const [inputOptions, setInputOptions] = useState<string[]>(options)
	const { openMenu, isOpen, getToggleButtonProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
		items: inputOptions,
		selectedItem: defaultValue,
		onSelectedItemChange: ({ selectedItem }) => {
			onSelect(selectedItem)
		},
		onInputValueChange: ({ inputValue }) => {
			setInputOptions(options.filter((item) => item.toLowerCase().startsWith((inputValue as string).toLowerCase())))
		}
	})
	return (
		<div className="relative h-10">
			<div
				className={`${
					isOpen && 'z-50 border-blue-200 shadow-lg ring-2 ring-blue-500 ring-offset-0 transition ease-in'
				} absolute flex w-full flex-col rounded-md border border-gray-300 bg-white`}
			>
				<div className="flex p-1" {...getComboboxProps()}>
					<input
						className="flex-1 bg-transparent p-1"
						{...getInputProps({
							onFocus: (e) => {
								!e.target.value && !isOpen ? openMenu() : e.target.select()
							}
						})}
					/>
					<button type="button" className="flex" {...getToggleButtonProps()} aria-label={'toggle menu'}>
						<BsChevronDown className={`${isOpen && 'rotate-180'} mr-2 mt-2`} />
					</button>
				</div>
				<ul {...getMenuProps()}>
					{isOpen && inputOptions.length > 0
						? inputOptions.map((item, index) => (
								<li
									className={`${highlightedIndex === index && 'bg-gray-100'} bg-white px-2 py-1 last:rounded-b-md`}
									key={`${item}${index}`}
									{...getItemProps({ item, index })}
								>
									{item}
								</li>
						  ))
						: isOpen && <li className="m-1 text-sm">No results found</li>}
				</ul>
			</div>
		</div>
	)
}

import { useState } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { BsX, BsChevronDown } from 'react-icons/bs'

export interface IMultiSelectProps {
	options: string[]
	onSelect: (val: string[]) => void
	defaultValue: string[] | undefined
}

export const MultiSelect = ({ defaultValue, options, onSelect }: IMultiSelectProps) => {
	const [inputValue, setInputValue] = useState('')
	const { getSelectedItemProps, getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({
		initialSelectedItems: defaultValue || [],
		onStateChange: ({ type, selectedItems }) => {
			switch (type) {
				case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
				case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
					onSelect(selectedItems as string[])
					break
			}
		},
	})

	const getFilteredOptions = () =>
		options.filter(item => {
			return (selectedItems as string[]).indexOf(item) < 0 && item.toLowerCase().startsWith(inputValue.toLowerCase())
		})

	const { openMenu, isOpen, getToggleButtonProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
		inputValue,
		defaultHighlightedIndex: 0, // after selection, highlight the first item.
		selectedItem: null,
		items: getFilteredOptions(),
		stateReducer: (state, actionAndChanges) => {
			const { changes, type } = actionAndChanges
			switch (type) {
				case useCombobox.stateChangeTypes.InputKeyDownEnter:
				case useCombobox.stateChangeTypes.ItemClick:
					return {
						...changes,
						isOpen: true, // keep the menu open after selection.
					}
			}
			return changes
		},
		onStateChange: ({ inputValue, type, selectedItem }) => {
			switch (type) {
				case useCombobox.stateChangeTypes.InputChange:
					setInputValue(inputValue as string)
					break
				case useCombobox.stateChangeTypes.InputKeyDownEnter:
				case useCombobox.stateChangeTypes.ItemClick:
					if (selectedItem) {
						setInputValue('')
						onSelect([...selectedItems, selectedItem])
						addSelectedItem(selectedItem as never)
					}
					break
				default:
					break
			}
		},
	})

	return (
		<div className='h-10 relative'>
			<div
				className={`${
					isOpen && 'shadow-lg border-blue-200 ring-offset-0 ring-2 ring-opacity-50 ring-blue-500 transition ease-in duration-25 z-50'
				} absolute rounded-md border border-gray-300 w-full bg-white min-h-10 flex flex-col`}
			>
				<div className='flex p-1'>
					<div className='flex flex-wrap flex-1 ml-1.5 min-h-7.5' {...getComboboxProps()}>
						{selectedItems.map((selectedItem, index) => (
							<span
								className='rounded-md flex bg-gray-100 h-6 my-0.5 mr-1 pr-1.5 pl-0.5'
								key={`selected-item-${index}`}
								{...getSelectedItemProps({ selectedItem, index })}
							>
								<BsX
									className='cursor-pointer h-5 mt-0.75 transition w-5 hover:cursor-pointer hover:text-gray-600 hover:duration-150'
									type='button'
									onClick={e => {
										e.stopPropagation()
										removeSelectedItem(selectedItem)
									}}
								/>
								{selectedItem}
							</span>
						))}
						<input
							className='bg-transparent h-0 focus:h-auto'
							{...getInputProps({
								...getDropdownProps(),
								onFocus: e => {
									!e.target.value && !isOpen ? openMenu() : e.target.select()
								},
							})}
						/>
					</div>
					<button type='button' className='flex' {...getToggleButtonProps()} aria-label={'toggle menu'}>
						<BsChevronDown className={`${isOpen && 'transform rotate-180'} mt-2 mr-2`} />
					</button>
				</div>
				<ul className='w-full' {...getMenuProps()}>
					{isOpen && getFilteredOptions().length > 0
						? getFilteredOptions().map((item, index) => (
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

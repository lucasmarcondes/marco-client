import { useState } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { BsX, BsChevronDown } from 'react-icons/bs'

export interface IMultiSelectProps {
	options: string[]
}

export const MultiSelect = ({ options }: IMultiSelectProps) => {
	const [inputValue, setInputValue] = useState<string>('')
	const { getSelectedItemProps, getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({
		initialSelectedItems: [],
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
						addSelectedItem(selectedItem as never)
					}
					break
				default:
					break
			}
		},
	})
	return (
		<div className='w-full relative '>
			<div className={`${isOpen && 'shadow-lg'} border rounded-md w-full absolute`}>
				<div className='flex'>
					<div className='flex space-x-1.5 ml-1.5'>
						{selectedItems.map((selectedItem, index) => (
							<span
								className='rounded-md flex bg-gray-100 my-0.5 pr-1.5 pl-0.5'
								key={`selected-item-${index}`}
								{...getSelectedItemProps({ selectedItem, index })}
							>
								<BsX
									className='cursor-pointer my-auto h-5 transition w-5 hover:(cursor-pointer text-gray-600 duration-150) '
									type='button'
									onClick={() => {
										openMenu()
										removeSelectedItem(selectedItem)
									}}
								/>
								{selectedItem}
							</span>
						))}
					</div>
					<div className='flex flex-1 justify-between' {...getComboboxProps()}>
						<input
							className='flex-1 m-1 '
							{...getInputProps({
								...getDropdownProps(),
								onFocus: e => {
									!e.target.value && !isOpen ? openMenu() : e.target.select()
								},
							})}
						/>
						<button type='button' className='flex' {...getToggleButtonProps()} aria-label={'toggle menu'}>
							<BsChevronDown className={`${isOpen && 'transform rotate-180'} my-auto mr-2`} />
						</button>
					</div>
				</div>
				<ul className='w-full' {...getMenuProps()}>
					{isOpen &&
						getFilteredOptions().map((item, index) => (
							<li
								className={`${highlightedIndex === index && 'bg-gray-100'}  bg-white py-1 px-2 last:rounded-b-md`}
								key={`${item}${index}`}
								{...getItemProps({ item, index })}
							>
								{item}
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}

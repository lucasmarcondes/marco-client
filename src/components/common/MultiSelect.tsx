import { useCombobox, useMultipleSelection } from 'downshift'
import { useState } from 'react'
import { BsChevronDown, BsX } from 'react-icons/bs'

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
		}
	})

	const getFilteredOptions = () =>
		options.filter((item) => {
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
						isOpen: true // keep the menu open after selection.
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
		}
	})

	return (
		<div className="relative h-10">
			<div
				className={`${
					isOpen && 'z-50 border-blue-200 shadow-lg ring-2 ring-blue-500 ring-offset-0 transition ease-in'
				} absolute flex w-full flex-col rounded-md border border-gray-300 bg-white`}
			>
				<div className="flex p-1">
					<div className="ml-1.5 flex flex-1 flex-wrap" {...getComboboxProps()}>
						{selectedItems.map((selectedItem, index) => (
							<span
								className="my-0.5 mr-1 flex h-6 rounded-md bg-gray-100 pl-0.5 pr-1.5"
								key={`selected-item-${index}`}
								{...getSelectedItemProps({ selectedItem, index })}
							>
								<BsX
									className="mt-0.5 h-5 w-5 cursor-pointer transition hover:cursor-pointer hover:text-gray-600 hover:duration-150"
									type="button"
									onClick={(e) => {
										e.stopPropagation()
										removeSelectedItem(selectedItem)
									}}
								/>
								{selectedItem}
							</span>
						))}
						<input
							className="h-0 bg-transparent focus:h-auto"
							{...getInputProps({
								...getDropdownProps(),
								onFocus: (e) => {
									!e.target.value && !isOpen ? openMenu() : e.target.select()
								}
							})}
						/>
					</div>
					<button type="button" className="flex" {...getToggleButtonProps()} aria-label={'toggle menu'}>
						<BsChevronDown className={`${isOpen && 'rotate-180'} mr-2 mt-2`} />
					</button>
				</div>
				<ul className="w-full" {...getMenuProps()}>
					{isOpen && getFilteredOptions().length > 0
						? getFilteredOptions().map((item, index) => (
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

import { useState } from 'react'
import { Tag } from './'
import { useCombobox, useMultipleSelection } from 'downshift'

export const MultiSelect = () => {
	const items: string[] = ['test', 'again', 'me']
	const [inputValue, setInputValue] = useState<string>('')
	const { getSelectedItemProps, getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } = useMultipleSelection({
		initialSelectedItems: [],
	})

	const getFilteredItems = () =>
		items.filter(item => (selectedItems as string[]).indexOf(item) < 0 && item.toLowerCase().startsWith(inputValue.toLowerCase()))
	const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
		inputValue,
		defaultHighlightedIndex: 0, // after selection, highlight the first item.
		selectedItem: null,
		items: getFilteredItems(),
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
				case useCombobox.stateChangeTypes.InputBlur:
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
		<div>
			<label {...getLabelProps()}>Choose some elements:</label>
			<div>
				{selectedItems.map((selectedItem, index) => (
					<span key={`selected-item-${index}`} {...getSelectedItemProps({ selectedItem, index })}>
						{selectedItem}
						<span
							onClick={e => {
								e.stopPropagation()
								removeSelectedItem(selectedItem)
							}}
						>
							&#10005;
						</span>
					</span>
				))}
				<div {...getComboboxProps()}>
					<input {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))} />
					<button {...getToggleButtonProps()} aria-label={'toggle menu'}>
						&#8595;
					</button>
				</div>
			</div>
			<ul {...getMenuProps()}>
				{isOpen &&
					getFilteredItems().map((item, index) => (
						<li style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}} key={`${item}${index}`} {...getItemProps({ item, index })}>
							{item}
						</li>
					))}
			</ul>
		</div>
	)
}

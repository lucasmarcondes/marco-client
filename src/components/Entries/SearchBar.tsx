import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

type SearchBarProps = {
	className?: string
	onSearch: (key: any) => void
}

export const SearchBar = ({ className, onSearch }: SearchBarProps) => {
	const css = ['text-gray-400 relative block focus-within:text-gray-600', 'w-full', className]

	const handleSearchKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value)
	}

	return (
		<label htmlFor='search' className={css.join(' ')}>
			<FaSearch className='h-4 transform top-1/2 left-3 w-4 -translate-y-1/2 pointer-events-none absolute' />
			<input
				type='search'
				id='search'
				placeholder='Search...'
				className='w-full pl-9 dark:bg-gray-300 dark:text-black'
				onChange={handleSearchKeyChange}
			/>
		</label>
	)
}

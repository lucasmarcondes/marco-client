import { ChangeEvent } from 'react'

type SearchBarProps = {
	className?: string
	onSearch: (key: any) => void
}

export const SearchBar = ({ className, onSearch }: SearchBarProps) => {
	const css = ['w-full', className]

	const handleSearchKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value)
	}

	return <input type='text' onChange={handleSearchKeyChange} className={css.join(' ')} placeholder='Search...' />
}

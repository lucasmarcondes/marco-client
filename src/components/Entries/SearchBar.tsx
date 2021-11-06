type SearchBarProps = {
	className?: string
	onSearch: (key: any) => void
}

export const SearchBar = ({ className, onSearch }: SearchBarProps) => {
	const css = ['w-full', className]

	const handleSearchKeyChange = (e: any) => {
		onSearch(e.target.value)
	}

	return (
		<div className='flex'>
			<input type='text' onChange={handleSearchKeyChange} className={css.join(' ')} placeholder='Search...' />
		</div>
	)
}

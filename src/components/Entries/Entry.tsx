import { Tag } from '../default'
import { Entry as EntryType } from '../../types'

type EntryProps = {
	entry: EntryType
	index?: number
	searchedText?: string
}
export const Entry = ({ entry, index, searchedText }: EntryProps) => {
	const toggleEditMode = () => {
		alert('open edit mode!')
	}

	let title = <span>{entry.title}</span>
	let text = <span>{entry.text}</span>
	if (searchedText) {
		if (entry.title.toLowerCase().includes(searchedText.toLowerCase())) {
			title = getHighlightedText(entry.title, searchedText)
		}
		if (entry.text && entry.text.toLowerCase().includes(searchedText.toLowerCase())) {
			text = getHighlightedText(entry.text, searchedText)
		}
	}

	return (
		<div className='mx-auto px-8'>
			<div className='bg-white rounded-lg shadow-lg my-10 py-4 px-8 dark:bg-gray-500'>
				<div onDoubleClick={toggleEditMode}>
					<div className='flex'>
						<h2 className='font-semibold text-gray-800 text-3xl dark:text-white'>{title}</h2>

						<div className='ml-auto text-sm text-gray-500 dark:text-white'>{entry.createdDate}</div>
					</div>
					<p className='mt-2 text-gray-600 dark:text-white'>{text}</p>
				</div>
				<div className='flex flex-wrap mt-4 mb-4'>
					{entry.properties.map((val, idx) => {
						return <Tag key={idx} label={val.type} className='m-2 ml-0' property={val} />
					})}
				</div>
				<div className='flex mt-4 justify-end'></div>
			</div>
		</div>
	)
}

const getHighlightedText = (text: string, highlight: string) => {
	// Split on highlight term and include term into parts, ignore case
	const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
	console.log(parts)
	return (
		<span>
			{' '}
			{parts.map((part, i) => (
				<span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'bg-blue-200' : ''}>
					{part}
				</span>
			))}{' '}
		</span>
	)
}

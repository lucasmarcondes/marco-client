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

	return (
		<div className='mx-auto px-8'>
			<div className='bg-white rounded-md border-1 border-gray-300 my-8 py-4 px-8 dark:bg-gray-500'>
				<div onDoubleClick={toggleEditMode}>
					<div className='flex'>
						<h2 className='font-semibold text-gray-800 text-3xl dark:text-white'>{getHighlightedText(entry.title, searchedText)}</h2>

						<div className='ml-auto text-sm text-gray-500 dark:text-white'>{new Date(entry.lastModifiedDate).toLocaleString()}</div>
					</div>
					<p className='mt-2 text-gray-600 dark:text-white'>{getHighlightedText(entry.text, searchedText)}</p>
				</div>
				<div className='flex flex-wrap mt-4 mb-4'>
					{entry.properties.map((val, idx) => {
						return <Tag key={idx} label={val.description} className='m-2 ml-0' property={val} />
					})}
				</div>
				<div className='flex mt-4 justify-end'></div>
			</div>
		</div>
	)
}

const getHighlightedText = (text?: string, highlight?: string) => {
	// Split on highlight term and include term into parts, ignore case
	text = text && text.replaceAll(/( |<([^>]+)>)/gi, ' ')
	const parts = text && text.split(new RegExp(`(${highlight})`, 'gi'))
	// console.log(parts)
	return (
		<span className='line-clamp-3 '>
			{' '}
			{parts && highlight ? (
				parts.map((part, i) => (
					<span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'bg-blue-200' : ''}>
						{part}
					</span>
				))
			) : (
				<span className='line-clamp-3 '>{text}</span>
			)}{' '}
		</span>
	)
}

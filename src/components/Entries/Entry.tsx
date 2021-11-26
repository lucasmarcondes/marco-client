import { Tag } from '../common'
import { IEntry, IModalType } from '../../types'

interface IEntryProps {
	entry: IEntry
	searchedText?: string
	onClick: (type: IModalType, val: IEntry) => void
}
export const Entry = ({ entry, searchedText, onClick }: IEntryProps) => {
	return (
		<div className='mx-auto md:px-6' onClick={() => onClick('view', entry)}>
			<div className='bg-white rounded-md border-1 border-gray-300 my-8 py-4 px-8 dark:(bg-gray-800 border-0 text-light-300) '>
				{entry && (
					<>
						<div>
							<div className='flex'>
								<h2 className='font-semibold text-gray-800 text-3xl w-5/6 dark:text-white'>{getHighlightedText(entry.title, searchedText)}</h2>
								<div className='ml-auto text-sm text-right w-min text-gray-500 md:w-max dark:text-white'>
									{new Date(entry.lastModifiedDate).toLocaleString()}
								</div>
							</div>
							<p className='mt-2 text-gray-600 dark:text-white'>{getHighlightedText(entry.text, searchedText)}</p>
						</div>
						<div className='flex flex-wrap mt-4 mb-4'>
							{entry.properties.map((prop, idx) => {
								return <Tag key={idx} label={prop.description} className='m-2 ml-0' type={prop.type} />
							})}
						</div>
					</>
				)}
				{!entry && (
					<div className='bg-gradient-to-tr m-1 animate-pulse'>
						<div>
							<div className='flex'>
								<h2 className=' font-semibold bg-gray-200 h-30px mb-2 text-gray-800 text-3xl w-6/12 dark:(bg-gray-500) '></h2>
								<div className='ml-auto  bg-blue-200 h-20px text-sm opacity-50 text-gray-500 w-1/12'></div>
							</div>
							<p className='bg-gray-200 h-20px mt-2 text-gray-300 dark:(bg-gray-700)'></p>
							<p className='bg-gray-200 h-20px mt-2 text-gray-300 dark:(bg-gray-700)'></p>
							<p className='bg-gray-200 h-20px mt-2 text-gray-300 dark:(bg-gray-700)'></p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

const getHighlightedText = (text?: string, highlight?: string) => {
	// Split on highlight term and include term into parts, ignore case
	text = text && text.replaceAll(/( |<([^>]+)>)/gi, ' ')
	const parts = text && text.split(new RegExp(`(${highlight})`, 'gi'))
	return (
		<span className='line-clamp-3 '>
			{' '}
			{parts && highlight ? (
				parts.map((part, i) => (
					<span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'bg-blue-200 dark:bg-gray-500' : ''}>
						{part}
					</span>
				))
			) : (
				<span className='line-clamp-3 '>{text}</span>
			)}{' '}
		</span>
	)
}

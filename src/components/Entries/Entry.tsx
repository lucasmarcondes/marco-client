import { IEntry, IModalType } from '../../types'
import { Tag } from '../common'

interface IEntryProps {
	entry: IEntry
	searchedText?: string
	onClick: (type: IModalType, val: IEntry) => void
}
export const Entry = ({ entry, searchedText, onClick }: IEntryProps) => {
	return (
		<div className="mx-auto md:px-6" onClick={() => onClick('view', entry)}>
			<div className="my-8 rounded-md border border-gray-300 bg-white px-8 py-4 dark:border dark:bg-gray-800 dark:text-gray-300">
				{entry && (
					<>
						<div>
							<div className="flex">
								<h2 className="w-5/6 text-3xl font-semibold text-gray-800 dark:text-white">{getHighlightedText(entry.title, searchedText)}</h2>
								<div className="ml-auto w-min text-right text-sm text-gray-500 dark:text-white md:w-max">
									{new Date(entry.lastModifiedDate).toLocaleString()}
								</div>
							</div>
							<p className="mt-2 text-gray-600 dark:text-white">{getHighlightedText(entry.text, searchedText)}</p>
						</div>
						<div className="my-4 flex flex-wrap">
							{entry.properties.map((prop, idx) => {
								return <Tag key={idx} label={prop.description} className="m-2 ml-0" type={prop.type} />
							})}
						</div>
					</>
				)}
				{!entry && (
					<div className="m-1 animate-pulse bg-gradient-to-tr">
						<div>
							<div className="flex">
								<h2 className="mb-2 h-8 w-6/12 bg-gray-200 text-3xl font-semibold text-gray-800 dark:bg-gray-500"></h2>
								<div className="ml-auto  h-6 w-1/12 bg-blue-200 text-sm text-gray-500 opacity-50"></div>
							</div>
							<p className="mt-2 h-6 bg-gray-200 text-gray-300 dark:bg-gray-700"></p>
							<p className="mt-2 h-6 bg-gray-200 text-gray-300 dark:bg-gray-700"></p>
							<p className="mt-2 h-6 bg-gray-200 text-gray-300 dark:bg-gray-700"></p>
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
		<span className="line-clamp-3 ">
			{' '}
			{parts && highlight ? (
				parts.map((part, i) => (
					<span key={i} className={part.toLowerCase() === highlight.toLowerCase() ? 'bg-blue-200 dark:bg-gray-500' : ''}>
						{part}
					</span>
				))
			) : (
				<span className="line-clamp-3 ">{text}</span>
			)}{' '}
		</span>
	)
}

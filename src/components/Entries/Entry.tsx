import { Tag } from '../default'
import { Entry as EntryType } from '../../types'

export type EntryProps = {
	entry: EntryType
}

export const Entry = ({ entry }: EntryProps) => {
	const toggleEditMode = () => {
		alert('open edit mode!')
	}
	return (
		<div className='mx-auto px-8'>
			<div className='bg-white rounded-lg shadow-lg my-10 py-4 px-8 dark:bg-gray-500'>
				<div onDoubleClick={toggleEditMode}>
					<div className='flex'>
						<h2 className='font-semibold text-gray-800 text-3xl dark:text-white'>{entry.title}</h2>

						<div className='ml-auto text-sm text-gray-500 dark:text-white'>{entry.createdDate}</div>
					</div>
					<p className='mt-2 text-gray-600 dark:text-white'>{entry.text}</p>
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

import { Tag } from '../default'

type EntryProps = {
	entry: any
	index?: number
}
export const Entry = ({ entry, index }: EntryProps) => {
	if (!index) index = 0
	let properties = [{ type: 'checkbox' }, { type: 'text' }, { type: 'select' }, { type: 'number' }, {}]
	entry = {
		_id: index + 1,
		text: 'Random text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
		title: 'Entry - ' + (index + 1),
		createdDate: new Date().toLocaleDateString(),
		lastModifiedDate: new Date(),
		properties: properties,
	}
	const toggleEditMode = () => {
		alert('open edit mode!')
	}
	return (
		<div className='px-8 mx-auto '>
			<div className='py-4 px-8 bg-white shadow-lg rounded-lg my-10 dark:bg-gray-500'>
				<div onDoubleClick={toggleEditMode}>
					<div className='flex'>
						<h2 className='text-gray-800 text-3xl font-semibold dark:text-white'>{entry.title}</h2>

						<div className='ml-auto text-gray-500 text-sm dark:text-white'>{entry.createdDate}</div>
					</div>
					<p className='mt-2 text-gray-600 dark:text-white'>{entry.text}</p>
				</div>
				<div className='flex flex-wrap mb-4 mt-4'>
					{[...entry.properties].map((val, idx) => {
						return <Tag key={idx} label={`Property ${idx + 1}`} className='ml-0 m-2' property={val} />
					})}
				</div>
				<div className='flex justify-end mt-4'></div>
			</div>
		</div>
	)
}

import { Tag } from '../default'

type entryProps = {
	entry: any
	index: number
}
export const Entry = ({ entry, index }: entryProps) => {
	entry = {
		_id: index + 1,
		text: 'Random text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
		title: 'Entry - ' + (index + 1),
		createdDate: new Date().toLocaleDateString(),
		lastModifiedDate: new Date(),
		properties: new Array(index),
	}
	const toggleEditMode = () => {
		alert('open edit mode!')
	}
	return (
		<div className='px-8 mx-auto'>
			<div className='py-4 px-8 bg-white shadow-lg rounded-lg my-20'>
				<div onDoubleClick={toggleEditMode}>
					<div className='flex'>
						<h2 className='text-gray-800 text-3xl font-semibold'>{entry.title}</h2>

						<div className='ml-auto text-gray-500 text-sm'>{entry.createdDate}</div>
					</div>
					<p className='mt-2 text-gray-600'>{entry.text}</p>
				</div>
				<div className='flex flex-wrap mb-4 mt-4'>
					{[...entry.properties].map((val, idx) => {
						return <Tag key={idx} label={`Property ${idx + 1}`} className='ml-0 m-2' />
					})}
				</div>
				<div className='flex justify-end mt-4'></div>
			</div>
		</div>
	)
}

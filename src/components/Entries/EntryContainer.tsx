import { Property } from '.'
import { IProperty, IEntry } from '../../types'
import { useDispatch } from 'react-redux'
import { updateCurrentEntry } from '../../store/root'

export interface IEntryContainerProps {
	entry: IEntry
}

export const EntryContainer = ({ entry }: IEntryContainerProps) => {
	const dispatch = useDispatch()
	const updateProperty = (property: IProperty) => {
		const properties = entry?.properties?.map(o => (o._id === property._id ? property : o))
		dispatch(updateCurrentEntry({ properties }))
	}

	const updateText = (text: string) => {
		dispatch(updateCurrentEntry({ text }))
	}

	return (
		<div className='flex flex-col '>
			<div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
				{entry?.properties?.map(property => (
					<Property key={property._id} property={property} onChange={updateProperty} />
				))}
			</div>
			<textarea
				onInput={e => updateText((e.target as HTMLInputElement).value)}
				defaultValue={entry.text || ''}
				rows={15}
				className='border rounded-md border-gray-300 flex-1 mt-3 p-3 dark:( bg-gray-500 border-0 text-light-300) focus:outline-none focus:border-gray-300 focus:ring-0 '
			></textarea>
		</div>
	)
}

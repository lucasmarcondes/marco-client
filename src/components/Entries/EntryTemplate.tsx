import { MultiSelect } from '../default/MultiSelect'
export const EntryTemplate = () => {
	return (
		<div className='bg-white overflow-auto'>
			<div className='flex justify-between'>
				<input
					role='heading'
					v-if='showTitle'
					className='bg-transparent rounded-md p-1 pl-0 text-3xl w-5/6 md:text-4xl'
					v-model='entryTitle'
					placeholder='Title'
				/>
			</div>
			<div className='flex'>
				<div className='my-auto py-1 w-2/5 overflow-x-auto whitespace-nowrap sm:w-1/4'>Test</div>
				<div className='border border-transparent rounded-md flex px-2 w-3/5 sm:w-3/4 focus-within:border-gray-300 focus-within:shadow-lg focus-within:z-50'>
					<input className='bg-transparent h-full w-full' />
				</div>
			</div>
			<div className='flex'>
				<div className='my-auto py-1 w-2/5 overflow-x-auto whitespace-nowrap sm:w-1/4'>Test</div>
				<div className='border border-transparent rounded-md flex px-2 w-3/5 sm:w-3/4 focus-within:border-gray-300 focus-within:shadow-lg focus-within:z-50'>
					<MultiSelect />
				</div>
			</div>
		</div>
	)
}

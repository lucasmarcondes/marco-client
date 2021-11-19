import { useEffect } from 'react'
import { useGetTemplatesQuery } from '../store/api'
import { updateCurrentTemplate, setCurrentTemplate } from '../store/root'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Property } from '../components/entries'
import { AddPropertyTab, TemplateList } from '../components/templates'
import { BsArrowUpRight } from 'react-icons/bs'

export const Templates = () => {
	const { data: templates } = useGetTemplatesQuery()
	const currentTemplate = useSelector((state: RootState) => state.root.currentTemplate)
	const dispatch = useDispatch()

	const updateDescription = (description: string) => {
		dispatch(updateCurrentTemplate({ description }))
	}

	!currentTemplate && templates && dispatch(setCurrentTemplate(templates[0]))

	return currentTemplate && templates ? (
		<div className='flex h-full p-4 md:p-8'>
			<div className='border rounded-md py-2 pl-2 w-60'>
				<TemplateList templates={templates} currentTemplate={currentTemplate} />
			</div>
			<div className='flex flex-col flex-1 px-8'>
				{currentTemplate && (
					<>
						<input
							className='bg-transparent rounded-md mb-4 w-full p-1 pl-0 text-3xl md:text-4xl'
							value={currentTemplate.description as string}
							onChange={e => updateDescription((e.target as HTMLInputElement).value)}
						></input>
						{currentTemplate.properties && currentTemplate.properties.length > 0 ? (
							<div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
								{currentTemplate.properties.map(property => (
									<Property key={property._id} property={property} onChange={() => {}} />
								))}
							</div>
						) : (
							<div className='flex flex-1 justify-end'>
								<span className='mt-12 text-lg leading-5 align-middle'>
									This template has no Properties. <br />
									Add a property here
								</span>
								<BsArrowUpRight className='h-6 mt-8 ml-2 w-6' />
							</div>
						)}
					</>
				)}
			</div>
			<div className='border rounded-md p-2 w-90'>{currentTemplate && <AddPropertyTab template={currentTemplate} />}</div>
		</div>
	) : null
}

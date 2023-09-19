import { BsArrowUpRight } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { Property } from '../components/Entries'
import { AddPropertyTab, TemplateList } from '../components/templates'
import { useGetTemplatesQuery } from '../store/api'
import { setCurrentTemplate, updateCurrentTemplate } from '../store/root'
import { RootState } from '../store/store'

export const Templates = () => {
	const { data: templates } = useGetTemplatesQuery()
	const currentTemplate = useSelector((state: RootState) => state.root.currentTemplate)
	const dispatch = useDispatch()

	const updateDescription = (description: string) => {
		dispatch(updateCurrentTemplate({ description }))
	}

	!currentTemplate && templates && dispatch(setCurrentTemplate(templates[0]))

	return currentTemplate && templates ? (
		<div className="flex h-full p-4 md:p-8">
			<div className="w-60 rounded-md border py-2 pl-2">
				<TemplateList templates={templates} currentTemplate={currentTemplate} />
			</div>
			<div className="flex flex-1 flex-col px-8">
				{currentTemplate && (
					<>
						<input
							className="mb-4 w-full rounded-md bg-transparent p-1 pl-0 text-3xl md:text-4xl"
							value={currentTemplate.description as string}
							onChange={(e) => updateDescription((e.target as HTMLInputElement).value)}
						></input>
						{currentTemplate.properties && currentTemplate.properties.length > 0 ? (
							<div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
								{currentTemplate.properties.map((property) => (
									<Property key={property._id} property={property} onChange={() => {}} />
								))}
							</div>
						) : (
							<div className="flex flex-1 justify-end">
								<span className="mt-12 align-middle text-lg leading-5">
									This template has no Properties. <br />
									Add a property here
								</span>
								<BsArrowUpRight className="ml-2 mt-8 h-6 w-6" />
							</div>
						)}
					</>
				)}
			</div>
			<div className="w-96 rounded-md border p-2">{currentTemplate && <AddPropertyTab template={currentTemplate} />}</div>
		</div>
	) : null
}

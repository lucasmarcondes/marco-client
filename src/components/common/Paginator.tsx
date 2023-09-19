import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

interface IPaginatorProps {
	items: any[]
	pageSize: number
	currentPage: number
}
export const Paginator = ({ items, pageSize, currentPage }: IPaginatorProps) => {
	const lastPageIndex: number = currentPage * pageSize
	const firstPageIndex: number = lastPageIndex - pageSize
	const pages: number = Math.ceil(items.length / pageSize)
	const currentEntries = items.slice(firstPageIndex, lastPageIndex)

	const updateCurrentPage = (page: number) => {
		currentPage = page
	}

	return (
		<>
			{items && items?.length > pageSize && (
				<div className='flex justify-center'>
					<button
						onClick={() => updateCurrentPage(currentPage - 1)}
						disabled={currentPage == 1}
						className='bg-white rounded-l-md font-medium border-gray-300 border-1 shadow-sm text-base w-full py-2 px-4 text-gray-700 inline-flex justify-center sm:mt-0 sm:text-sm sm:w-auto hover:bg-gray-50 disabled:cursor-default disabled:bg-gray-200 disabled:opacity-90 disabled:hover:bg-gray-200'
					>
						<BsChevronLeft className='my-auto h-3 mr-2 w-3' />
						Previous
					</button>
					<div className='divide-x divide-gray-300 border-gray-300 border-t-1 border-b-1 '>
						{getPageList(pages, currentPage, 5).map((num: any, index: number) => {
							if (num == 0) {
								return (
									<button
										key={index}
										disabled={true}
										className='bg-white cursor-default font-medium shadow-sm text-base w-full py-2 px-4 text-gray-700 inline-flex justify-center sm:mt-0 sm:text-sm sm:w-auto'
									>
										...
									</button>
								)
							} else {
								return (
									<button
										onClick={() => updateCurrentPage(num)}
										key={index}
										className={
											currentPage == num
												? 'font-medium bg-blue-500 shadow-sm text-base text-white w-full py-2 px-4 inline-flex justify-center sm:text-sm sm:w-auto hover:bg-blue-600'
												: 'bg-white font-medium shadow-sm text-base w-full py-2 px-4 text-gray-700 inline-flex justify-center sm:mt-0 sm:text-sm sm:w-auto hover:bg-gray-50'
										}
									>
										{num}
									</button>
								)
							}
						})}
					</div>
					<button
						onClick={() => updateCurrentPage(currentPage + 1)}
						disabled={currentPage == pages}
						className='bg-white rounded-r-md font-medium border-gray-300 border-1 shadow-sm text-base w-full py-2 px-4 text-gray-700 inline-flex justify-center sm:mt-0 sm:text-sm sm:w-auto hover:bg-gray-50 disabled:cursor-default disabled:bg-gray-200 disabled:opacity-90 disabled:hover:bg-gray-200'
					>
						Next
						<BsChevronRight className='my-auto h-3 ml-2 w-3' />
					</button>
				</div>
			)}
		</>
	)
}

export const getPageList = (totalPages: number, page: number, maxLength: number) => {
	if (maxLength < 5) throw 'maxLength must be at least 5'

	function range(start: number, end: number) {
		return Array.from(Array(end - start + 1), (_, i) => i + start)
	}

	var sideWidth = maxLength < 9 ? 1 : 2
	var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
	var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1
	if (totalPages <= maxLength) {
		// no breaks in list
		return range(1, totalPages)
	}
	if (page <= maxLength - sideWidth - 1 - rightWidth) {
		// no break on left of page
		return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages))
	}
	if (page >= totalPages - sideWidth - 1 - rightWidth) {
		// no break on right of page
		return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages))
	}
	// Breaks on both sides
	return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages))
}

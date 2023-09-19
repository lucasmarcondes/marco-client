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
				<div className="flex justify-center">
					<button
						onClick={() => updateCurrentPage(currentPage - 1)}
						disabled={currentPage == 1}
						className="inline-flex w-full justify-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-default disabled:bg-gray-200 disabled:opacity-90 disabled:hover:bg-gray-200 sm:mt-0 sm:w-auto sm:text-sm"
					>
						<BsChevronLeft className="my-auto mr-2 h-3 w-3" />
						Previous
					</button>
					<div className="divide-x divide-gray-300 border-y border-gray-300 ">
						{getPageList(pages, currentPage, 5).map((num: any, index: number) => {
							if (num == 0) {
								return (
									<button
										key={index}
										disabled={true}
										className="inline-flex w-full cursor-default justify-center bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm sm:mt-0 sm:w-auto sm:text-sm"
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
												? 'inline-flex w-full justify-center bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 sm:w-auto sm:text-sm'
												: 'inline-flex w-full justify-center bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm'
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
						className="inline-flex w-full justify-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-default disabled:bg-gray-200 disabled:opacity-90 disabled:hover:bg-gray-200 sm:mt-0 sm:w-auto sm:text-sm"
					>
						Next
						<BsChevronRight className="my-auto ml-2 h-3 w-3" />
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

	const sideWidth = maxLength < 9 ? 1 : 2
	const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
	const rightWidth = (maxLength - sideWidth * 2 - 2) >> 1
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

export const NotFound = () => {
	return (
		<div className="flex h-full w-full justify-items-stretch">
			<div className="my-auto justify-self-center">
				<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Error 404</p>
				<h1 className="mb-4 text-left text-2xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl">
					Oops! The page you&apos;re looking for isn&apos;t here.
				</h1>
				<p className="mb-5 text-left text-base text-gray-800 md:text-xl">You might have the wrong address, or the page may have moved.</p>
				<a onClick={() => window.history.back()} className="mb-2 cursor-pointer text-blue-500 hover:underline sm:mb-0 sm:w-auto">
					Go back
				</a>
			</div>
		</div>
	)
}

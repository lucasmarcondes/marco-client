export const NotFound = () => {
	return (
		<div className='flex h-full w-full justify-items-stretch'>
			<div className='my-auto justify-self-center'>
				<p className='font-semibold text-xs mb-2 tracking-wide text-gray-500 uppercase'>Error 404</p>
				<h1 className='font-extrabold text-left mb-4 leading-tight tracking-tight text-2xl text-gray-900 md:text-4xl'>
					Oops! The page you're looking for isn't here.
				</h1>
				<p className='text-base text-left mb-5 text-gray-800 md:text-xl'>You might have the wrong address, or the page may have moved.</p>
				<a
					onClick={() => window.history.back()}
					className='cursor-pointer mb-2  text-blue-500 btn btn-lg btn-light sm:mb-0 sm:w-auto hover:underline'
				>
					Go back
				</a>
			</div>
		</div>
	)
}

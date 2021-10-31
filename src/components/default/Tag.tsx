import { BsX } from 'react-icons/bs'

type Props = {
	label: string
}

export const Tag = ({ label }: Props) => {
	return (
		<div className='flex rounded-lg m-1 bg-gray-200 p-1 pl-2 pr-3 text-sm'>
			<BsX className='my-auto h-5 w-5' />
			<span>{label}</span>
		</div>
	)
}

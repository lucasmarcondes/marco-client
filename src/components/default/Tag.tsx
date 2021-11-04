import { BsX } from 'react-icons/bs'

type Props = {
	label: string
	className?: string
}

export const Tag = ({ label, className }: Props) => {
	let css = 'flex rounded-lg bg-gray-200 p-1 pl-2 pr-3 text-sm ' + className
	return (
		<div className={css}>
			<BsX className=' cursor-pointer my-auto h-5 w-5' />
			<span>{label}</span>
		</div>
	)
}

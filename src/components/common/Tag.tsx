import { BsX, BsCheck, BsJournalText, BsCursor, BsHash } from 'react-icons/bs'

type TagProps = {
	label?: string
	className?: string
	type?: string
}

const getTagStyle = (type?: string) => getStyles(type).style
const getTagIcon = (type?: string) => getStyles(type).icon

const getStyles = (type?: string) => {
	let obj = {
		style: 'bg-gray-200',
		icon: <span className='pl-2'></span>,
	}
	switch (type) {
		case 'select': {
			obj.style = 'bg-red-400'
			obj.icon = <BsCursor className='my-auto h-4 mr-1 w-4' />
			break
		}
		case 'checkbox': {
			obj.style = 'bg-green-400'
			obj.icon = <BsCheck className='my-auto h-5 w-5' />
			break
		}
		case 'text': {
			obj.style = 'bg-blue-400'
			obj.icon = <BsJournalText className='my-auto h-4 mr-1 w-4' />
			break
		}
		case 'number': {
			obj.style = 'bg-purple-400'
			obj.icon = <BsHash className='my-auto h-5 w-5' />
			break
		}
		case 'checked': {
			obj.style = 'border-1 border-dark-100 dark:bg-light-800 border-'
			obj.icon = <BsCheck className='my-auto h-5 w-5' />
			break
		}
		case 'remove': {
			obj.icon = <BsX className='my-auto h-5 w-5' />
			break
		}
	}
	return obj
}

export const Tag = ({ label, className, type }: TagProps) => {
	let css = ['flex rounded-lg p-1 pl-2 pr-3 text-sm dark:text-dark-300', className]
	css.push(getTagStyle(type))
	return (
		<div className={css.join(' ')}>
			{getTagIcon(type)}
			<span>{label}</span>
		</div>
	)
}

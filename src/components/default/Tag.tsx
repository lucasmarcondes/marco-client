import { BsX, BsCheck, BsJournalText, BsCursor, BsHash } from 'react-icons/bs'

type TagProps = {
	label?: string
	className?: string
	property?: any
}

const getTagColor = (type?: string) => getStyles(type).background
const getTagIcon = (type?: string) => getStyles(type).icon

const getStyles = (type?: string) => {
	let obj = {
		background: 'bg-gray-200',
		icon: <BsX className='cursor-pointer my-auto h-5 w-5' />,
	}
	switch (type) {
		case 'select': {
			obj.background = 'bg-red-400'
			obj.icon = <BsCursor className='my-auto h-4 w-4 mr-1' />
			break
		}
		case 'checkbox': {
			obj.background = 'bg-green-400'
			obj.icon = <BsCheck className='my-auto h-5 w-5' />
			break
		}
		case 'text': {
			obj.background = 'bg-blue-400'
			obj.icon = <BsJournalText className='my-auto h-4 w-4 mr-1' />
			break
		}
		case 'number': {
			obj.background = 'bg-purple-400'
			obj.icon = <BsHash className='my-auto h-5 w-5' />
			break
		}
	}
	return obj
}

export const Tag = ({ label, className, property }: TagProps) => {
	let css = ['flex rounded-lg p-1 pl-2 pr-3 text-sm dark:( text-dark-300 ) ', className]
	let type = property ? property.type : null
	css.push(getTagColor(type))
	return (
		<div className={css.join(' ')}>
			{getTagIcon(type)}
			<span>{label}</span>
		</div>
	)
}

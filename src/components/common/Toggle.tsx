export interface IToggleProps {
	value: boolean
	label?: string
	name: string
	id: string
	onChange: (value: boolean) => void
}
export const Toggle = ({ value, onChange, label, id, name }: IToggleProps) => {
	return (
		<div className='flex items-center'>
			<label htmlFor={id} className='cursor-pointer relative '>
				<input type='checkbox' name={name} checked={value} onChange={e => onChange(e.target.checked)} id={id} className='sr-only' />
				<div className='rounded-full bg-gray-300 h-7.5 shadow-inner w-14'></div>
				{value && (
					<div className='bg-black rounded-full border-0 h-6 shadow top-0.75 left-7.25 animate-fadeIn w-6 animate-delay-1s absolute b-black'></div>
				)}
				{!value && (
					<div className='bg-white rounded-full border-0 h-6 shadow top-0.75 left-0.75 animate-fadeIn w-6 animate-delay-1s absolute b-black'></div>
				)}
			</label>
			<span className='font-medium ml-3 text-gray-700'>{label}</span>
		</div>
	)
}

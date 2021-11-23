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
				<div className='rounded-full bg-gray-400 h-4 shadow-inner w-9'></div>
				<div className='bg-white rounded-full border-2 h-5 shadow transition -top-0.5 -left-1 w-5 dot absolute b-black'></div>
			</label>
			<span className='font-medium ml-3 text-gray-700'>{label}</span>
		</div>
	)
}

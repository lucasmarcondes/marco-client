export interface IToggleProps {
	value: boolean
	label?: string
	name: string
	id: string
	onChange: () => void
}
export const Toggle = ({ value, onChange, label, id, name }: IToggleProps) => {
	return (
		<div>
			<div className='mr-2 w-9 relative inline-block align-middle select-none'>
				<input
					type='checkbox'
					name={name}
					checked={value}
					onChange={onChange}
					id={id}
					className='bg-white rounded-full cursor-pointer outline-none border-4 h-5 ease-in right-4 w-5 duration-200 toggle absolute block appearance-none hover:(checked:bg-gray-500) focus:(checked:bg-gray-500 outline-none) checked:bg-gray-500 checked:right-0 '
				/>
				<label htmlFor={id} className='rounded-full cursor-pointer bg-gray-300 h-5 block overflow-hidden'></label>
			</div>
			<span className='font-medium text-gray-400'>{label}</span>
		</div>
	)
}

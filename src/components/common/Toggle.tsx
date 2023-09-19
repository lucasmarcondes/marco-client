export interface IToggleProps {
	value: boolean
	label?: string
	name: string
	id: string
	onChange: (value: boolean) => void
}
export const Toggle = ({ value, onChange, label, id, name }: IToggleProps) => {
	return (
		<div className="flex items-center">
			<label htmlFor={id} className="relative cursor-pointer ">
				<input type="checkbox" name={name} checked={value} onChange={(e) => onChange(e.target.checked)} id={id} className="sr-only" />
				<div className="h-8 w-14 rounded-full bg-gray-300 shadow-inner"></div>
				{value && <div className="absolute left-7 top-1 h-6 w-6 rounded-full bg-black shadow"></div>}
				{!value && <div className="absolute left-1 top-1 h-6 w-6 rounded-full border-0 bg-white shadow"></div>}
			</label>
			<span className="ml-3 font-medium text-gray-700">{label}</span>
		</div>
	)
}

export interface User {
	_id: number
	firstName: string
	lastName: string
	email: string
	googleId?: string
	password?: string
	mobile?: string
	createdDate: Date
}

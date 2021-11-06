export interface LooseObject {
	[key: string]: any
}
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

export interface Entry {
	_id: number
	text?: string
	title: string
	createdDate: Date
	lastModifiedDate?: Date
	createdById: number
	templateId: number
	properties: Array<any>
}

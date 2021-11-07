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
	createdById: string
	templateId: number
	properties: Array<any>
}

export interface Template {
	_id: number
	description: String
	properties: Array<any>
	createdDate: Date
	createdById: string
	lastModifiedDate: Date
}

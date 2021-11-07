export interface LooseObject {
	[key: string]: any
}
export interface User {
	_id: string
	firstName: string
	lastName: string
	email: string
	googleId?: string
	password?: string
	mobile?: string
	createdDate: Date
}

export interface Entry {
	_id: string
	text?: string
	title: string
	createdDate: Date
	lastModifiedDate: Date
	createdById: number
	templateId: number
	properties: Array<any>
}

export interface Template {
	_id: string
	description: String
	properties: Array<any>
	createdDate: Date
	createdById: number
	lastModifiedDate: Date
}

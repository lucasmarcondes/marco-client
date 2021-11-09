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
	lastModifiedDate: Date
}

export interface Entry {
	_id: string
	text?: string
	title?: string
	createdDate: Date
	lastModifiedDate: Date
	createdById: string
	templateId: string
	properties: Property[]
}

export interface Template {
	_id: string
	description: String
	properties: Property[]
	createdDate: Date
	createdById: string
	lastModifiedDate: Date
}

export interface Property {
	_id: string
	type: 'text' | 'checkbox' | 'number' | 'select'
	subType?: string
	description: string
	default?: string | boolean | number | Array<string>
	multipleValues?: boolean
	showOnCard: boolean
	options?: Array<string>
	value?: string | boolean | number | Array<string>
}

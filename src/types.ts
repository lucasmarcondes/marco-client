export interface ILooseObject {
	[key: string]: any
}
export interface IUser {
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

export interface IEntry {
	_id: string
	text?: string
	title?: string
	createdDate: Date
	lastModifiedDate: Date
	createdById: string
	templateId: string
	properties: IProperty[]
}
export interface INewEntry {
	_id?: string
	text?: string
	title?: string
	createdDate?: Date
	lastModifiedDate?: Date
	createdById?: string
	templateId: string
	properties: IProperty[]
}

export interface ITemplate {
	_id: string
	description: String
	properties: IProperty[]
	createdDate: Date
	createdById: string
	lastModifiedDate: Date
}

export interface IProperty {
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

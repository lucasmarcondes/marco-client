export interface ILooseObject {
	[key: string]: any
}
export type IModalType = 'create' | 'edit' | 'view' | null

export interface INotificationType {
	title: string
	id?: string
	message?: string
	variant: 'success' | 'error' | 'info' | 'warning'
	timeout?: number
	dismissable?: boolean
}

export interface AppResponse {
	success: boolean
	status: number
	message: string
	data?: any
}

export interface IUser {
	_id: string
	firstName: string
	lastName: string
	email: string
	googleId?: string
	password?: string
	mobile?: string
	preferences: IUserPreferences
	createdDate: Date
	lastModifiedDate: Date
}

export interface IUserPreferences {
	darkMode: boolean
}

export interface IEntry {
	_id?: string
	text?: string
	title?: string
	createdDate?: Date
	lastModifiedDate?: Date
	createdById?: string
	templateId?: string
	properties?: IProperty[]
}

export interface ITemplate {
	_id?: string
	description?: String
	properties?: IProperty[]
	createdDate?: Date
	createdById?: string
	lastModifiedDate?: Date
}

export type PropertyType = 'text' | 'checkbox' | 'number' | 'select'
export interface IProperty {
	_id: string
	type: PropertyType
	subType?: string
	description: string
	default?: string | boolean | number | Array<string>
	multipleValues?: boolean
	showOnCard: boolean
	options?: Array<string>
	value?: string | boolean | number | Array<string>
}

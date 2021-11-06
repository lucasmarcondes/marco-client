import { Entry } from './types'

export const entries: Entry[] = [
	{
		_id: 1,
		text: 'Random text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
		title: 'Entry - 1',
		createdDate: new Date(),
		lastModifiedDate: new Date(),
		createdById: 123,
		templateId: 456,
		properties: [{ type: 'checkbox' }, { type: 'text' }, { type: 'select' }, { type: 'number' }, {}],
	},
	{
		_id: 2,
		text: 'Random text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
		title: 'Entry - 2',
		createdDate: new Date(),
		lastModifiedDate: new Date(),
		createdById: 123,
		templateId: 456,
		properties: [{ type: 'checkbox' }, { type: 'text' }, { type: 'select' }, { type: 'number' }, {}],
	},
	{
		_id: 3,
		text: 'Random text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
		title: 'Entry - 3',
		createdDate: new Date(),
		lastModifiedDate: new Date(),
		createdById: 123,
		templateId: 456,
		properties: [{ type: 'checkbox' }, { type: 'text' }, { type: 'select' }, { type: 'number' }, {}],
	},
]

import { useEffect, useState } from 'react'
import { useGetUserQuery, useUpdateUserMutation } from '../store/api'
import { pushNotification } from '../store/root'
import { useDispatch } from 'react-redux'
import { BsCircle, BsPerson, BsToggles } from 'react-icons/bs'
import { ColorPicker, Select, Toggle } from '../components/common'

export const Profile = () => {
	const { data: user } = useGetUserQuery()
	const [updateUser] = useUpdateUserMutation()

	const [errors, setErrors] = useState('')
	const editableFields = ['firstName', 'lastName', 'email']
	const fieldsToDisplay = ['firstName', 'lastName', 'email']

	const updatePreference = (key: string, value: any) => {
		console.log(value)
		if (!user) return
		if (typeof value == 'boolean') updateUser({ ...user, preferences: { ...user.preferences, [key]: !value } })
		else updateUser({ ...user, preferences: { ...user.preferences, [key]: value } })
	}
	const userColor = user?.preferences.accentColor ? user.preferences.accentColor : '#BFDBFF'
	const dispatch = useDispatch()
	return (
		<div className='bg-white h-full dark:(bg-gray-500 text-light-200) '>
			{user && (
				<div className=' mx-auto p-5'>
					<div className='rounded-sm no-wrap md:divide-x md:flex md:-mx-2'>
						<div className='mx-2 w-full md:w-3/12'>
							<div className=' border-t-4  p-2' style={{ borderColor: userColor }}>
								<h1 className='font-bold my-1 text-xl leading-8'>
									{user.firstName} {user.lastName}
								</h1>
								<h3 className='flex text-gray-500 items-center'>
									<span>Member since</span>
									<span className=' ml-auto text-sm '>{user.createdDate ? new Date(user.createdDate).toDateString() : ''}</span>
								</h3>
							</div>
							<div className='my-4'></div>
						</div>
						<div className='divide-y mx-2 w-full px-4 md:w-9/12'>
							<div className=' p-2'>
								<div className='flex font-semibold space-x-2 leading-8 items-center'>
									<span style={{ color: userColor }}>
										<BsPerson className='h-5 w-5' />
									</span>
									<span className='tracking-wide'>About</span>
								</div>
								<div className='text-sm grid md:grid-cols-2'>
									{user &&
										Object.entries({ ...user }).map(([key, value]) => {
											if (fieldsToDisplay.includes(key))
												return (
													<div key={key} className='grid grid-cols-2'>
														<div className='font-semibold p-2'>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
														<div className='p-2'>{value}</div>
													</div>
												)
										})}
								</div>
							</div>
							<div className=' p-2'>
								<div className='flex font-semibold space-x-2 leading-8 items-center'>
									<span style={{ color: userColor }}>
										<BsToggles className='h-5 w-5' />
									</span>
									<span className='tracking-wide'>Preferences</span>
								</div>
								<div className=' '>
									<div className='text-sm grid md:grid-cols-2'>
										{user &&
											Object.entries(user.preferences).map(([key, value]) => {
												return (
													<div key={key} className='grid grid-cols-2'>
														<div className='font-semibold p-2'>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
														{key.includes('Color') && (
															<>
																<div className='p-2'>
																	<ColorPicker id={key} title='Pick a color' value={value} onChange={val => updatePreference(key, val)} />
																</div>
															</>
														)}
														{typeof value == 'boolean' && (
															<>
																<div className='p-2'>
																	<Toggle id={key} name='preferences' value={value} onChange={() => updatePreference(key, value)} />
																</div>
															</>
														)}
													</div>
												)
											})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

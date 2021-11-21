import { useState } from 'react'
import { useGetUserQuery } from '../store/api'
import { pushNotification } from '../store/root'
import { useDispatch } from 'react-redux'

export const Profile = () => {
	const { data: user } = useGetUserQuery()
	const [errors, setErrors] = useState('')
	const [userInfo, setUserInfo] = useState(user)
	const dispatch = useDispatch()
	return <div className='p-4 md:p-8'>Profile</div>
}

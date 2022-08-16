import { useSelector } from 'react-redux'
import '../styles/profile.css'

function Profile() {
	const { userInfo } = useSelector((state) => state.user)

	return (
		<div>
			<figure>{userInfo?.name}</figure>
			<span>
				Welcome <strong>{userInfo?.name}!</strong>
			</span>
		</div>
	)
}
export default Profile

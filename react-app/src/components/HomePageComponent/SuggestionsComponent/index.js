import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllUsers } from "../../../store/users"
import { useHistory } from "react-router-dom"

const SuggestionsComponent = ({ i2 }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const allUsers = Object.values(useSelector(state => state.users))

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllUsers())
        }
    }, [dispatch, sessionUser])

    const ProfileImageTagLarge = () => {
        if (sessionUser?.profile_image) {
            return (
                <div className="profile-button-large" onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${sessionUser?.id}`)
                }}>
                    <img style={{ width: '4em', height: '4em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={sessionUser?.profile_image} alt='preview'></img>
                </div>
            )
        } else {
            return (
                <div style={{ marginTop: '-.1em' }} onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${sessionUser?.id}`)
                }} className='fa-regular fa-user-circle fa-xl'></div>
            )
        }
    }

    const ProfileImageTagSmall = (i) => {
        if (allUsers[i]?.profile_image) {
            return (
                <div className="profile-button-large" onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${allUsers[i]?.id}`)
                }}>
                    <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={allUsers[i]?.profile_image} alt='preview'></img>
                </div>
            )
        } else {
            return (
                <div style={{ marginTop: '-.1em' }} onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${allUsers[i]?.id}`)
                }} className='fa-regular fa-user-circle fa-xl'></div>
            )
        }
    }

    return (
        <div className="suggestions-container">
            <div className="suggestions-username-container">
                {ProfileImageTagLarge()}
                <div className="suggestions-username-name">
                    <a className="suggestions-username1" href={`/users/${sessionUser?.id}`}>{sessionUser?.username}</a>
                    <span className="username-styling2">{sessionUser?.first_name}</span>
                </div>
            </div>
            <p className="suggestions-for-u">Suggestions For You</p>
            <div className="suggestions-users-containers">
                {i2?.map((i, index) => {
                    return (
                        <div key={index} className="suggestions-user-card">
                            {ProfileImageTagSmall(i)}
                            <div className="suggestions-username-name">
                                <a className="suggestions-username" href={`/users/${allUsers[i]?.id}`}>{allUsers[i]?.username}</a>
                                <span className="username-styling2" style={{ fontSize: '14px' }}>Popular</span>
                            </div>
                            <div className="user-card-follow-btn">
                            </div>
                        </div>
                    )
                })}
                <div style={{ marginLeft: '.8em' }}>
                    <p className="copyright">© 2022 INSTAPIX FROM FELIPE SALLY JAN KEVIN HUYDU</p>
                </div>
            </div>
        </div>
    )
}

export default SuggestionsComponent

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from '../../store/session'
import * as userActions from '../../store/users'
import * as followingActions from '../../store/follow'
import './HomePageComponent.css'
import PostCardButtons from "./PostCardModal/PostCardButtons"
import PostCardModal from "./PostCardModal"

const uniqueIndex = () => {
    const indexes = []
    while (indexes.length !== 5) {
        const randomIndex = Math.floor(Math.random() * 6)
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex)
        }
    }
    return indexes
}
let i;
let i2;


const HomePageComponent = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [style, setStyle] = useState({})
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const allUsers = Object.values(useSelector(state => state.users))
    let following = useSelector(state => state.follow)
    let following2 = following?.follows
    console.log(following2)


    useEffect(() => {
        i = uniqueIndex()
        i2 = uniqueIndex()
    }, [])

    useEffect(() => {
        if (email && password) {
            setStyle({ backgroundColor: 'rgb(42, 126, 187' })
        }
    }, [email, password])

    useEffect(() => {
        dispatch(userActions.getAllUsers())
        dispatch(followingActions.getFollowingBackend(sessionUser?.id))
    }, [dispatch])

    const reset = () => {
        setEmail("")
        setPassword('')
        setStyle({})
    }

    const ProfileImageTagLarge = () => {
        if (sessionUser?.profile_image) {
            return (
                <button className="profile-button-large" onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${sessionUser?.id}`)
                }}>
                    <img style={{ width: '4em', height: '4em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={sessionUser?.profile_image} alt='preview'></img>
                </button>
            )
        } else {
            return (
                <button style={{ marginTop: '-.1em' }} onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${sessionUser?.id}`)
                }} className='fa-regular fa-user-circle fa-xl'></button>
            )
        }
    }

    const ProfileImageTagSmall = (users, i) => {
        if (users[i]?.profile_image) {
            return (
                <button className="profile-button-large" onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${users[i]?.id}`)
                }}>
                    <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={users[i]?.profile_image} alt='preview'></img>
                </button>
            )
        } else {
            return (
                <button style={{ marginTop: '-.1em' }} onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${users[i]?.id}`)
                }} className='fa-regular fa-user-circle fa-xl'></button>
            )
        }
    }

    const ProfileImageTagSmallCard = (follow) => {
        if (follow?.follower_info?.profile_image) {
            return (
                <button className="profile-button-large-2" onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${follow?.follower_info.id}`)
                }}>
                    <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={follow?.follower_info?.profile_image} alt='preview'></img>
                </button>
            )
        } else {
            return (
                <button style={{ marginTop: '-.1em' }} onClick={e => {
                    e.preventDefault()
                    history.push(`/users/${follow?.follower_info?.id}`)
                }} className='fa-regular fa-user-circle fa-xl'></button>
            )
        }
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password))
            .then(() => {
                reset()
            })
            .catch(async res => {
                const data = await res.json()
                if (data && data.errors) {
                    setErrors(Object.values(data.errors))
                }
            })
    };

    const handleGuestLogin = async e => {
        e.preventDefault()
        const data = await dispatch(login('demo@aa.io', 'password'))
            .then(() => {
                reset()
            })
            .catch(async res => {
                const data = await res.json()
                if (data && data.errors) {
                    setErrors(Object.values(data.errors))
                }
            })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password))
            .then(() => {
                reset()
            })
            .catch(async res => {
                const data = await res.json()
                if (data && data.errors) {
                    setErrors(Object.values(data.errors))
                }
            })
    };


    if (sessionUser) {
        return (
            <div className='home-page-container'>
                <div className="home-content-container">
                    <div className="users-container">
                        <div className="users-section">
                            <div className="trending">
                                <p>Trending 🔥🔥🔥</p>
                            </div>
                            <div className="user-pics-container">
                                {i?.map(i => (
                                    <div className="user-pics">
                                        <button onClick={e => {
                                            e.preventDefault()
                                            history.push(`/users/${allUsers[i]?.id}`)
                                        }}>
                                            <img className="users-img-circle-container" src={allUsers[i]?.profile_image}>
                                            </img>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="user-pics-container">
                                {i?.map(i => (
                                    <div className="username">
                                        <a href={`/users/${allUsers[i]?.id}`}>{allUsers[i]?.username}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="feed-section">
                            {following2 && (Object.values(following2)?.map(follow => (
                                <div className="feed-post-container">
                                    <div className="feed-username-container">
                                        {ProfileImageTagSmallCard(follow)}
                                        <p>{follow?.follower_info.username}</p>
                                        <div>
                                            <PostCardModal follower={follow} />
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            )))}
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                        </div>
                    </div>
                    <div className="suggestions-container">
                        <div className="suggestions-username-container">
                            {ProfileImageTagLarge()}
                            <div className="suggestions-username-name">
                                <a className="suggestions-username" href={`/users/${sessionUser?.id}`}>{sessionUser?.username}</a>
                                <span>{sessionUser.first_name}</span>
                            </div>
                        </div>
                        <p className="suggestions-for-u">Suggestions For You</p>
                        <div className="suggestions-users-containers">
                            {i2?.map(i => (
                                <div className="suggestions-user-card">
                                    {ProfileImageTagSmall(allUsers, i)}
                                    <div className="suggestions-username-name">
                                        <a className="suggestions-username" href={`/users/${allUsers[i]?.id}`}>{allUsers[i]?.username}</a>
                                        <span style={{ fontSize: '14px' }}>Popular</span>
                                    </div>
                                    <div className="user-card-follow-btn">
                                        <button>Follow</button>
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginLeft: '.8em' }}>
                                <p className="copyright">© 2022 INSTAPIX FROM FELIPE SALLY JAN KEVIN HUYDU</p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    } else {
        return (
            <div className="logged-out-container">
                <div className="logged-out-content-container">
                    <img className="front-page-image" src='https://instagram-clone-files.s3.us-west-1.amazonaws.com/frontpage.png' alt='preview'></img>
                    <div className="login-form-container">
                        <div className="login-form">
                            <h1>Instapix</h1>
                            <div className="login-input-container">
                                <div className="login-box">
                                    <div className='email'>
                                        <p>Email</p>
                                    </div>
                                    <div className="password">
                                        <input
                                            type='text'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="login-input-container">
                                <div className="login-box">
                                    <div className='email'>
                                        <p>Password</p>
                                    </div>
                                    <div className="password">
                                        <input
                                            type='password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="login-input-container">
                                <button
                                    type='submit'
                                    onSubmit={onSubmit}
                                    style={style}
                                    onClick={onLogin}
                                    className="login-button"
                                >Log In</button>
                            </div>
                            <div className="or-container">
                                <p className="or1">______________</p>
                                <p className='or'>OR</p>
                                <p className="or2">______________</p>
                            </div>
                            <div className="login-input-container">
                                <button
                                    type='submit'
                                    style={style}
                                    onClick={handleGuestLogin}
                                    className="login-button-guest"
                                >Log in as Guest</button>
                            </div>
                        </div>
                        <div className="sign-up-link">
                            {/* sign up modal goes here */}
                            <p>Don't have an account?
                                <a href="/sign-up"> Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default HomePageComponent

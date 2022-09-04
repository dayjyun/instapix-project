import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from '../../store/session'
import './HomePageComponent.css'


const HomePageComponent = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [style, setStyle] = useState({})
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session.user)

    const reset = () => {
        setEmail("")
        setPassword('')
        setStyle({})
    }

    useEffect(() => {
        if (email && password) {
            setStyle({ backgroundColor: 'rgb(42, 126, 187' })
        }
    }, [email, password])

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
                            <h1>USERS GO HERE</h1>
                        </div>
                        <div className="feed-section">
                            <h1>FEED GOES HERE</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                            <h1>add as much as needed</h1>
                        </div>
                    </div>
                    <div className="suggestions-container">
                        <h1>SUGGESTIONS GOES HERE</h1>
                    </div>
                </div>
            </div>
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

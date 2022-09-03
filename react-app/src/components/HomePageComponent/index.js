import { useState, useDispatch, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import './HomePageComponent.css'


const HomePageComponent = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        if (email && password) {
            setToggle(false)
        }
    }, [email, password])

    if (sessionUser) {
        return (
            <h1>Logged in home page component</h1>
        )
    } else {
        return (
            <div className="logged-out-container">
                <div className="logged-out-content-container">
                    <h1>hey</h1>
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
                                <button disabled={toggle} className="login-button">Log In</button>
                            </div>
                        </div>
                        <div className="sign-up-link">
                            {/* sign up modal goes here */}
                            <h1>bottom</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePageComponent

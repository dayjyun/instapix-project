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

    useEffect(() => {
        if (email && password) {
            setStyle({ backgroundColor: 'rgb(42, 126, 187' })
        }
    }, [email, password])

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
            setEmail('')
            setPassword('')
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
            setEmail('')
            setPassword('')
        }
    };



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
                                <button
                                    type='submit'
                                    onSubmit={onSubmit}
                                    style={style}
                                    onClick={onLogin}
                                    className="login-button"
                                >Log In</button>
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
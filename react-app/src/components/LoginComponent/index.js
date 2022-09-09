import { useState, useEffect } from "react"
// import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import "../HomePageComponent/HomePageComponent.css";


const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [style, setStyle] = useState({})
    const [errors, setErrors] = useState([])
    console.log(errors)

    useEffect(() => {
        if (email && password) {
            setStyle({ backgroundColor: "rgb(0,149,246)" });
        }
    }, [email, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password))
        console.log(data)

        if (data && data.errors) {
            setErrors(Object.values(data.errors));
        }

        console.log(errors)
        // .catch(async (res) => {
        //     const data = await res.json()

        //     console.log(data)
        // })

        // console.log(data)
        // await dispatch(login(email, password))
        //     .catch(async (res) => {
        //         console.log(res)
        //         const data = await res.json();
        //         console.log('gets here')

        //         console.log(data)
        //         setErrors(Object.values(data.errors));

        //     });
    };


    const reset = () => {
        setEmail("");
        setPassword("");
        setStyle({});
    };

    const handleGuestLogin = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"))
            .then(() => {
                reset();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(Object.values(data.errors));
                }
            });
    };


    return (
        <div className="logged-out-container">
            <div className="logged-out-content-container">
                <img
                    className="front-page-image"
                    src="https://instagram-clone-files.s3.us-west-1.amazonaws.com/frontpage.png"
                    alt="preview"
                ></img>
                <div className="login-form-container">

                    <div className="login-form">
                        <h1>Instapix</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="login-form-box">
                                <div className="password">
                                    <input
                                        type='text'
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required />
                                </div>
                                <div className="password">
                                    <input
                                        type='password'
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required />
                                </div>

                                <button className="login-button" type='submit' style={style}>Log In</button>
                                {errors && (
                                    errors.map((error, i) => {
                                        return (
                                            <p key={i} className="validation-error-styling">{error}</p>
                                        )
                                    })
                                )
                                }
                                <div className="or-container">
                                    <p className="or1">______________</p>
                                    <p className="or">OR</p>
                                    <p className="or2">______________</p>
                                </div>

                                {/* <div className="login-input-container"> */}
                                <button
                                    type="submit"
                                    style={style}
                                    onClick={handleGuestLogin}
                                    className="login-button-guest"
                                >
                                    Log in as Guest
                                </button>
                            </div>
                        </form>

                        {/* </div> */}
                    </div>
                    <div className="sign-up-link">
                        {/* sign up modal goes here */}
                        <p>
                            Don't have an account?
                            <a href="/sign-up"> Sign up</a>
                        </p>
                    </div>
                </div>
            </div >
        </div >


    )
}
export default Login;

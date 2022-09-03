import { useState, useDispatch } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"


const HomePageComponent = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <h1>Logged in home page component</h1>
        )
    } else {
        return (
            <h1>Sign in home page component</h1>
        )
    }
}

export default HomePageComponent

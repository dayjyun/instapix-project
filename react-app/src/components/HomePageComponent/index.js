import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as userActions from '../../store/users'
import './HomePageComponent.css'
import Login from "../LoginComponent"
import SuggestionsComponent from "./SuggestionsComponent"
import TrendingUsers from "./TrendingUsersComponent"
import FeedPostsComponent from "./FeedPostsSection"

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
  const sessionUser = useSelector(state => state.session.user)
  const allUsers = Object.values(useSelector(state => state.users))

  useEffect(() => {
    i = uniqueIndex()
    i2 = uniqueIndex()
  }, [])

  useEffect(() => {
    if (sessionUser) {
      dispatch(userActions.getAllUsers())
    }
  }, [dispatch, sessionUser])

  if (sessionUser) {
    return (
      <div className='home-page-container'>
        <div className="home-content-container">
          <div className="users-container">
            <TrendingUsers i={i} />
            <FeedPostsComponent />
          </div>
          <SuggestionsComponent i2={i2} a={allUsers} />
        </div >
      </div >
    )
  } else {
    return (
      <Login />
    )
  }
}

export default HomePageComponent

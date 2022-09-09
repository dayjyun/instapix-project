import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as userActions from '../../store/users'
import * as followingActions from '../../store/follow'
import './HomePageComponent.css'
import { getFollowingPosts } from "../../store/posts"
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
      // dispatch(getFollowingPosts())
      // dispatch(followingActions.getLoggedUserFollowingBackend(sessionUser.id))
      // dispatch(followingActions.getFollowingBackendHome(sessionUser.id))
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
          <SuggestionsComponent i2={i2} />
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


  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password))
  //     .then(() => {
  //       reset()
  //     })
  //     .catch(async res => {
  //       const data = await res.json()
  //       if (data && data.errors) {
  //         setErrors(Object.values(data.errors))
  //       }
  //     })
  // };

  // const handleGuestLogin = async e => {
  //   e.preventDefault()
  //   const data = await dispatch(login('demo@aa.io', 'password'))
  //     .then(() => {
  //       reset()
  //     })
  //     .catch(async res => {
  //       const data = await res.json()
  //       if (data && data.errors) {
  //         setErrors(Object.values(data.errors))
  //       }
  //     })
  // }

  // const fetchLikeForPost = postId => {
  //   dispatch(likeActions.fetchLike(postId))
  // }

  // const likeBtnOnSubmit = (e) => {
  //   e.preventDefault()
  //   if (likeClass === 'fa-regular fa-heart fa-xl') {
  //     setLikeClass('fa-solid fa-heart fa-xl')
  //   } else {
  //     setLikeClass('fa-regular fa-heart fa-xl')
  //   }
  // }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password))
  //     .then(() => {
  //       reset()
  //     })
  //     .catch(async res => {
  //       const data = await res.json()
  //       if (data && data.errors) {
  //         setErrors(Object.values(data.errors))
  //       }
  //     })
  // };

  // const likePost = async (post, user, likesUserIds) => {
  //   if (likesUserIds?.includes(user?.id)) {
  //     await dispatch(likeActions.unlike(post?.id))

  //   } else {
  //     await dispatch(likeActions.like(post?.id))
  //   }
  // };
  //

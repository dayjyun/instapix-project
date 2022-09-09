import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import * as userActions from '../../store/users'
import * as followingActions from '../../store/follow'
import './HomePageComponent.css'
// import PostCardButtons from "./PostCardModal/PostCardButtons"
import PostCardModal from "./PostCardModal"
// import * as postActions from '../../store/posts'
import { getFollowingPosts } from "../../store/posts"
import LikeComponent from "./LikeComponent"
import TotalLikesComponent from "./LikeComponent/TotalLikesComponent"
import { getCreatedDate } from "../CommentComponents/PostsComments"
import { FeedPostModalCommentBtn, FeedPostModalViewStr } from "./FeedPostModal"
import Login from "../LoginComponent"
import SuggestionsComponent from "./SuggestionsComponent"

// import LikeCommentComponent from "../LikeCommentComponent"

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
//
// const [currPostState, setCurrPostState] = useState(posts);

const HomePageComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [style, setStyle] = useState({})
  const [nonFollowers, setNonFollowers] = useState([])

  const sessionUser = useSelector(state => state.session.user)
  const allUsers = Object.values(useSelector(state => state.users))
  const posts = Object.values(useSelector(state => state.posts))
  // let following = useSelector(state => state.follow)
  // following && console.log(Object.values(following))
  // let following2 = following?.follows
  // following && console.log(following)
  // following && (following = Object.values(following)?.map(following => following?.follower_info?.id))
  // let usersNotFollowing;
  // useEffect(() => {
  //   if (allUsers && following && nonFollowers.length === 0) {
  //     console.log("users", allUsers, "FOLLOWING", following)
  //     usersNotFollowing = allUsers.filter(user => !following?.includes(user.id))
  //     setNonFollowers(usersNotFollowing)
  //   }
  // }, [allUsers, following])
  // console.log(nonFollowers)

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
    if (sessionUser) {
      dispatch(userActions.getAllUsers())
      dispatch(getFollowingPosts())
      dispatch(followingActions.getLoggedUserFollowingBackend(sessionUser.id))
      dispatch(followingActions.getFollowingBackendHome(sessionUser.id))
    }
  }, [dispatch, sessionUser])

  const reset = () => {
    setEmail("")
    setPassword('')
    setStyle({})
  }


  // const ProfileImageTagLarge = () => {
  //   if (sessionUser?.profile_image) {
  //     return (
  //       <div className="profile-button-large" onClick={e => {
  //         e.preventDefault()
  //         history.push(`/users/${sessionUser?.id}`)
  //       }}>
  //         <img style={{ width: '4em', height: '4em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={sessionUser?.profile_image} alt='preview'></img>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div style={{ marginTop: '-.1em' }} onClick={e => {
  //         e.preventDefault()
  //         history.push(`/users/${sessionUser?.id}`)
  //       }} className='fa-regular fa-user-circle fa-xl'></div>
  //     )
  //   }
  // }

  // const ProfileImageTagSmall = (user) => {
  //   if (user?.profile_image) {
  //     return (
  //       <div className="profile-button-large" onClick={e => {
  //         e.preventDefault()
  //         history.push(`/users/${user?.id}`)
  //       }}>
  //         <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={user?.profile_image} alt='preview'></img>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div style={{ marginTop: '-.1em' }} onClick={e => {
  //         e.preventDefault()
  //         history.push(`/users/${user?.id}`)
  //       }} className='fa-regular fa-user-circle fa-xl'></div>
  //     )
  //   }
  // }

  const ProfileImageTagSmallCard = (post) => {
    if (post?.User?.profile_image) {
      return (
        <div className="profile-button-large-2" onClick={e => {
          e.preventDefault()
          history.push(`/users/${post?.User?.id}`)
        }}>
          <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={post?.User?.profile_image} alt='preview'></img>
        </div>
      )
    } else {
      return (
        <div style={{ marginTop: '-.1em' }} onClick={e => {
          e.preventDefault()
          history.push(`/users/${post?.User?.id}`)
        }} className='fa-regular fa-user-circle fa-xl'></div>
      )
    }
  }

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
                  <div key={i} className="user-pics">
                    <button onClick={
                      e => {
                        e.preventDefault()
                        history.push(`/users/${allUsers[i]?.id}`)
                      }
                    }>
                      <img className="users-img-circle-container" src={allUsers[i]?.profile_image}>
                      </img>
                    </button>
                  </div>
                ))}
              </div>
              <div className="user-pics-container">
                {i?.map(i => (
                  <div key={i} className="username">
                    <a href={`/users/${allUsers[i]?.id}`}>{allUsers[i]?.username}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="feed-section">
              {posts && (Object.values(posts)?.map(post => {
                // const randomPost = posts[Math.floor(Math.random() * posts?.length)]
                return (
                  <div key={post?.id} className="feed-post-container">
                    <div className="feed-username-container">
                      {ProfileImageTagSmallCard(post)}
                      <a href={`/users/${post?.User?.id}`}>{post?.User?.username}</a>
                      <div>
                        <PostCardModal
                          post={post} randomPost={post} />
                      </div>
                    </div>
                    <div className="feed-post-image">
                      <img className="feed-image" src={post?.post_url} alt="Post has no image"></img>
                    </div>
                    <div className="feed-like-container">
                      <LikeComponent post={post} /> <FeedPostModalCommentBtn post={post} />
                    </div>
                    <TotalLikesComponent post={post} />
                    <span className='feed-caption'>{post?.User?.username}
                      <span style={{ fontWeight: '400' }}> {post?.caption}</span>
                    </span>
                    <div className="load-comments-button"><FeedPostModalViewStr post={post} /></div>
                    <div className="feed-post-date">{getCreatedDate(post?.created_at)}</div>
                  </div>
                )
              }))}
              <h1>add as much as needed</h1>
              <h1>add as much as needed</h1>
              <h1>add as much as needed</h1>
              <h1>add as much as needed</h1>
              <h1>add as much as needed</h1>
            </div>
          </div>
          <SuggestionsComponent />
          {/* <div className="suggestions-container">
            <div className="suggestions-username-container">
              {ProfileImageTagLarge()}
              <div className="suggestions-username-name">
                <a className="suggestions-username" href={`/users/${sessionUser?.id}`}>{sessionUser?.username}</a>
                <span>{sessionUser.first_name}</span>
              </div>
            </div>
            <p className="suggestions-for-u">Suggestions For You</p>
            <div className="suggestions-users-containers">
              {nonFollowers.length > 0 && nonFollowers.map(user => {
                // let followText = 'Follow'
                return (
                  <div key={i} className="suggestions-user-card">
                    {ProfileImageTagSmall(user)}
                    <div className="suggestions-username-name">
                      <a className="suggestions-username" href={`/users/${user?.id}`}>{user?.username}</a>
                      <span style={{ fontSize: '14px' }}>Popular</span>
                    </div>
                    <div className="user-card-follow-btn">
                      <span>Follow</span>
                    </div>
                  </div>
                )
              })}
              <div style={{ marginLeft: '.8em' }}>
                <p className="copyright">© 2022 INSTAPIX FROM FELIPE SALLY JAN KEVIN HUYDU</p>
              </div>
            </div>
          </div> */}
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

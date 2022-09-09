import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from '../../store/session'
import * as userActions from '../../store/users'
import * as followingActions from '../../store/follow'
import './HomePageComponent.css'
// import PostCardButtons from "./PostCardModal/PostCardButtons"
import PostCardModal from "./PostCardModal"
// import * as postActions from '../../store/posts'
import * as likeActions from '../../store/likes'
import testingtesting from "./testing"
import { getFollowingPosts } from "../../store/posts"
import LikeComponent from "./LikeComponent"
import TotalLikesComponent from "./LikeComponent/TotalLikesComponent"
import { getCreatedDate } from "../CommentComponents/PostsComments"
import {FeedPostModalCommentBtn, FeedPostModalViewStr} from "./FeedPostModal"

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


const HomePageComponent = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [style, setStyle] = useState({})
  const [errors, setErrors] = useState([])
  const [likeClass, setLikeClass] = useState('fa-regular fa-heart fa-xl')
  const [followText, setFollowText] = useState('Follow')
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const allUsers = Object.values(useSelector(state => state.users))
  const posts = Object.values(useSelector(state => state.posts))
  const [currPostState, setCurrPostState] = useState(posts);
  const likes = Object.values(useSelector(state => state.likes))
  let following = useSelector(state => state.follow)
  // following && console.log(Object.values(following))
  // let following2 = following?.follows
  following && (following = Object.values(following)?.map(following => following?.follower_info?.id))
  const usersNotFollowing = allUsers?.filter(user => !following?.includes(user.id))


  useEffect(() => {
    dispatch(getFollowingPosts())
  }, [dispatch, sessionUser])

  //


  // const filteredPost = (userId) => {
  //     const post = allPost?.filter(post => {
  //         // console.log(post?.user_id, userId)
  //         return post?.user_id === userId
  //     })
  //     // console.log(post)
  //     return post
  // }

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
    dispatch(followingActions.getLoggedUserFollowingBackend(sessionUser?.id))
    dispatch(followingActions.getFollowingBackendHome(sessionUser?.id))
    // dispatch(postActions.loadAllPosts())
    // dispatch(likeActions.fetchAllLikes())
  }, [dispatch])

  const reset = () => {
    setEmail("")
    setPassword('')
    setStyle({})
  }

  // const checkLikes = (postId) => {
  //   likes?.forEach(like => {
  //     if (like?.user_id === sessionUser?.id && like?.post_id === postId) {
  //       setLikeClass('fa-solid fa-heart fa-xl')
  //     } else {
  //       setLikeClass('fa-regular fa-heart fa-xl')
  //     }
  //   })
  // }

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

  const ProfileImageTagSmall = (user) => {
    if (user?.profile_image) {
      return (
        <div className="profile-button-large" onClick={e => {
          e.preventDefault()
          history.push(`/users/${user?.id}`)
        }}>
          <img style={{ width: '2.5em', height: '2.5em', marginLeft: '-.2em' }} className='profile-img-circle-container' src={user?.profile_image} alt='preview'></img>
        </div>
      )
    } else {
      return (
        <div style={{ marginTop: '-.1em' }} onClick={e => {
          e.preventDefault()
          history.push(`/users/${user?.id}`)
        }} className='fa-regular fa-user-circle fa-xl'></div>
      )
    }
  }

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

  const fetchLikeForPost = postId => {
    dispatch(likeActions.fetchLike(postId))
  }

  const likeBtnOnSubmit = (e) => {
    e.preventDefault()
    if (likeClass === 'fa-regular fa-heart fa-xl') {
      setLikeClass('fa-solid fa-heart fa-xl')
    } else {
      setLikeClass('fa-regular fa-heart fa-xl')
    }
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

  const likePost = async (post, user, likesUserIds) => {
    if (likesUserIds?.includes(user?.id)) {
      await dispatch(likeActions.unlike(post?.id))

    } else {
      await dispatch(likeActions.like(post?.id))
    }
  };
  //
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
                        // history.go()
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
                      {/* not yet working */}
                      <LikeComponent post={post} /> <FeedPostModalCommentBtn post={post} />
                    </div>
                    <TotalLikesComponent post={post} setCurrPostState={setCurrPostState}/>
                    {/* {post?.num_likes} */}
                    <span className='feed-caption'>{post?.User?.username}
                      <span style={{ fontWeight: '400' }}> {post?.caption}</span>
                    </span>
                    <div className="load-comments-button"><FeedPostModalViewStr post={post}/></div>
                    <div className="feed-post-date">{getCreatedDate(post?.created_at)}</div>
                    {/* Create comment component */}
                    {/* <div> */}
                      {/* <testingtesting /> */}
                    {/* </div> */}
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
              {usersNotFollowing?.map(user => {
                let followText = 'Follow'
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

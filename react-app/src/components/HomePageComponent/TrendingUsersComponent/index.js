import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const TrendingUsers = ({ i }) => {
    const history = useHistory()
    const allUsers = Object.values(useSelector(state => state.users))

    console.log(allUsers)
    return (
        <div className="users-section">
            <div className="trending">
                <p>Trending 🔥🔥🔥</p>
            </div>
            <div className="user-pics-container">
                {i?.map((i, index) => (
                    <div key={index} className="user-pics">
                        <button onClick={
                            e => {
                                e.preventDefault()
                                history.push(`/users/${allUsers[i]?.id}`)
                            }
                        }>
                            <img
                                className="users-img-circle-container"
                                src={allUsers[i]?.profile_image}
                                alt='previewImage'
                            >
                            </img>
                        </button>
                    </div>
                ))}
            </div>
            <div className="user-pics-container">
                {i?.map((i, index) => (
                    <div key={index} className="username">
                        <a href={`/users/${allUsers[i]?.id}`}>{allUsers[i]?.username}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrendingUsers

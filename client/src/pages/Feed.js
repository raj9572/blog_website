import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import { fetchAllBlogs } from '../redux/feedSlice'

const Feed = () => {
    const dispatch = useDispatch()
    const myProfile = useSelector(state => state.appConfigSlice.myProfile)
    const allblogs = useSelector(state => state.feedSlice.blog)

    useEffect(() => {
        dispatch(fetchAllBlogs())
    }, [])

    return (
        <div>
            <div className=" container row">
                {allblogs?.map(blog => {
                    return <div key={blog._id} className="col-md-4">
                        <Card blog={blog} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Feed

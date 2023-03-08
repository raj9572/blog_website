import React from 'react'
import { Link } from 'react-router-dom'
import sampleblogImg from '../assests/sampleblogImg.jpg'
var moment = require('moment');
const Card = ({ blog }) => {
  return (
    <div className="card my-2" style={{ width: "18rem" }}>
      <img src={blog?.blogImage?.url || sampleblogImg} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{blog?.title}</h5>
        <p className="card-text">{blog?.description}</p>
        <p><strong>createdBy: </strong>{blog?.user?.name}</p>
        <p><strong>createdAt: </strong>{blog?.timeago}</p>
        <Link to={`/viewblog/${blog._id}`} className="btn btn-primary">Read more</Link>
      </div>
    </div>
  )
}

export default Card

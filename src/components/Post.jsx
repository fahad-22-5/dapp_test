import React from 'react'
import './Post.css'

function Post({url, cap, address}) {

  console.log('POST')
  console.log(url)
  return (
    <div className="postBox">
      <p className="postCap">{cap}</p>
      <img src = {url} className="postImg"/>
      <p className="postAdd">Uploaded By: {address}</p>
    </div>
  )
}

export default Post
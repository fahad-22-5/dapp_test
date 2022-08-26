import React from 'react'
import Post from './Post'
import './Post.css'

function Manager({linkDb, capsDb, usersDb}) {

    var index = 0;
    
  return (
    <div className="manager">
      {usersDb.map((link, index) => {
        return <Post url={linkDb[index]} cap={capsDb[index]} address={usersDb[index]}/>
      })}
    </div>
  )
}

export default Manager
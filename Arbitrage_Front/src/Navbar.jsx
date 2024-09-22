import React from 'react'
import "./style/Navbar.scss"

function navbar() {
  return (
    <>
       <div className='navbar-home'>
            <div className='left-nav'>
                <h1>ArbiTre</h1>
            </div>
            <div className='right-nav'>
                <div>right1</div>
                <div>right2</div>
            </div>
        </div> 
    </>
  )
}

export default navbar
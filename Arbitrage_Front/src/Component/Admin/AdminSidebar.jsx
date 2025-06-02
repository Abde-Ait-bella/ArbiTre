import React from 'react'
import { Link } from 'react-router-dom'

function AdminSidebar () {
  return (
    <div>
      <div class='sidebar-wrapper' data-simplebar='true'>
        <div class='sidebar-header'>
          <div className='nav-left'>
            <Link to='/dashboard/home' className='d-flex link-logo'>
              <i class='ms-3 me-3 text-white fa-solid fa-flag-checkered fs-2'></i>
              <h2 dir='ltr' className='m-0 logo'>
                <span>ArbiTre</span>
              </h2>
            </Link>
            <div className='skew'></div>
          </div>
          <div class='ms-auto toggle-icon'>
            <i class='bx-arrow-back bx'></i>
          </div>
        </div>
        {/* <!--navigation--> */}
        <ul class='metismenu' id='menu'>
          <li>
            <a href='javascript:;'>
              <div class='parent-icon'>
              <i class="fa-solid fa-chart-bar"></i>
              </div>
              <div class='menu-title'>Statistique</div>
            </a>
          </li>
        </ul>
        {/* <!--end navigation--> */}
      </div>
    </div>
  )
}

export default AdminSidebar

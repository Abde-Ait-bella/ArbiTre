import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar () {
  return (
    <div>
      <div>
        <div class='topbar d-flex align-items-center'>
          <nav class='gap-3 navbar navbar-expand'>
            <div class='mobile-toggle-menu'>
              <i class='bx bx-menu'></i>
            </div>
            <div class='flex-grow-1 search-bar'>
              <div class='position-relative search-bar-box'>
                <input
                  type='text'
                  class='form-control search-control'
                  placeholder='Type to search...'
                />
                <span class='top-50 position-absolute search-show translate-middle-y'>
                  <i class='bx bx-search' />
                  <i />
                </span>
                <span class='top-50 position-absolute search-close translate-middle-y'>
                  <i class='bx bx-x'></i>
                </span>
              </div>
            </div>
            <div class='top-menu ms-auto'>
              <ul class='align-items-center gap-1 navbar-nav'>
                <li
                  class='d-flex mobile-search-icon nav-item d-lg-none'
                  data-bs-toggle='modal'
                  data-bs-target='#SearchModal'
                >
                  <a class='nav-link' href='avascript:;'>
                    <i class='bx bx-search'></i>
                  </a>
                </li>

                <li class='nav-item dropdown dropdown-app'>
                 
                  <div class='p-0 dropdown-menu dropdown-menu-end'>
                    <div class='my-2 app-container p-2'>
                      <div class='justify-content-center p-2 row-cols-3 row gx-0 gy-2'>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/slack.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Slack</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/behance.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Behance</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/google-drive.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Dribble</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/outlook.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Outlook</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/github.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>GitHub</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/stack-overflow.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Stack</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/figma.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Stack</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/twitter.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Twitter</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/google-calendar.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Calendar</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/spotify.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Spotify</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/google-photos.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Photos</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/pinterest.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Photos</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/linkedin.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>linkedin</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/dribble.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Dribble</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/youtube.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>YouTube</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/google.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>News</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/envato.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Envato</p>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class='col'>
                          <a href='javascript:;'>
                            <div class='app-box text-center'>
                              <div class='app-icon'>
                                <img
                                  src='assets/images/app/safari.png'
                                  width='30'
                                  alt=''
                                />
                              </div>
                              <div class='app-name'>
                                <p class='mt-1 mb-0'>Safari</p>
                              </div>
                            </div>
                          </a>
                        </div>

                        {/* </div><!--end row--> */}
                      </div>
                    </div>
                  </div>
                </li>

                <li class='nav-item dropdown dropdown-large'>
                  <a
                    class='position-relative nav-link dropdown-toggle dropdown-toggle-nocaret'
                    href='#'
                    data-bs-toggle='dropdown'
                  >
                    <span class='alert-count'>7</span>
                    <i class='bx bx-bell'></i>
                  </a>
                  <div class='dropdown-menu dropdown-menu-end'>
                    <a href='javascript:;'>
                      <div class='msg-header'>
                        <p class='msg-header-title'>Notifications</p>
                        <p class='msg-header-badge'>8 New</p>
                      </div>
                    </a>
                    <div class='header-notifications-list'>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='user-online'>
                            <img
                              src='assets/images/avatars/avatar-1.png'
                              class='msg-avatar'
                              alt='user avatar'
                            />
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              Daisy Anderson
                              <span class='float-end msg-time'>5 sec ago</span>
                            </h6>
                            <p class='msg-info'>The standard chunk of lorem</p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='bg-light-danger text-danger notify'>
                            dc
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              New Orders{' '}
                              <span class='float-end msg-time'>2 min ago</span>
                            </h6>
                            <p class='msg-info'>You have recived new orders</p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='user-online'>
                            <img
                              src='assets/images/avatars/avatar-2.png'
                              class='msg-avatar'
                              alt='user avatar'
                            />
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              Althea Cabardo{' '}
                              <span class='float-end msg-time'>14 sec ago</span>
                            </h6>
                            <p class='msg-info'>
                              Many desktop publishing packages
                            </p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='bg-light-success text-success notify'>
                            <img
                              src='assets/images/app/outlook.png'
                              width='25'
                              alt='user avatar'
                            />
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              Account Created
                              <span class='float-end msg-time'>28 min ago</span>
                            </h6>
                            <p class='msg-info'>
                              Successfully created new email
                            </p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='bg-light-info text-info notify'>Ss</div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              New Product Approved{' '}
                              <span class='float-end msg-time'>2 hrs ago</span>
                            </h6>
                            <p class='msg-info'>
                              Your new product has approved
                            </p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='user-online'>
                            <img
                              src='assets/images/avatars/avatar-4.png'
                              class='msg-avatar'
                              alt='user avatar'
                            />
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              Katherine Pechon{' '}
                              <span class='float-end msg-time'>15 min ago</span>
                            </h6>
                            <p class='msg-info'>
                              Making this the first true generator
                            </p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='bg-light-success text-success notify'>
                            <i class='bx bx-check-square'></i>
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              Your item is shipped{' '}
                              <span class='float-end msg-time'>5 hrs ago</span>
                            </h6>
                            <p class='msg-info'>
                              Successfully shipped your item
                            </p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='bg-light-primary notify'>
                            <img
                              src='assets/images/app/github.png'
                              width='25'
                              alt='user avatar'
                            />
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              New 24 authors
                              <span class='float-end msg-time'>1 day ago</span>
                            </h6>
                            <p class='msg-info'>
                              24 new authors joined last week
                            </p>
                          </div>
                        </div>
                      </a>
                      <a class='dropdown-item' href='javascript:;'>
                        <div class='d-flex align-items-center'>
                          <div class='user-online'>
                            <img
                              src='assets/images/avatars/avatar-8.png'
                              class='msg-avatar'
                              alt='user avatar'
                            />
                          </div>
                          <div class='flex-grow-1'>
                            <h6 class='msg-name'>
                              Peter Costanzo{' '}
                              <span class='float-end msg-time'>6 hrs ago</span>
                            </h6>
                            <p class='msg-info'>
                              It was popularised in the 1960s
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <a href='javascript:;'>
                      <div class='text-center msg-footer'>
                        <button class='w-100 btn btn-light'>
                          View All Notifications
                        </button>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div class='px-3 user-box dropdown'>
              <Link
                class='d-flex align-items-center gap-3 nav-link dropdown-toggle dropdown-toggle-nocaret'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <img
                  src='assets/images/avatars/avatar-2.png'
                  class='user-img'
                  alt='user avatar'
                />
                <div class='user-info'>
                  <p class='mb-0 user-name'>Pauline Seitz</p>
                  <p class='mb-0 designattion'>Web Designer</p>
                </div>
              </Link>
              <ul class='dropdown-menu dropdown-menu-end'>
                <li>
                  <a
                    class='d-flex align-items-center dropdown-item'
                    href='javascript:;'
                  >
                    <i class='bx bx-user fs-5'></i>
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    class='d-flex align-items-center dropdown-item'
                    href='javascript:;'
                  >
                    <i class='bx bx-cog fs-5'></i>
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    class='d-flex align-items-center dropdown-item'
                    href='javascript:;'
                  >
                    <i class='bx-home-circle bx fs-5'></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a
                    class='d-flex align-items-center dropdown-item'
                    href='javascript:;'
                  >
                    <i class='bx bx-dollar-circle fs-5'></i>
                    <span>Earnings</span>
                  </a>
                </li>
                <li>
                  <a
                    class='d-flex align-items-center dropdown-item'
                    href='javascript:;'
                  >
                    <i class='bx bx-download fs-5'></i>
                    <span>Downloads</span>
                  </a>
                </li>
                <li>
                  <div class='mb-0 dropdown-divider'></div>
                </li>
                <li>
                  <a
                    class='d-flex align-items-center dropdown-item'
                    href='javascript:;'
                  >
                    <i class='bx bx-log-out-circle'></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar

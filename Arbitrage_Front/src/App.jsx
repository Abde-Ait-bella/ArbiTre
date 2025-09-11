import React, { useEffect, useRef, useState } from 'react';
import { Route, Link, NavLink, Routes, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Add this import

import Matches from './Component/Matche/MatchesListe';
import UpdateMatche from './Component/Matche/UpdateMatche/UpdateMatche';
import DeletedMatche from './Component/Matche/DeletedMatche';
import UpdatedMatche from './Component/Matche/UpdateMatche/UpdatedMatche';

import Stades from './Component/Stade/StadesListe';
import AddStade from './Component/Stade/AddStade';
import AddedStade from './Component/Stade/AddedStade';
import DeletedStade from './Component/Stade/DeletedStade';
import UpdateStade from './Component/Stade/UpdateStade';
import UpdatedStade from './Component/Stade/UpdatedStade';
import ClubListe from './Component/Club/ClubsListe';
import AddClub from './Component/Club/AddClub';
import AddedClub from './Component/Club/AddedClub';
import DeletedClub from './Component/Club/DeletedClub';
import UpdateClub from './Component/Club/UpdateClub';
import UpdatedClub from './Component/Club/UpdatedClub';
import RapportListe from './Component/Rapport/RapportListe';
import DetailleRapport from './Component/Rapport/DetailleRapport';
import AddRapport from './Component/Rapport/AddRapport/AddRapport';
import AddedRapport from './Component/Rapport/AddRapport/AddedRapport';

import HomeDashboard from './Component/HomeDashboard';
import './css/style.css'
import './css/bootstrap.min.css'
import './index.css'
import ArbiTreListe from './Component/Arbitre/ArbitreListe';
import AddArbitre from './Component/Arbitre/AddArbitre';
import AddedArbitre from './Component/Arbitre/AddedArbitre';
import UpdateArbitre from './Component/Arbitre/UpdateArbitre';
import UpdatedArbitre from './Component/Arbitre/UpdatedArbitre';
import DeletedArbitre from './Component/Arbitre/DeletedArbitre';

import DelegueListe from './Component/Delegue/DelegueListe';
import AddDelegue from './Component/Delegue/AddDelegue';
import AddedDelegue from './Component/Delegue/AddedDelegue';
import UpdateDelegue from './Component/Delegue/UpdateDelegue';
import UpdatedDelegue from './Component/Delegue/UpdatedDelegue';
import DeletedDelegue from './Component/Delegue/DeletedDelegue';

import JoueurListe from './Component/Joueur/JoueurListe';
import AddJoueur from './Component/Joueur/AddJoueur';
import AddedJoueur from './Component/Joueur/AddedJoueur';
import UpdateJoueur from './Component/Joueur/UpdateJoueur';
import UpdatedJoueur from './Component/Joueur/UpdatedJoueur';
import DeletedJoueur from './Component/Joueur/DeletedJoueur';

import VillesListe from './Component/Villes/VillesListe';
import AddVille from './Component/Villes/AddVille';
import AddedVille from './Component/Villes/AddedVille';
import UpdateVille from './Component/Villes/UpdateVille';
import UpdatedVille from './Component/Villes/UpdatedVille';
import DeletedVille from './Component/Villes/DeletedVille';
import "./style/App.scss";

import Settings from './Component/Settings';
import { axiosClinet } from './Api/axios';

import { AuthUser } from './AuthContext';
import ScrollToTop from 'react-scroll-to-top';
import { motion, useScroll } from "framer-motion"
import SuperAdminDashboard from './Admin/SuperAdminDashboard';
import UserManagement from './Admin/UserManagement';
import GlobalStatistics from './Admin/GlobalStatistics';

import Logo from './Component/Utils/Logo';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState();
  const navigate = useNavigate();
  const pageRef = useRef();
  const { scrollYProgress } = useScroll();

  const { user, userDataLogout } = AuthUser();

  useEffect(() => {
    if (user) {
      // Check if the user is trying to access admin routes
      if (window.location.pathname.includes('/dashboard/admin') && user.role !== 'super_admin') {
        navigate('/dashboard/home');
      }
      setLoading(false);

      // Show development notice
      showDevelopmentNotice();
    } else {
      navigate('/login');
      localStorage.removeItem('AUTHENTICATED');
      localStorage.removeItem('token');
      setLoading(false);
    }

    setMobile(window.innerWidth <= 390);
  }, [user]);

  // Function to show the development notice
  const showDevelopmentNotice = () => {
    // Check if we've shown this already in this session
    const noticeShown = sessionStorage.getItem('devNoticeShown');
    if (!noticeShown) {
      Swal.fire({
        title: 'تنبيه!',
        html: `
          <p> أخي الحكم العصبوي المنصة قيد التطوير ونرحب بكل .</p>
           <p clssName="fs-7"> هذه المنصة غير تجارية, بحكم الممارسة فالميدان كانت فقط فكرة تم تحقيقها يعني ماعندها تامعنى ايلا ماستافدتي منها "داكشي علاش أي ملاحضة مهمة بالنسبة لينا وأي حاجة مامفهومة ماتبخلش علينا بيها ".</p>
          <p dir="ltr" style="text-align: center; margin-top: 10px;">
            <span dir="ltr">+212 681783861</span> <strong">  : للتواصل</strong> 
          </p>
        `,
        icon: 'info',
        confirmButtonText: 'فهمت',
        confirmButtonColor: '#fbab00',
        showClass: {
          popup: 'animate__animated animate__fadeIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut'
        }
      });

      // Mark as shown for this session
      sessionStorage.setItem('devNoticeShown', 'true');
    }
  };

  const logout = async () => {
    await axiosClinet.post('/logout').then((Response) => {
      navigate('/login')
      userDataLogout();
    })
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleSidebarClose = (e) => {

    if (window.innerWidth <= 768) {
      if (e.nativeEvent.srcElement.attributes.class.value === "nav-link dropdown-toggle fw-bold show" || e.nativeEvent.srcElement.attributes.class.value === "nav-link dropdown-toggle fw-bold" || e.nativeEvent.srcElement.attributes.class.value === "nav-link dropdown-toggle active Active fw-bold show" || e.nativeEvent.srcElement.attributes.class.value === "nav-link dropdown-toggle active Active fw-bold") {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    }
  };

  return (

    <>
      <motion.div className='scroll' style={{ scaleX: scrollYProgress }} />

      <div class="position-relative p-0 container-fluid" ref={pageRef} id='myDIV' >
        {
          loading ?
            < div id="spinner" class="top-50 position-fixed d-flex align-items-center justify-content-center bg-dark w-100 vh-100 translate-middle show start-50">
              <div class="spinner-border border-none text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            :
            <div>
              {/* <!-- Sidebar Start --> */}
              <div className={`sidebar ps-4 ${isSidebarOpen ? 'open' : ''}`} onClick={(e) => handleSidebarClose(e)}>
                <nav className="mt-5 bg-secondary navbar navbar-dark" >
                  <div className='mt-4 top-50 d-flex align-items-center justify-content-center me-0 w-100 navbar-brand brand start-0'>
                    <Link to='/dashboard/home' className="">
                      <Logo variant="white" size="medium" />
                    </Link>
                  </div>
                  <div class="w-100">
                    <div class="position-relative me-3 mb-1">
                      <img class="rounded-circle" src="img/png/arbitre.png" alt="" style={{ width: '35px', height: '35px' }} />
                      <div class="bottom-0 position-absolute bg-success p-1 border border-2 border-white rounded-circle end-0"></div>
                    </div>
                    <div class="me-4">
                      <p class="d-flex justify-content-center mb-0 text-white text-center fs-4">{user?.name}</p>
                      <span className="w-100 text-truncate text-wrap badge badge-primary" dir='ltr' style={{ width: '13rem' }}>{user?.email}</span>
                    </div>
                  </div>
                  <div class="w-100 navbar-nav nav-part-3">
                    <div className='mb-2'>
                      <NavLink to='/dashboard/home' className={({ isActive }) =>
                        isActive ? "nav-item nav-link Active pe-3 fw-bold" : "nav-item nav-link pe-3 fw-bold"
                      }><i class="ms-3 fa-solid fa-house"></i>الصفحة الرئيسية</NavLink>
                    </div>

                    {/* Super Admin Menu - Only visible to super_admin role */}
                    {user?.role === 'super_admin' && (
                      <div class="me-2 mt-1 nav-item dropdown">
                        <NavLink to={'/dashboard/admin'} className={({ isActive }) => isActive ? "nav-link dropdown-toggle active show Active fw-bold" : "nav-link dropdown-toggle fw-bold"}
                          data-bs-toggle="dropdown"><i class="ms-3 me-2 fa-solid fa-user-shield"></i>المشرف</NavLink>
                        <div class="bg-transparent border-0 dropdown-menu">
                          <NavLink to={"admin"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>لوحة التحكم<i class="me-3 mt-1 fa-solid fa-gauge"></i></NavLink>
                          <NavLink to={"admin/users"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>المستخدمين<i class="me-3 mt-1 fa-solid fa-users"></i></NavLink>
                          <NavLink to={"admin/statistics"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الإحصائيات<i class="me-3 mt-1 fa-solid fa-chart-line"></i></NavLink>
                        </div>
                      </div>
                    )

                    }

                    <div className="me-2">
                      <NavLink to='matches' className={({ isActive }) =>
                        isActive ? "nav-item nav-link Active fw-bold" : "nav-item nav-link fw-bold"
                      }><i class="ms-3 me-2 fa-solid fa-futbol"></i>المباريات</NavLink>
                    </div>
                    <div class="me-2 mt-1 nav-item dropdown">
                      <NavLink to={'/dashboard/composants'} className={({ isActive }) => isActive ? "nav-link dropdown-toggle active show Active fw-bold" : "nav-link dropdown-toggle fw-bold"}
                        data-bs-toggle="dropdown" ><i class="ms-3 me-2 fa-solid fa-screwdriver-wrench"></i>المكونات</NavLink>
                      <div class="bg-transparent border-0 dropdown-menu"
                      >
                        <NavLink to={"composants/stades"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الملاعب<i class="me-3 mt-1 fa-ring fa-solid"></i></NavLink>
                        <NavLink to={"composants/clubs"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الأندية<i class="me-4 mt-1 fa-solid fa-shield"></i></NavLink>
                        <NavLink to={"composants/arbitres"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الحكام <i class="me-4 mt-1 fa-solid fa-clone"></i></NavLink>
                        <NavLink to={'composants/delegue'} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>المناديب <i class="me-2 mt-1 fa-solid fa-user-tie"></i></NavLink>
                        <NavLink to={'composants/joueur'} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الاعبون <i class="me-3 mt-1 fa-solid fa-person-running"></i></NavLink>
                        <NavLink to={'composants/villes'} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>المدن <i class="me-4 mt-1 fa-solid fa-city"></i></NavLink>
                      </div>
                    </div>
                    <div className='mt-1 me-2'>
                      <NavLink to='rapport ' className={({ isActive }) =>
                        isActive ? "nav-item nav-link Active fw-bold " : "nav-item nav-link fw-bold"
                      }><i class="ms-3 me-2 fa-solid fa-book"></i> التقارير</NavLink>
                    </div>
                  </div>
                </nav>
              </div>
              {/* <Outlet /> */}
              {/* <!-- Sidebar End --> */}

              {/* <!-- Content Start --> */}

              <div className={`content bg-dark ${isSidebarOpen ? 'open' : ''}`} >
                {/* <!-- Navbar Start --> */}
                <nav class="navbar-top sticky-top justify-content-around bg-secondary px-4 py-0 navbar navbar-expand navbar-dark">

                  <a class="d-lg-block flex-shrink-0 justify-cotent-center me-4 sidebar-toggler d-none" onClick={handleSidebarToggle}>
                    {isSidebarOpen ? <i class="d-flex align-items-center justify-content-center h-100 fa fa-bars"></i> : <i class="fa-right-long d-flex align-items-center justify-content-center h-100 fa-solid fs-4"></i>}
                  </a>
                  <a class="d-block flex-shrink-0 justify-cotent-center sidebar-toggler d-lg-none w-2" onClick={handleSidebarToggle}>
                    {isSidebarOpen ? <i class="fa-right-long d-flex align-items-center justify-content-center h-100 fa-solid fs-4"></i> : <i class="d-flex align-items-center justify-content-center h-100 fa fa-bars"></i>}
                  </a>

                  <Link to={'/dashboard/home'} class="d-flex d-lg-none">
                    <Logo size="medium" variant="red" />
                  </Link>

                  <div class="align-items-center navbar-nav">
                    <div class="ms-lg-5 nav-item dropdown">
                      <Link href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img class="ms-2 me-lg-2 rounded-circle" src="img/png/arbitre.png" alt="" style={{ width: '35px', height: '35px' }} />
                        <span class="d-lg-inline-flex ms-2 me-2 fw-bold d-none">{user?.name}</span>
                      </Link>
                      <div class="bg-secondary m-0 me-4 me-lg-5 border-0 rounded-0 rounded-bottom w-20 select-menu dropdown-menu dropdown-menu-end">
                        <Link to={"/dashboard/change_password"} class="d-flex justify-content-around dropdown-item"><span className='d-lg-block d-none'>الاعدادات</span> <i class={`fa-solid fa-gears ${mobile ? 'fs-1' : 'fs-5'}`}></i></Link>
                        <Link class="d-flex justify-content-around dropdown-item" onClick={logout}><span className='d-lg-block d-none'>تسجيل الخروج</span> <i class={`fa-solid fa-right-from-bracket ${mobile ? 'fs-1' : 'fs-5'}`}></i></Link>
                      </div>
                    </div>
                  </div>
                  {/* <form class="d-md-flex me-5 d-none">
              <input class="bg-dark form-control border-0" type="search" placeholder="بحت" />
            </form> */}
                </nav>
                {/* <!-- Navbar End --> */}

                <div onClick={handleSidebarClose}>
                  <Routes>
                    <Route path="/" >
                      <Route index path="/home" element={<HomeDashboard />} />
                      <Route path="rapport" element={<RapportListe />} />
                      <Route path="detailleRapport/:id" element={<DetailleRapport />} />
                      <Route path='addRapport' element={<AddRapport />} />
                      <Route path='addedRapport' element={<AddedRapport />} />

                      <Route path="matches" element={<Matches />} />
                      <Route path="addMatche" element={<AddRapport />} />
                      <Route path='updateMatche/:id' element={<UpdateMatche />} />
                      <Route path='DeletedMatche' element={<DeletedMatche />} />
                      <Route path='updatedMatche' element={<UpdatedMatche />} />


                      <Route path="composants/stades" element={<Stades />} />
                      <Route path="composants/addStade" element={<AddStade />} />
                      <Route path='composants/DeletedStade' element={<DeletedStade />} />
                      <Route path='composants/updateStade/:id' element={<UpdateStade />} />
                      <Route path='composants/AddedStade' element={<AddedStade />} />
                      <Route path='composants/updatedStade' element={<UpdatedStade />} />

                      <Route path="composants/clubs" element={<ClubListe />} />
                      <Route path="composants/addClub" element={<AddClub />} />
                      <Route path='composants/addedClub' element={<AddedClub />} />
                      <Route path='composants/deletedClub' element={<DeletedClub />} />
                      <Route path='composants/updateClub/:id' element={<UpdateClub />} />
                      <Route path='composants/updatedClub' element={<UpdatedClub />} />

                      <Route path='composants/arbitres' element={<ArbiTreListe />} />
                      <Route path='composants/addArbitre' element={<AddArbitre />} />
                      <Route path='composants/updateArbitre/:id' element={<UpdateArbitre />} />
                      <Route path='composants/addedArbitre' element={<AddedArbitre />} />
                      <Route path='composants/deletedArbitre' element={<DeletedArbitre />} />
                      <Route path='composants/updatedArbitre' element={<UpdatedArbitre />} />

                      <Route path='composants/delegue' element={<DelegueListe />} />
                      <Route path='composants/addDelegue' element={<AddDelegue />} />
                      <Route path='composants/updateDelegue/:id' element={<UpdateDelegue />} />
                      <Route path='composants/addedDelegue' element={<AddedDelegue />} />
                      <Route path='composants/deletedDelegue' element={<DeletedDelegue />} />
                      <Route path='composants/updatedDelegue' element={<UpdatedDelegue />} />

                      <Route path='composants/joueur' element={<JoueurListe />} />
                      <Route path='composants/addJoueur' element={<AddJoueur />} />
                      <Route path='composants/updateJoueur/:id' element={<UpdateJoueur />} />
                      <Route path='composants/addedJoueur' element={<AddedJoueur />} />
                      <Route path='composants/deletedJoueur' element={<DeletedJoueur />} />
                      <Route path='composants/updatedJoueur' element={<UpdatedJoueur />} />

                      <Route path='composants/villes' element={<VillesListe />} />
                      <Route path='composants/addVille' element={<AddVille />} />
                      <Route path='composants/updateVille/:id' element={<UpdateVille />} />
                      <Route path='composants/addedVille' element={<AddedVille />} />
                      <Route path='composants/deletedVille' element={<DeletedVille />} />
                      <Route path='composants/updatedVille' element={<UpdatedVille />} />

                      {/* Super Admin Routes - Only accessible to super_admin role */}
                      {user?.role === 'super_admin' && (
                        <>
                          <Route path="admin" element={<SuperAdminDashboard />} />
                          <Route path="admin/users" element={<UserManagement />} />
                          <Route path="admin/statistics" element={<GlobalStatistics />} />
                        </>
                      )}

                      <Route path='change_password' element={<Settings />} />
                    </ Route>
                  </Routes>
                  {/* <RouterProvider router={router}/> */}
                </div>
                {/* Footer Start */}
                <div className="footer">
                  <div class="px-4 pt-4 container-fluid">
                    <div class="bg-secondary p-3 rounded-top">
                      <div class="d-flex align-items-center justify-content-around row">
                        <div dir="ltr" class="text-center col-md-4">
                          &copy; <a className='text-warning' href="#">Arbitrage</a>, All Right Reserved.
                        </div>
                        <div class="text-center col-md-4">
                          Created By <a target="_blank" className='text-warning' href="https://aitbella.digital/">AbdeSsamad Ait-bella</a>
                          <br />
                        </div>
                        <div className="d-lg-block col-md-4 d-none">
                          <Link to='/dashboard/home' className="pt-0 d-flex justify-content-center me-0 w-100 navbar-brand brand">
                            <Logo variant="white" size="small" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer End */}
              </div>
            </div>
        }
        {/* // Back to Top */}
        <div>
          <ScrollToTop smooth top="100" id={`${isSidebarOpen ? 'back-up_to_right' : 'back-up_to_lft'}`} className='text-white back-to-top fa-arrow-up fa-solid' style={{ backgroundColor: '#fbab00' }} svgPath />
        </div>
        {/* // Content End */}
      </div >
    </>
  );
}

export default App;

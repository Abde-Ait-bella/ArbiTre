import React, { useEffect, useRef, useState } from 'react';
import { Route, Link, NavLink, Routes, useNavigate } from "react-router-dom";

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

import Home from './Component/Home';
import './css/style.css'
import './css/bootstrap.min.css'
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

import  Settings  from './Component/Settings';
import { axiosClinet } from './Api/axios';

import { AuthUser } from './AuthContext';
import ScrollToTop from 'react-scroll-to-top';


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState();
  const navigate = useNavigate();
  const pageRef = useRef();

  const { user, userDataLogout } = AuthUser();

  useEffect(() => {


    if (user) {
      setLoading(false)
    } else {
      navigate('/login')
      localStorage.removeItem('AUTHENTICATED')
      localStorage.removeItem('token')
      setLoading(false)
    }

    setMobile(window.innerWidth <= 390)

  }, [window.innerWidth])


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
      <div class="container-fluid position-relative p-0" ref={pageRef} id='myDIV' >
        {
          loading ?
            < div id="spinner" class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
              <div class="spinner-border border-none text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            :
            <div>
              {/* <!-- Sidebar Start --> */}
              <div className={`sidebar ps-4 ${isSidebarOpen ? 'open' : ''}`} onClick={(e) => handleSidebarClose(e)}>
                <nav className="navbar bg-secondary navbar-dark" >
                  <div className='navbar-brand mt-1 me-0 brand d-flex justify-content-center align-items-center top-50 start-0 w-100'>
                    <Link to='/' className="">
                      <h3 className="logo">
                        <i class="fa-solid fa-flag-checkered ms-2 me-3"></i>
                        ArbiTre</h3>
                    </Link>
                  </div>
                  <div class="w-100">
                    <div class="position-relative me-3 mb-1">
                      <img class="rounded-circle" src="img/arbitre.png" alt="" style={{ width: '35px', height: '35px' }} />
                      <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div class="me-4">
                      <p class="mb-0 text-center fs-4 text-white d-flex justify-content-center">{user?.name}</p>
                      <span className="badge badge-primary text-wrap" style={{ width: '13rem'}}>{user?.email}</span>
                    </div>
                  </div>
                  <div class="navbar-nav w-100 nav-part-3">
                    <div className='mb-2'>
                      <NavLink to='/' className={({ isActive }) =>
                        isActive ? "nav-item nav-link Active pe-3 fw-bold" : "nav-item nav-link pe-3 fw-bold"
                      }><i class="fa-solid fa-house ms-3"></i>الصفحة الرئيسية</NavLink>
                      {/* <i class="fa fa-tachometer-alt me-2"></i> */}
                    </div>
                    <div className="me-2">
                      <NavLink to='/matches' className={({ isActive }) =>
                        isActive ? "nav-item nav-link Active fw-bold" : "nav-item nav-link fw-bold"
                      }><i class="fa-solid fa-futbol ms-3 me-2"></i>المباريات</NavLink>
                    </div>
                    <div class="nav-item dropdown mt-1 me-2">
                      <NavLink to={'/composants'} className={({ isActive }) => isActive ? "nav-link dropdown-toggle active show Active fw-bold" : "nav-link dropdown-toggle fw-bold"}
                        data-bs-toggle="dropdown" ><i class="fa-solid fa-screwdriver-wrench me-2 ms-3"></i>المكونات</NavLink>
                      <div class="dropdown-menu bg-transparent border-0"
                      >
                        <NavLink to={"/composants/stades"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الملاعب<i class="fa-solid fa-ring me-3 mt-1"></i></NavLink>
                        <NavLink to={"/composants/clubs"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الأندية<i class="fa-solid fa-shield me-4 mt-1"></i></NavLink>
                        <NavLink to={"/composants/arbitres"} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الحكام <i class="fa-solid fa-clone me-4 mt-1"></i></NavLink>
                        <NavLink to={'/composants/delegue'} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>المناديب <i class="fa-solid fa-user-tie me-2 mt-1"></i></NavLink>
                        <NavLink to={'/composants/joueur'} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>الاعبون <i class="fa-solid fa-person-running me-3 mt-1"></i></NavLink>
                        <NavLink to={'/composants/villes'} className={({ isActive }) => isActive ? "dropdown-item text-white" : "dropdown-item"}>المدن <i class="fa-solid fa-city me-4 mt-1"></i></NavLink>
                      </div>
                    </div>
                    <div className='mt-1 me-2'>
                      <NavLink to='/rapport' className={({ isActive }) =>
                        isActive ? "nav-item nav-link Active fw-bold " : "nav-item nav-link fw-bold"
                      }><i class="fa-solid fa-book ms-3 me-2"></i> التقارير</NavLink>
                    </div>
                  </div>
                </nav>
              </div>
              {/* <Outlet /> */}
              {/* <!-- Sidebar End --> */}

              {/* <!-- Content Start --> */}

              <div className={`content bg-dark ${isSidebarOpen ? 'open' : ''}`} >
                {/* <!-- Navbar Start --> */}
                <nav class="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0 navbar-top justify-content-around">

                  <a class="sidebar-toggler flex-shrink-0 me-4 d-none d-lg-block justify-cotent-center" onClick={handleSidebarToggle}>
                    {isSidebarOpen ? <i class="fa fa-bars d-flex justify-content-center align-items-center h-100"></i> : <i class="fa-solid fa-right-long fs-4 d-flex justify-content-center align-items-center h-100"></i>}
                  </a>
                  <a class="sidebar-toggler flex-shrink-0 me-4 d-block d-lg-none justify-cotent-center" onClick={handleSidebarToggle}>
                    {isSidebarOpen ? <i class="fa-solid fa-right-long fs-4 d-flex justify-content-center align-items-center h-100"></i> : <i class="fa fa-bars d-flex justify-content-center align-items-center h-100"></i>}
                  </a>

                  <Link to={'/'} class="navbar-brand d-flex d-lg-none">
                    <h2 class="text-primary mb-0"><i class="fa-solid fa-flag-checkered ms-2 me-3"></i>ArbiTre</h2>
                  </Link>

                  <div class="navbar-nav align-items-center me-auto">
                    <div class="nav-item dropdown ms-lg-5">
                      <Link href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img class="rounded-circle me-lg-2 ms-2" src="img/arbitre.png" alt="" style={{ width: '35px', height: '35px' }} />
                        <span class="d-none d-lg-inline-flex fw-bold ms-2 me-2">{user?.name}</span>
                      </Link>
                      <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0 w-20 select-menu me-4 me-lg-5">
                        <Link to={"/change_password"} class="dropdown-item d-flex justify-content-around"><span className='d-none d-lg-block'>الاعدادات</span> <i class={`fa-solid fa-gears ${mobile ? 'fs-1' : 'fs-5'}`}></i></Link>
                        <Link class="dropdown-item d-flex justify-content-around" onClick={logout}><span className='d-none d-lg-block'>تسجيل الخروج</span> <i class={`fa-solid fa-right-from-bracket ${mobile ? 'fs-1' : 'fs-5'}`}></i></Link>
                      </div>
                    </div>
                  </div>
                  {/* <form class="d-none d-md-flex me-5">
              <input class="form-control bg-dark border-0" type="search" placeholder="بحت" />
            </form> */}
                </nav>
                {/* <!-- Navbar End --> */}

                <div onClick={handleSidebarClose}>
                  <Routes>
                    <Route path="/" >
                      <Route index element={<Home />} />
                      <Route path="/rapport" element={<RapportListe />} />
                      <Route path="/detailleRapport/:id" element={<DetailleRapport />} />
                      <Route path='/addRapport' element={<AddRapport />} />
                      <Route path='/addedRapport' element={<AddedRapport />} />

                      <Route path="/matches" element={<Matches />} />
                      <Route path="/addMatche" element={<AddRapport />} />
                      <Route path='/updateMatche/:id' element={<UpdateMatche />} />
                      <Route path='/DeletedMatche' element={<DeletedMatche />} />
                      <Route path='/updatedMatche' element={<UpdatedMatche />} />


                      <Route path="/composants/stades" element={<Stades />} />
                      <Route path="/composants/addStade" element={<AddStade />} />
                      <Route path='/composants/DeletedStade' element={<DeletedStade />} />
                      <Route path='/composants/updateStade/:id' element={<UpdateStade />} />
                      <Route path='/composants/AddedStade' element={<AddedStade />} />
                      <Route path='/composants/updatedStade' element={<UpdatedStade />} />

                      <Route path="/composants/clubs" element={<ClubListe />} />
                      <Route path="/composants/addClub" element={<AddClub />} />
                      <Route path='/composants/addedClub' element={<AddedClub />} />
                      <Route path='/composants/deletedClub' element={<DeletedClub />} />
                      <Route path='/composants/updateClub/:id' element={<UpdateClub />} />
                      <Route path='/composants/updatedClub' element={<UpdatedClub />} />

                      <Route path='/composants/arbitres' element={<ArbiTreListe />} />
                      <Route path='/composants/addArbitre' element={<AddArbitre />} />
                      <Route path='/composants/updateArbitre/:id' element={<UpdateArbitre />} />
                      <Route path='/composants/addedArbitre' element={<AddedArbitre />} />
                      <Route path='/composants/deletedArbitre' element={<DeletedArbitre />} />
                      <Route path='/composants/updatedArbitre' element={<UpdatedArbitre />} />

                      <Route path='/composants/delegue' element={<DelegueListe />} />
                      <Route path='/composants/addDelegue' element={<AddDelegue />} />
                      <Route path='/composants/updateDelegue/:id' element={<UpdateDelegue />} />
                      <Route path='/composants/addedDelegue' element={<AddedDelegue />} />
                      <Route path='/composants/deletedDelegue' element={<DeletedDelegue />} />
                      <Route path='/composants/updatedDelegue' element={<UpdatedDelegue />} />

                      <Route path='/composants/joueur' element={<JoueurListe />} />
                      <Route path='/composants/addJoueur' element={<AddJoueur />} />
                      <Route path='/composants/updateJoueur/:id' element={<UpdateJoueur />} />
                      <Route path='/composants/addedJoueur' element={<AddedJoueur />} />
                      <Route path='/composants/deletedJoueur' element={<DeletedJoueur />} />
                      <Route path='/composants/updatedJoueur' element={<UpdatedJoueur />} />

                      <Route path='/composants/villes' element={<VillesListe />} />
                      <Route path='/composants/addVille' element={<AddVille />} />
                      <Route path='/composants/updateVille/:id' element={<UpdateVille />} />
                      <Route path='/composants/addedVille' element={<AddedVille />} />
                      <Route path='/composants/deletedVille' element={<DeletedVille />} />
                      <Route path='/composants/updatedVille' element={<UpdatedVille />} />

                      <Route path='/change_password' element={<Settings />} />
                    </ Route>
                  </Routes>
                  {/* <RouterProvider router={router}/> */}
                </div>
                {/* Footer Start */}
                <div className="footer">
                  <div class="container-fluid pt-4 px-4">
                    <div class="bg-secondary rounded-top p-3">
                      <div class="row d-flex justify-content-around align-items-center">
                        <div dir="ltr" class="col-md-4 text-center">
                          &copy; <a className='text-warning' href="#">Arbitrage</a>, All Right Reserved.
                        </div>
                        <div class="col-md-4 text-center">
                          Created By <a target="_blank" className='text-warning' href="https://www.linkedin.com/in/abde-ssamad-ait-bella-92481a249/">AbdeSsamad Ait-bella</a>
                          <br />
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                          <Link to='/' className="navbar-brand mt-1 me-0 brand d-flex justify-content-center w-100">
                            <h3 className="logo mb-0">
                              <i class="fa-solid fa-flag-checkered ms-2 me-3"></i>
                              ArbiTre</h3>
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
          <ScrollToTop smooth top="100" id={`${isSidebarOpen ? 'back-up_to_right' : 'back-up_to_lft'}`} className='fa-solid fa-arrow-up text-white back-to-top ' style={{ backgroundColor: '#fbab00' }} svgPath />
        </div>
        {/* // Content End */}
      </div >
    </>
  );
}

export default App;

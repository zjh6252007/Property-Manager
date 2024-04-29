import React from 'react';
import './index.scss'
import Sidebar from '../../components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer';
const MainPage=()=>{
  
    return (
      <div className='homepage'>
        <Sidebar />
        <div className='content'>
          <div >
            <Header/>
          </div>
          <Outlet/>
          <Footer/>
        </div>
      </div>
    )
}

export default MainPage

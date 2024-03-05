import React from 'react';
import './index.scss'
import Sidebar from '../../components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
const MainPage=()=>{

    return (
      <div className='homepage'>
        <Sidebar />
        <div className='content'>
          <div className='header'>
            <Header/>
          </div>
          <Outlet/>
        </div>
      </div>
    )
}

export default MainPage
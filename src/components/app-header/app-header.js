import React from 'react';
import './app-header.css';

const AppHeader = ({allPosts, liked}) => {
   return (
      <div className="app-header d-flex">
         <h1>Vadym Poshuk</h1>
         <h2>Записей {allPosts}, понравилось {liked}</h2>
      </div>
   );
}

export default AppHeader;


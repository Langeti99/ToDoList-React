import React from 'react';
import './app-header.css';

const AppHeader = ({allPosts, liked, importanted}) => {
   return (
      <div className="app-header d-flex">
         <h1>Vadym Poshuk</h1>
         <h2>Записів {allPosts}, понравилось {liked}, важливих {importanted}</h2>
      </div>
   );
}

export default AppHeader;



import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';

import AppRouter from './Components/AppRouter';

function App (){
  return  (
    <BrowserRouter>
      <div className='navbar'>
      <ul className='navbar-list'>
        <li className='list-item' ><Link to="/home"> HOME </Link></li>
        <li className='list-item' ><Link to="/list"> LIST VIEW </Link></li>
        <li className='list-item' ><Link to="/gallery"> GALLERY VIEW </Link></li>
      </ul>
      </div>
      
      <AppRouter />
    </BrowserRouter>
  )
 
}

export default App;

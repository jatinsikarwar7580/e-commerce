
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserData } from './store/userSlice';
function App() {

  const userInfo = useSelector((state) => state.userData.userInfo);
const dispatch = useDispatch();
  useEffect(()=>{
    const useData = localStorage.getItem('userData');  
    dispatch(setUserData(useData?JSON.parse(useData):useData));
  },[])


  return (
    <Router>
    <div>
    <AppRoutes isLoggedIn={userInfo}  /> 
    </div>
  </Router>
  );
}

export default App;

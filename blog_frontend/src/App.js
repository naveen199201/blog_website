import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import LoginComponent from './Login';
import Articledetails from './Articledetails';
import SignUp from './Signup';

function App() {
  return (
    <BrowserRouter>   
      <Routes>
      <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginComponent />}></Route>      
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/articles/:articleId" element={<AuthorizedRoute/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const AuthorizedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (!isAuthenticated) {
    alert("Please login to read the full article."); 
    return <LoginComponent/>
  }
  return <Articledetails/>;
};

export default App;

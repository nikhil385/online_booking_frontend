import './App.css';
import Dashboard from './components/Dashboard';
import SignIn from './components/Signin';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

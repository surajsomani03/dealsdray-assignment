import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import EmployeeList from './components/Employee/EmployeeList';
import Layout from './components/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateEmployee from './components/Employee/CreateEmployee';
import EditEmployeee from "./components/Employee/EditEmployee"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
          <Route path="/employee-list" element={<ProtectedRoute element={EmployeeList} />} />
          <Route path='/create-employee' element={<ProtectedRoute element={CreateEmployee} />} />
          <Route path='/edit-employee/:id' element={<ProtectedRoute element={EditEmployeee}/>} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;

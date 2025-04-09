import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeLogin from './Components/EmployeeLogin';

import AdminRegister from './Components/AdminRegister';
import DepartmentList from './Components/DepartmentList';
import DepartmentLogin from './Components/DepartmentLogin';
import AdminDashboard from './Components/AdminDashboard';
import AdminLogin from './Components/AdminLogin';
import EmployeRegister from './Components/EmployeeRegister';
import CreateDepartment from './Components/CreateDepartment';

import DepartmentCategory from './Components/DepartmentCategory';
import UserDeatails from './Components/UserDeatails';
import CreateUser from './Components/CreateUser';
import NotificationBell from './Components/NotificationAdmin';
import BookedShifts from './Components/BookedShift';
import Recharge from './Components/Recharge';
import UserBlockList from './Components/UserBlockList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DepartmentList />} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path='/DepartmentLogin' element={<DepartmentLogin/>} />
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/EmployeeRegister' element={<EmployeRegister/>}/>
        <Route path='/AdminDashboard/CreateDepartment' element={<CreateDepartment/>}/>
        <Route path='/AdminDashboard/DepartmentCategory' element={<DepartmentCategory/>}/>
        <Route path='/AdminDashboard/UserDetails' element={<UserDeatails/>}/>
        <Route path='/AdminDashboard/CreateUser' element={<CreateUser/>}/>
        <Route path='/AdminDashboard/NotificationAdmin' element={<NotificationBell/>}/>
        <Route path="/BookShift/:id" element={<BookedShifts/>} />
        <Route path="/Recharge/:departmentId" element={<Recharge />} />
        <Route path='/AdminDashboard/UserBlock' elemenT={<UserBlockList/>}/>
      
        
        
      </Routes>
    </Router>
  );
}

export default App;

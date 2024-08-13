import './App.css'
import { Routes, Route, Navigate} from 'react-router-dom'
import { NavBar } from './routes/components/NavBar'
import { NotificationList } from './routes/ListNotification'
import { AllNotificationList } from './routes/AllNotificationList'


function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/list-notifications" element={ <NotificationList></NotificationList> }></Route>
        <Route path="/all-notifications" element={ <AllNotificationList></AllNotificationList> }></Route>
        <Route path="/*" element={ <Navigate to="/"></Navigate> }></Route>
      </Routes>
    </>
  )
}

export default App

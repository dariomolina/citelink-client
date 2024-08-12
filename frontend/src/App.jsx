import './App.css'
import { Routes, Route, Navigate} from 'react-router-dom'
import { NavBar } from './routes/components/NavBar'
import { NotificationList } from './routes/ListNotification'
import { ListSuscription } from './routes/ListSuscription'
import { CreateSuscription } from './routes/CreateSuscription'


function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/list-notifications" element={ <NotificationList></NotificationList> }></Route>
        <Route path="/create-suscriptions" element={ <CreateSuscription></CreateSuscription> }></Route>
        <Route path="/list-suscriptions" element={ <ListSuscription></ListSuscription> }></Route>
        <Route path="/*" element={ <Navigate to="/"></Navigate> }></Route>
      </Routes>
    </>
  )
}

export default App

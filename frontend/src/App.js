import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import Header from './components/Header'
import ProtectedRoute from './routing/ProtectedRoute'
import Dashboard from './screens/Dashboard'

function App() {
	return (
		<Router>
			<Header />
			<main className='container content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<Profile/>} />
						<Route path='/dashboard' element={<Dashboard/>} />
          </Route>
				</Routes>
			</main>
		</Router>
	)
}

export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './services/AuthContext'
import UserDashboard from './components/UserDashboard'
import LoginPage from '../src/app/login/page'
import SignUpPage from './components/SignUpForm'
import NewLeaderBoardComponent from './components/NewLeaderBoardComponent'
import { TableDemo } from './components/Table'
import Leaderboard from './components/Leaderboard'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AuthRedirect({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <LoginPage />
              </AuthRedirect>
            }
          />

          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <SignUpPage />
              </AuthRedirect>
            }
          />

          {/* Dashboard Route with Subroutes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
          path="/temp"
          element = {
         

              <Leaderboard />
      
        }
          />
     

          

          {/* Catch-all route: Redirect to login if not authenticated, otherwise dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'



import Home from './pages/home/page.jsx'
import Profile from './pages/profile/page.jsx'
import Ideas from './pages/ideas/page.jsx'
import Auth from './pages/auth/page.jsx'

const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home/>},
      { path: '/profile', element: <Profile/>},
      { path: '/ideas', element: <Ideas/>},
      { path: '/auth', element: <Auth/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={pages}>

    </RouterProvider>
  </React.StrictMode>
)

// import logo from './logo.svg';
import './App.css';
// import './Styles/bootstrap.min.css';
import Login from './Main_Components/Login';
import Home from './Main_Components/HomeScreen';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // another way to provide routes and navigate the app{BrowserRouter as Router, Route};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]); // object

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
      {/* provide routes to the entire application */}
    </div>
  );
}

export default App;

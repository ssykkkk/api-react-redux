import { createRoot } from 'react-dom/client';
import './styles.css';
import Home from './pages/Home/Home';
import { Provider } from 'react-redux';
import { store } from './share/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import CreatePost from './pages/CreatePost/CreatePost';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/create-post/:isEdit',
    element: <CreatePost />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

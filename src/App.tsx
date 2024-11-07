import { RouterProvider } from 'react-router-dom';
/// <reference types="vite-plugin-svgr/client" />
import { router } from './router';

const App = () => <RouterProvider router={router} />;

export default App;

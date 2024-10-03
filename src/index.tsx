// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Funding from './funding';
// import Chart from './chart'
// import Wishlist from './wishList'
// import Alarm from 'alarm';
// import Myfunding from './myfunding';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(
// 	document.getElementById('root') as HTMLElement,
// );
// root.render(
// 	<BrowserRouter>
// 		{/* <App /> */}
// 		{/* <Funding /> */}
// 		<Wishlist />
// 		{/* <Chart /> */}
// 		{/* <Alarm /> */}
// 		{/* <Myfunding /> */}
// 	</BrowserRouter>,
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from "./routes/root";
import { RouterProvider } from "react-router-dom";

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}


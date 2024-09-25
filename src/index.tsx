import ReactDOM from 'react-dom/client';
import './index.css';
import router from "./routes/root";
import { RouterProvider } from "react-router-dom";

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
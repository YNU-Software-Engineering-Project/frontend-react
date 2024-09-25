import { Outlet } from 'react-router-dom';
import './template.css';
import Header from 'components/Header';
import Footer from 'components/Footer';

function Home() {
  return (
    <div className="template">
      <Header /> 

      <div className="Content">
        <Outlet />
      </div>  

      <Footer />
    </div> 
  );
}

export default Home;
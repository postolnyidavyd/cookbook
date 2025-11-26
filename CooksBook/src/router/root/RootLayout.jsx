import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import ModalRoot from '../../components/Modals/ModalRoot.jsx';
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration/>
      <ModalRoot/>
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;

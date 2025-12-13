import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import ModalRoot from '../../components/Modals/ModalRoot.jsx';
import { useGetMeQuery } from '../../store/api/authApi.js';
import LoadingPage from '../../pages/LoadingPage.jsx';
const RootLayout = () => {
  const {isLoading} = useGetMeQuery();

  if (isLoading) {
    return <LoadingPage />;
  }
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

import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import MainPage from './pages/MainPage.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import PlaylistsPage from './pages/PlaylistsPage.jsx';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
function App() {
  return (
    <>
      <Navbar />
      <MainPage />
      <PlaylistsPage />
      <RecipesPage />
      <PlaylistDetailsPage />
      <RecipeDetailPage />
      <RegisterPage />
      <Footer />
    </>
  );
}

export default App;

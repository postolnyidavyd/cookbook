import { useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import MainPage from './pages/MainPage.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import PlaylistsPage from './pages/PlaylistsPage.jsx';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const NAVIGATION_MAP = {
  home: 'home',
  recipes: 'recipes',
  playlists: 'playlists',
  cabinet: 'register',
};

const PAGE_TO_NAV = {
  home: 'home',
  recipes: 'recipes',
  playlists: 'playlists',
  playlistDetail: 'playlists',
  recipeDetail: 'home',
  register: 'cabinet',
};

const PAGE_COMPONENTS = {
  home: MainPage,
  recipes: RecipesPage,
  playlists: PlaylistsPage,
  playlistDetail: PlaylistDetailsPage,
  recipeDetail: RecipeDetailPage,
  register: RegisterPage,
};

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeNav, setActiveNav] = useState('home');

  const PageComponent = useMemo(() => PAGE_COMPONENTS[activePage] || MainPage, [activePage]);

  const handleNavigate = (target) => {
    const page = NAVIGATION_MAP[target] || target;
    setActivePage(page);
    setActiveNav(PAGE_TO_NAV[page] || 'home');
  };

  const handleDirectNavigate = (page) => {
    setActivePage(page);
    setActiveNav(PAGE_TO_NAV[page] || activeNav);
  };

  return (
    <>
      <Navbar activeNav={activeNav} onNavigate={handleNavigate} />
      <PageComponent onNavigate={handleDirectNavigate} />
      <Footer />
    </>
  );
}

export default App;

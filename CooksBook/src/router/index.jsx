import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage.jsx';
import RecipesPage from '../pages/RecipesPage.jsx';
import PlaylistsPage from '../pages/PlaylistsPage.jsx';
import PlaylistDetailsPage from '../pages/PlaylistDetailsPage.jsx';
import RecipeDetailPage from '../pages/RecipeDetailPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import RootLayout from './root/RootLayout.jsx';
import RequireAuth from './auth/RequireAuth.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import ErrorPage from './ErrorPage.jsx';
import recipeDetailLoader from './root/recipeDetailLoader.js';
import playlistDetailLoader from './root/playlistDetailLoader.js';
import NewRecipePage from '../pages/NewRecipePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'playlists', element: <PlaylistsPage /> },
      {
        path: 'playlists/:playlistId',
        element: <PlaylistDetailsPage />,
        loader: playlistDetailLoader,
      },
      {
        path: 'recipes/:recipeId',
        element: <RecipeDetailPage />,
        loader: recipeDetailLoader,
      },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'profile',
        element: <RequireAuth />,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'new-recipe', element: <NewRecipePage /> },
        ],
      },
    ],
  },
]);
export default router;

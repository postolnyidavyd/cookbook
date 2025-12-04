import RootLayout from './root/RootLayout.jsx';
import ErrorPage from './ErrorPage.jsx';
import MainPage from '../pages/MainPage';
import RecipesPage from '../pages/RecipesPage';
import PlaylistsPage from '../pages/PlaylistsPage';
import PlaylistDetailsPage from '../pages/PlaylistDetailsPage';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import NewRecipePage from '../pages/NewRecipePage';
import RequireAuth from './auth/RequireAuth.jsx';

import recipeDetailLoader from './root/recipeDetailLoader';
import playlistDetailLoader from './root/playlistDetailLoader.js';

export const routesConfig = [
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
];

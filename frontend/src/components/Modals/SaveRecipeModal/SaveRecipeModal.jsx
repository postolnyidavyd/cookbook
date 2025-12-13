import Modal from '../Modal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectSaveRecipeModal } from '../../../store/selectors/uiSelectors.js';
import { setSaveRecipeModal } from '../../../store/uiSlice.js';
import { useEffect, useState } from 'react';
import PlaylistSelectionView from './PlaylistSelectionView.jsx';
import CreatePlaylistView from './CreatePlaylistView.jsx';
const SaveRecipeModal = () => {
  const dispatch = useDispatch();
  const { isOpen, recipeId } = useSelector(selectSaveRecipeModal);
  // 'select'| 'view'
  const [currentView, setCurrentView] = useState('select');
  useEffect(() => {
    if (isOpen) setCurrentView('select');
  }, [isOpen]);

  const handleClose = () => {
    dispatch(setSaveRecipeModal({ isOpen: false, recipeId: null }));
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {currentView === 'select' ? (
        <PlaylistSelectionView
          recipeId={recipeId}
          onClose={handleClose}
          onCreateNew={() => setCurrentView('create')}
        />
      ) : (
        <CreatePlaylistView
          onClose={() => setCurrentView('select')}
          onCreate={() => setCurrentView('select')}
        />
      )}
    </Modal>
  );
};

export default SaveRecipeModal;

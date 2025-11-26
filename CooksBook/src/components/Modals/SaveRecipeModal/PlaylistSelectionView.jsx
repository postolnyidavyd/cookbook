import { ControlElementRow, Heading } from '../SharedModalComponents.js';
import { Card } from '../../../ui/ContentCard.jsx';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../store/selectors/authSelectors.js';
import { useGetPlaylistsQuery } from '../../../store/api/playlistApi.js';
import { useMemo, useState } from 'react';
import { useSaveRecipeToPlaylistsMutation } from '../../../store/api/recipesApi.js';
import { SearchInput } from '../../../ui/inputs/index.js';
import styled from 'styled-components';
import { Wrapper } from '../../../ui/Wrapper.jsx';
import bookIcon from '../../../assets/book.svg';
import { WideFocusButton } from '../../../ui/buttons/WideFocusButton.jsx';

const PlaylistSelectionView = ({ recipeId, onClose, onCreateNew }) => {
  const userId = useSelector(selectUserId);

  const [saveToPlaylists, { isLoading }] = useSaveRecipeToPlaylistsMutation();

  const { data } = useGetPlaylistsQuery({
    ownerId: userId,
    withRecipe: recipeId,
  });

  const playlists = data?.items || [];

  const [searchTerms, setSearchTerms] = useState('');
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  // Ініціалізація вже вибраних
  useMemo(() => {
    if (playlists.length > 0) {
      const preSelectedIds = playlists
        .filter((p) => p.hasRecipe)
        .map((p) => p.id);
      setSelectedIds(new Set(preSelectedIds));
    }
  }, [data]);

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerms.toLowerCase().trim())
  );

  const handleToggleSelect = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleSave = async () => {
    try {
      await saveToPlaylists({
        id: recipeId,
        playlistIds: Array.from(selectedIds),
      }).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card $padding="3.25rem 3.5rem" $width="34.5rem">
      <Heading $padding="0rem 3rem ">Зберегти рецепт</Heading>

      <SearchInput
        squared={true}
        value={searchTerms}
        onChange={(event) => setSearchTerms(event.target.value)}
        placeholder="Знайти плейлист..."
      />

      <List>
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist) => {
            const isSelected = selectedIds.has(playlist.id);
            return (
              <ListItem key={playlist.id} $isSelected={isSelected}>
                <Wrapper $gap="0.75">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleSelect(playlist.id)}
                  />
                  <span className="playlist-name">{playlist.name}</span>
                </Wrapper>
                <Wrapper $gap="0.25">
                  <span className="count">{playlist.recipesCount}</span>
                  <img src={bookIcon} alt="Іконка" />
                </Wrapper>
              </ListItem>
            );
          })
        ) : (
          <EmptyState>Плейлистів не знайдено</EmptyState>
        )}
      </List>

      <CreateButton onClick={onCreateNew}>+ Створити плейлист</CreateButton>

      <ControlElementRow>
        <WideFocusButton
          $secondary
          $padding="1.25rem 0.625rem"
          onClick={onClose}
          disabled={isLoading}
        >
          Скасувати
        </WideFocusButton>

        <WideFocusButton
          $padding="1.25rem 0.625rem"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Зберігаємо...' : `Зберегти (${selectedIds.size})`}
        </WideFocusButton>
      </ControlElementRow>
    </Card>
  );
};


const List = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;


  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.25rem;


  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
const ListItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 0.5rem 0.75rem;

  border-radius: 0.5rem;
  border: 1px solid #757575;

  font-size: 1rem;
  font-weight: 400;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: #faf4e1; /* Світло-бежевий при наведенні */
  }

  & input {
    width: 1.35rem;
    height: 1.35rem;
    accent-color: #2d4a2f;
    cursor: pointer;
  }

  & img {
    width: 1.25rem;
    height: 1.25rem;
    object-fit: contain;
    opacity: 0.7;
  }

  .playlist-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
  }

  .count {
    color: #555;
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #757575;
  padding: 2rem 0;
  font-style: italic;
`;

const CreateButton = styled.button`
  display: inline-flex;
  padding: 0.75rem 2.75rem;
  justify-content: center;
  align-items: center;
  width: 100%; /* Розтягнув на всю ширину для кращого кліку */

  border: none;
  border-radius: 1rem;
  background: #faf4e1;
  color: #1e1e1e;

  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ebe5d5; /* Темніший відтінок */
  }
  &:active {
    background-color: #e0dacb;
  }
`;


export default PlaylistSelectionView;
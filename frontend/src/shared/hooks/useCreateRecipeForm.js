import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateRecipeMutation} from '../../store/api/recipesApi.js';
import { useUploadImageMutation } from '../../store/api/uploadsApi.js';
import { DIFFICULTIES } from '../utils/selectInputsValues.js';


const INITIAL_CATEGORIES = [
  { id: 1, name: 'Для основної страви', items: [] },
  { id: 2, name: 'Для соусу', items: [] },
];

const INITIAL_STEPS = [
  { name: '', description: '' },
  { name: '', description: '' },
];

export const useCreateRecipeForm = () => {
  const navigate = useNavigate();
  const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
  const [uploadImage] = useUploadImageMutation();

  // --- Загальна інформація ---
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [servings, setServings] = useState(1);

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  // --- Стани категорій ---
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  // --- Стани кроків ---
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [stepPreviews, setStepPreviews] = useState({});

  // --- Ефекти ---
  // Очищення фото для прев'ю обкладинки
  useEffect(() => {
    if (!coverFile) return;
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  // Очищення фото для прев'ю кроків
  useEffect(() => {
    return () => {
      Object.values(stepPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [stepPreviews]);

  // --- Логіка зміни інформації ---
  const handleChange = (field, value) => {
    switch (field) {
      case 'name': setRecipeName(value); break;
      case 'description': setDescription(value); break;
      case 'time': setCookingTime(value); break;
      case 'difficulty': setDifficulty(value); break;
      default: break;
    }
  };
  // --- Логіка обкладинки ---
  const handleCoverAdd = (e) => {
    const f = e.target.files?.[0];
    if (f) setCoverFile(f);
  };

  const handleCoverRemove = () => {
    setCoverFile(null);
    setCoverPreview('');
  };

  const handleServingsChange = (e) => {
    setServings(Math.max(1, Number(e.target.value) || 1));
  };

  // --- Логіка категорій та інгредієнтів ---
  const handleAddCategory = () => {
    const n = categoryName.trim();
    if (!n) return;
    setCategories((prev) => [...prev, { id: Date.now(), name: n, items: [] }]);
    setCategoryName('');
  };

  const handleRemoveCategory = (categoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const handleAddIngredient = (categoryId, item) => {
    if (!item?.name?.trim()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
            ...c,
            items: [
              ...(c.items ?? []),
              {
                name: item.name.trim(),
                amount: (item.amount ?? '').trim(),
                unit: (item.unit ?? '').trim(),
              },
            ],
          }
          : c
      )
    );
  };

  const handleEditIngredient = (categoryId, idx, patch) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        const copy = [...(c.items ?? [])];
        copy[idx] = { ...copy[idx], ...patch };
        return { ...c, items: copy };
      })
    );
  };

  const handleDeleteIngredient = (categoryId, idx) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        const copy = [...(c.items ?? [])];
        copy.splice(idx, 1);
        return { ...c, items: copy };
      })
    );
  };

  // --- Кроки приготування ---
  const addStep = () => setSteps((prev) => [...prev, { name: '', description: '' }]);

  const removeStep = (index) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
    setStepPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const updateStepName = (index, value) =>
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, name: value } : s)));

  const updateStepDesc = (index, value) =>
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, description: value } : s)));

  const changeStepImage = (index, file) => {
    if (!file) return;
    setStepPreviews((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      return { ...prev, [index]: URL.createObjectURL(file) };
    });
    setSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, imageFile: file } : step))
    );
  };

  // --- Відправка форми ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recipeName.trim() || !cookingTime || !difficulty || !coverFile) {
      alert("Будь ласка, заповніть обов'язкові поля!");
      return;
    }

    try {
      const processedSteps = await Promise.all(
        steps.map(async (step) => {
          let imageUrl = null;
          if (step.imageFile) {
            try {
              const uploadRes = await uploadImage(step.imageFile).unwrap();
              imageUrl = uploadRes.url;
            } catch (err) {
              console.error('Step image upload failed:', err);
            }
          }
          return {
            title: step.name.trim(),
            text: step.description.trim(),
            imageUrl: imageUrl,
          };
        })
      );

      const validSteps = processedSteps.filter((s) => s.title && s.text);

      const ingredientsData = categories
        .map((cat) => ({
          title: cat.name.trim(),
          items: cat.items.map((item) => ({
            name: item.name.trim(),
            amount: Number(item.amount) || 0,
            unit: item.unit?.trim() || '',
          })),
        }))
        .filter((cat) => cat.items.length > 0);

      const formData = new FormData();
      formData.append('title', recipeName.trim());
      formData.append('description', description.trim());
      formData.append('timeMinutes', cookingTime);
      formData.append('difficulty', difficulty);
      formData.append('servings', servings);
      formData.append('image', coverFile);
      formData.append('ingredients', JSON.stringify(ingredientsData));
      formData.append('steps', JSON.stringify(validSteps));

      const data = await createRecipe(formData).unwrap();
      const navigateTo = data?.id ? `/recipes/${data?.id}` : '/profile';
      navigate(navigateTo);
    } catch (err) {
      console.error('Create recipe error:', err);
      alert('Помилка при створенні рецепту. Перевірте дані.');
    }
  };

  return {
    formData: {
      recipeName, description, cookingTime, difficulty, servings,
      coverFile, coverPreview, categories, categoryName, steps, stepPreviews
    },
    setFormData: {
      handleChange, handleCoverAdd, handleCoverRemove, handleServingsChange, handleCategoryNameChange: (e) => setCategoryName(e.target.value)
    },
    handlers: {
      handleAddCategory, handleRemoveCategory, handleAddIngredient,
      handleEditIngredient, handleDeleteIngredient,
      addStep, removeStep, updateStepName, updateStepDesc, changeStepImage
    },
    isCreating,
    handleSubmit
  };
};
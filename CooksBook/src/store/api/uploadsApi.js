import { apiSlice } from './apiSlice.js';

export const uploadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('image', file instanceof File ? file : file.file);
        return {
          url: '/uploads/image',
          method: 'POST',
          body: formData
        };
      }
    })
  }),
  overrideExisting: false
});

export const { useUploadImageMutation } = uploadsApi;

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '35612803-f56ab8e28da93ed3650e10521';

export const perPage = 12;

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};

// export const sortedImages = imagesArray =>
//   imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
//     return { id, tags, webformatURL, largeImageURL };
//   });

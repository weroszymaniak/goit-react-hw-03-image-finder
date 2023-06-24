export default async function fetchImages(inputValue, page = 1) {
  const baseURL = 'https://pixabay.com/api/';
  const API_KEY = '35612803-f56ab8e28da93ed3650e10521';

  return await fetch(
    `${baseURL}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
}

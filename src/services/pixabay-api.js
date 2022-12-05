import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '30781043-697065eb175f1ee93924e4241';

async function fetchImages(query, page, fetchError) {
  try {
    const response = await axios({
      params: {
        key: API_KEY,
        q: query,
        page: page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
      },
    });
    return response;
  } catch (error) {
    console.log(error.message);
    fetchError(error.message);
  }
}

export default fetchImages;

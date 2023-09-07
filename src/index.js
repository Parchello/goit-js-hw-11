import axios from 'axios';
import Notiflix from 'notiflix';

const axios = require('axios');
const query = document.querySelector('.js-search-form');
const loadBtn = document.querySelector('.js-load-more');
const queryCard = document.querySelector('.gallery');

const BASE_URL = 'https://pixabay.com/api';

const params = new URLSearchParams({
  key: '39303751-f85d01d5ec057fa92b3d6d344',
  q: 'dog',
  image_type: 'photo',
  orientation: 'horizontal',
});

async function fetchPictures() {
  try {
    const resp = await axios.get(`${BASE_URL}?${params}`);
    console.log(resp);
  } catch (_) {
    Notiflix.Notify.warning('Invalid');
  }
}

fetchPictures();

function createMarckup() {
  queryCard.innerHTML = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
}

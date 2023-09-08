import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { serviceImage, perPage } from './servise';

const elements = {
  container: document.querySelector('.gallery'),
  form: document.querySelector('.search-form-js'),
  btnLoad: document.querySelector('.js-load-more'),
};
const gallery = document.querySelector('.gallery');
let page = 1;
let textInput = '';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

elements.form.addEventListener('submit', onSubmit);
elements.btnLoad.addEventListener('click', downloadMore);

function downloadMore() {
  page += 1;
  serviceImage(page, textInput)
    .then(data => {
      elements.container.insertAdjacentHTML('beforeend', createMurcup(data));
      if (data.totalHits / perPage <= page) {
        elements.btnLoad.classList.add('load-more-hidden');
        Notiflix.Notify.info('Sorry, its last page ):');
      }
    })
    .catch(err => console.log(err));
}

function onSubmit(evt) {
  evt.preventDefault();
  elements.container.innerHTML = '';
  textInput = evt.currentTarget.elements.searchQuery.value;
  serviceImage(1, textInput)
    .then(response => {
      if (response.total === 0) {
        Notiflix.Notify.failure('Sorry, there are no images. Please try again');
      }

      const el = response.hits;
      return createMurcup(response);
    })
    .catch(err => console.log(err));
}

function createMurcup(array) {
  const resp = array.hits
    .map(data => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        comments,
        views,
        downloads,
      } = data;
      return `<div class="photo-card">
        <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
      <div class="info">
        <p class="info-item">
          <b>Likes: </b><span class="numbers">${likes}</span>
        </p>
        <p class="info-item">
          <b>Views: </b><span class="numbers">${views}</span>
        </p>
        <p class="info-item">
          <b>Comments: </b><span class="numbers">${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads: </b><span class="numbers">${downloads}</span>
        </p>
      </div>
      </a>
    </div>
    `;
    })
    .join('');

  elements.container.insertAdjacentHTML('beforeend', resp);
  lightbox.refresh();
  if (array.totalHits > perPage) {
    Notiflix.Notify.success('Wiiiiii, 500 images, Wiiiiiiiiiii');
    elements.btnLoad.classList.replace('load-more-hidden', 'load-more');
  }
}

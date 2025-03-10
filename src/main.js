import { getImgs, resetPage } from './js/pixabay-api.js';
import { createGallery, resetGallery, scroll } from './js/render-functions.js'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    searchForm: document.querySelector(".js-search-form"),
    loader: document.querySelector('.js-loader'),
    gallery: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('.more-btn'),

}

let currentlySearched = '';
let page = 1;
let totalHits = 0;
let galleryModals = new SimpleLightbox('.gallery a');


refs.searchForm.addEventListener("submit", handleSubmit);

async function handleSubmit(e) { 
    e.preventDefault();


    const request = e.target.elements['search-bar'].value.trim();

    currentlySearched = request;

    resetGallery();
    resetPage();

    refs.loadMoreBtn.style.display = 'none';
    refs.loader.style.display = 'block';

    page = 1;


    const imgs = await getImgs(currentlySearched, page);
    const { hits, totalHits } = imgs;

        if (hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Invalid query. Try again',
            });
        } else { 
            createGallery(hits);
            galleryModals.refresh();

    }
    imgCountReached(hits, totalHits);

    refs.loader.style.display = 'none';

    e.target.reset();
}

refs.loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleLoadMore() {

    refs.loader.style.display = 'block';
    page++;
    const imgs = await getImgs(currentlySearched, page);
    const { hits, totalHits } = imgs;

    createGallery(hits);
    galleryModals.refresh();
    imgCountReached(hits, totalHits);


    refs.loader.style.display = 'none';
    
    scroll();
}

function imgCountReached(hits, totalHits) {
    if (hits.length < 40 || page * 40 >= totalHits) { 
        refs.loadMoreBtn.style.display = 'none';
        refs.loader.style.display = 'none';
        iziToast.info({
            message: 'No more images could be found under the current query',
        });
    }
}  



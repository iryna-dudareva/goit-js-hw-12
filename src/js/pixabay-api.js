import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
    params: {
        key: '48884243-7c5376715b9f7ca682882ed04',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
    }

});

let page = 1;

export async function getImgs(imgsOf, page) { 
    
    try {
        const r = await instance.get('', {
            params: {
                q: imgsOf,
                per_page: 40,
                page: page,
            }
        });
        if (r.data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                titleColor: 'white',
                messageColor: 'white',
                backgroundColor: 'red',
                theme: 'dark',
            });
            return { hits: [], totalHits: 0 };
        }

        return {
            hits: r.data.hits,
            totalHits: r.data.totalHits
        };
    }
        catch(error) { 
            iziToast.error({
                title: 'Error',
                message: 'Please try again',
                titleColor: 'white',
                messageColor: 'white',
                backgroundColor: 'red',
                theme: 'dark', 
            });
            return { hits: [], totalHits: 0 };
        }
 }

export function resetPage() { 
    page = 1;
}


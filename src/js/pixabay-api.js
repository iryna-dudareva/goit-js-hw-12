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
        
    }

});



export function getImgs(imgsOf) { 
    return instance.get('', { params: { q: `${imgsOf}` } }).then(r => {
        if (r.data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                titleColor: 'white',
                messageColor: 'white',
                backgroundColor: 'red',
                theme: 'dark', 
            });
            return [];
        }
        return r.data.hits;
    })
        .catch(error => {
            iziToast.error({
                title: 'Erorr',
                messages: 'Please try again',
                titleColor: 'white',
                messageColor: 'white',
                backgroundColor: 'red',
                theme: 'dark', 
            });
            return [];
        });
 }


import axios from 'axios';

const API_URL = ''; //direccion api/audio??????
export const updateProgress = async (bookId, progress) => {
    return await axios.post(`${API_URL}/update`, {bookId,progress});
};

export const getProgress = async(bookId) => {
    return await axios.get(`${API_URL}/progress/${bookId}`);
    
}


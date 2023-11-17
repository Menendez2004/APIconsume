const ApiUrl = 'https://consume-api-jmenendez-50c7dfdb6a60.herokuapp.com/api/v1';

const token = localStorage.getItem('token');

// Configura los encabezados con el token y Content-Type
const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};

module.exports = {
    headers,
    ApiUrl
};

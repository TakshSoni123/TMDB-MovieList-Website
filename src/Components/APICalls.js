import axios from 'axios';

export async function getAllMovies() {
    await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=80a29641d1701b345a02a17ef6800048&language=en-US&page=1')
    .then(res => {
        console.log(res.data.results);
        return res.data.results;
    })
    .catch(error => {
        console.log(error);
    });
}


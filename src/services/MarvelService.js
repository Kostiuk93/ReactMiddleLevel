import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp()
    

    //Alex
    // _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = 'apikey=f75e1499b218241b71745986222174a5';
    
    //Alex93
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2a5a4367491be5b1b90e0fe3a2d81b01';
    const _apiKeyComics = 'https://gateway.marvel.com:443/v1/public/comics?offset=210&apikey=2a5a4367491be5b1b90e0fe3a2d81b01'
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCaracter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // получаем персонажа
        return _transformCaracter(res.data.results[0]) // возвращаем результат персонажа
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`); // получаем персонажа
        return _transformComics(res.data.results[0]) // возвращаем результат персонажа
    }

    const _transformCaracter = (char) => {
        
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            prices: comics.prices.price
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics}
}

export default useMarvelService;
class MarvelService {
    //Alex
    // _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = 'apikey=f75e1499b218241b71745986222174a5';
    
    //Alex93
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=2a5a4367491be5b1b90e0fe3a2d81b01';
    _baseOffset = 210;


    getResourse = async (url ) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:  ${res.status}`);
        }
    
        return await res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCaracter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`); // получаем персонажа
        return this._transformCaracter(res.data.results[0]) // возвращаем результат персонажа
    }

    _transformCaracter = (char) => {
        
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
}

export default MarvelService;
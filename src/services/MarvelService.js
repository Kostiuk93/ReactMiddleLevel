class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f75e1499b218241b71745986222174a5';

    getResourse = async (url ) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:  ${res.status}`);
        }
    
        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=300&${this._apiKey}`);
        return res.data.results.map(this._transformCaracter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`); // получаем персонажа
        return this._transformCaracter(res.data.results[0]) // возвращаем результат персонажа
    }

    _transformCaracter = (char) => {
        return {
            name: char.name,
            description: char.description  ? `${char.description.slice(0, 150)}...` : "Description is missing! Sorry!",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url 
        }
    }
}

export default MarvelService;
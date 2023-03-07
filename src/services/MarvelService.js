import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error} = useHttp();

        const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
        const _apiKey = 'apikey=ea9c250011c6df4711be677f51e22706'
        const _baseOffset = 210;




        const getAllCharacters = async (offset = _baseOffset) => {
            const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
            return res.data.results.map(_transformCharacter);
        }

        const getCharacters = async (id) => {
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            return _transformCharacter(res.data.results[0]);
        }

        const _transformCharacter = (char) => {
           return {
            id: char.id,
            description: char.description ? `${char.description.slice(0, 200)}...` : "Description cooming soon...",
            name: char.name,
            thumpnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
           } 
        }

        return {loading, error, getAllCharacters, getCharacters,}
    }

    export default useMarvelService;
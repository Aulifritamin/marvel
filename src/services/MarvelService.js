import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

        const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
        const _apiKey = 'apikey=ea9c250011c6df4711be677f51e22706'
        const _baseOffset = 210;




        const getCharacter = async (name) => {
            const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
            return res.data.results.map(_transformCharacter);
        }

        const getAllCharacters = async (offset = _baseOffset) => {
            const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
            return res.data.results.map(_transformCharacter);
        }

        const getCharacters = async (id) => {
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            return _transformCharacter(res.data.results[0]);
        }

        const getComics = async (id) => {
            const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
            return _transformComics(res.data.results[0]);
        }

        const getAllComics = async (offset = 0) => {
            const res = await request (
                `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
            );
            return res.data.results.map(_transformComics);
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

        const _transformComics = (comics) => {
            return {
                id: comics.id,
                title: comics.title,
                description: comics.description || "Description cooming soon...",
                pageCount:  comics.pageCount,
                thumbnail: comics.thumbnail.path + `.` + comics.thumbnail.extension,
                language: comics.textObjects[0]?.language || "en-US",
                price:  comics.prices[0].price
				        ? `${comics.prices[0].price}$`
				        : "not available",
            }
        }

        return {loading, error, getAllCharacters, getCharacters, clearError, getAllComics, getComics, getCharacter}
    }

    export default useMarvelService;
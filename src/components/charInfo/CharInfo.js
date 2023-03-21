import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

   const {loading, error, getCharacters, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    },[props.charId])
    
    

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacters(charId)
        .then(onChatLoaded)
    }

    const onChatLoaded = (char) => {
        setChar(char);
    }
        
        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }


const View = ({char}) => {

    const {name, description, thumpnail, homepage, wiki, comics } = char;

    const imgStyle = {objectFit: 'cover'}
    if (thumpnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle.objectFit = 'contain';
    }

    return (
        <>
        <div className="char__basics">
                    <img src={thumpnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">

                    {comics.length > 0 ? null : "No comics found"}
                    {
                        comics.slice(0,10).map((item, i) => {
                            const comicsUrl = item.resourceURI.match(/comics\/(\d+)/)[1];

                            return (
                                <li key={i} className="char__comics-item">
                                <Link to={`/comics/${comicsUrl}`}>
                                {item.name}
                                </Link>
                            </li>
                            )
                        })
                    }

                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
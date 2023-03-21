import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './singleComicPage.scss';

const SingleCharPage = () => {

    const {charId} = useParams();
    const [char,SetChar] = useState(null);
    const {loading, error, getCharacters, clearError} = useMarvelService();


    useEffect(() => {
        updateChar();
    },[charId])
    
    

    const updateChar = () => {
        clearError();
        getCharacters(charId)
        .then(onCharLoaded)
        console.log(charId)
    }

    const onCharLoaded = (char) => {
        SetChar(char);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
                {errorMessage}
                {spinner}
                {content}
        </>
    )
}


const View = ({char}) => {

    const {title, description, thumpnail} = char;

    return (
        <div className="single-comic">
            <img src={thumpnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to main page</Link>
        </div>
    )
}

export default SingleCharPage;
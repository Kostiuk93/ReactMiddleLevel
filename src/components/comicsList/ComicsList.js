import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 8)
        setComicsEnded(comicsEnded => ended)
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            const noImgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            if (item.thumbnail === noImgUrl) {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="comics__item"
                    ref={el => itemRefs.current[i] = el}
                    tabIndex={0}
                    key={item.id}
                    onClick={()=> {
                        props.onComicsSelected(item.id)
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onComicsSelected(item.id);
                            focusOnItem(i);
                        }
                    }}>
                    
                        {/* <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div> */}

                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

   return (
    <div className="comics__list">
        {errorMessage}
        {spinner}
        {items}
           
        <button 
            className="button button__main button__long" 
            disabled={newItemLoading}
            style={{'display' : comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
        >
            <div className="inner">load more</div>
        </button>
    </div>
)
}

export default ComicsList;
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true, // идет загрузка данных в char, то loading true
        error: false //изначально false, так как изначально нет никакой ошибки
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
        // this.timerId = setInterval(this.updateChar, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false, // как только загрузка данных закончилась в char, то loading снановится false
            error: false // чтобы при нажатии кнопки Try it  обновлялся левая часть с рандомным персонажем
        }) 
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
      
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.onCharLoading()
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null 
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        className="button button__main"
                        onClick={this.updateChar}
                        >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char
    const noImgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    let imgStyle = {'objectFit' : 'cover'}
    if (thumbnail === noImgUrl) {
        imgStyle = {'objectFit' : 'contain'}
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                {/*Если колличество символов больше 150, то в конце строки ставится ... Если описания нет, то сообщение */}
                {char.description  ? `${char.description.slice(0, 150)}...` : `Description is missing! Sorry!`}
                </p>

                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
} 
export default RandomChar;
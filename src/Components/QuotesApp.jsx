import { useState } from 'react'
import './QuotesApp.css'
const QuotesApp = () => {
  const [quote, setQuote] =useState({
    text:"Ask not what your country can do for you; ask what you can do for your country",
    author:"John Keneddy"
  })
  const [favourites, setFavourites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false)

  const fetchNewQuote = async () => {
    const url = 'https://dummyjson.com/quotes/random'
    const response = await fetch(url)
    const data = await response.json()
    setQuote({
      text: data.quote,
      author: data.author,
    })
  }
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }
  const addToFavourites = ()=>{
    const isAlreadyInFavourites = favourites.some((fav)=>fav.text===quote.text && fav.author===quote.author,)
    if(!isAlreadyInFavourites){
      setFavourites([...favourites, quote])
    }
  }
  return (
    <div className='container'>
      <div className="quotes-app">
        <h1 className="app-heading">Quote.</h1>
        <i className='bx bxs-heart fav-icon'onClick={toggleFavorites}></i>
        <div className='quote'>
            <i className='bx bxs-quote-alt-left left-quote'></i>
            <p className="quote-text">{quote.text}</p>
            <p className="quote-author">{quote.author}</p>
            <i className='bx bxs-quote-alt-right right-quote'></i>
        </div>
        <div className="circles">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div className="circle-3"></div>
            <div className="circle-4"></div>
        </div>
        <div className="buttons">
            <button className="btn btn-new" onClick={fetchNewQuote}>New Quote</button>
            <button className="btn btn-fav" onClick={addToFavourites}>Add to Favourites</button>
        </div>
        {showFavorites &&(
          <div className="favourites">
          <button className="btn-close" onClick={toggleFavorites}>
            <i className='bx bx-x'></i>
          </button>
          {
            favourites.map((favQuote, index)=>(
              <div className="fav-quote" key={index}>
            <div className="fav-quote-delete" >
              <i className='bx bx-x-circle' 
                onClick={() => {
                const updatedFavorites = favourites.filter((item, i) => i !== index)
                setFavourites(updatedFavorites)
                }}></i>
            </div>
            <div className="fav-quote-content">
              <div className="fav-quote-text">
              {favQuote.text}
              </div>
              <div className="fav-quote-author">{favQuote.author}</div>
            </div>
          </div>
            ))
          }
          
        </div>
        )}
        
      </div>
    </div>
  )
}

export default QuotesApp




import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility, setAnswer } from "../hideSlice";


function SwipeLeftOrRight(props) {
  const showElement = useSelector(state => state.hide.shownElements);
  const questionElement = useSelector(state => state.hide.questions);
  const dbToChose = useSelector(state => state.hide.dbPics);
  let db = questionElement.pol == "Muški" ? dbToChose["Ženski"] : dbToChose["Muški"];
  const [showCard, setShowCard] = useState(db);
  const [swiperResults, setswiperResults] = useState({});

  useEffect(() => {
    const shuffled  = questionElement.pol == "Muški" ? shuffle(dbToChose["Ženski"]) : shuffle(dbToChose["Muški"])
    setShowCard( shuffled);
  }, [questionElement.pol]);


  const context = props.content
  const key = props.keyForContext
  const dispatch = useDispatch();

  function setSwipe(code, direction) {

    swiperResults[code] = direction;
    setswiperResults(swiperResults);
    if (showCard.length === 1) {
      dispatch(setAnswer({ keyForQuestion: key, value: swiperResults }))
      dispatch(toggleVisibility({ state: showElement, next: "perSwipe", current: key }))
    }
    const yty = showCard.filter(card => !card.url.includes(code))
    setShowCard(yty)
  }

  function customTinderCard(character) {
    let code = character.url.replace("/images/muska_lica/", "").replace("/images/zenska_lica/", "").replace(".jpg", "")
        
    return (

      <Card style={{ width: '20rem' }} className="text-center">
        <Card.Img variant="top" src={character.url} />
        <Card.Body>
        <Card.Title>
             <Button variant="outline-danger" className='swipeButton' onClick={() => setSwipe(code, 'dislike')}><img src="/images/cards/cross.png" /></Button>
              <Button variant="outline-success" className='swipeButton' onClick={() => setSwipe(code, 'like')}><img src="/images/cards/tick.png" /></Button>
       </Card.Title>
        </Card.Body>
      </Card>
    )
  }

  function shuffle(arrayS) {
    let array = [...arrayS];
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const Tinder = () => {
    return (
      <div className=''>
          {customTinderCard(showCard[0])}
      </div>
    )
  }

  return (
    <div>
      {(showElement[key] && db != "") ?
        <Tinder /> : null
      }
    </div>
  )
}

export default SwipeLeftOrRight;

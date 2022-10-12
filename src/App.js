import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles/App.scss";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    resetCards();
  }, []);

  const resetCards = () => {
    setCards([
      { id: uuidv4(), name: "caramel-stick", clicked: false },
      { id: uuidv4(), name: "chocolate-ball", clicked: false },
      { id: uuidv4(), name: "chocolate-cup", clicked: false },
      { id: uuidv4(), name: "chocolate-triangle", clicked: false },
      { id: uuidv4(), name: "chocolate", clicked: false },
      { id: uuidv4(), name: "cookie", clicked: false },
      { id: uuidv4(), name: "dark-orange-candy", clicked: false },
      { id: uuidv4(), name: "green-candy", clicked: false },
      { id: uuidv4(), name: "orange-candy", clicked: false },
      { id: uuidv4(), name: "orange-white-candy", clicked: false },
      { id: uuidv4(), name: "pink-candy", clicked: false },
      { id: uuidv4(), name: "red-candy", clicked: false },
    ]);
  };

  const updateScore = (score) => {
    setCurrentScore(score);
    setBestScore(Math.max(score, bestScore));
  };

  const shuffle = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const updateCardStatus = (target) => {
    console.log(target.dataset.id);
    const newCards = [...cards];
    const card = newCards.find((card) => card.id === target.dataset.id);

    if (card.clicked) {
      resetCards();
      updateScore(0);
    } else {
      card.clicked = true;
      setCards(shuffle(newCards));
      updateScore(currentScore + 1);
    }
  };

  return (
    <div>
      <header>
        <h1 className="title">Food Memory Game</h1>
        <div className="scores">
          <h2>Score: {currentScore}</h2>
          <h2>Best Score: {bestScore}</h2>
        </div>
      </header>

      <main>
        {cards.map((card) => {
          return (
            <button className="card"
              data-id={card.id}
              key={card.id}
              onClick={(e) => updateCardStatus(e.target.closest("button"))}
            >
              <img src={require(`./assets/${card.name}.png`)} alt={card.name} />
            </button>
          );
        })}
      </main>

      <footer>
        <a href="https://github.com/rikster-r/memory-card">
          &copy; 2022 rikster-r
        </a>
        <a href="https://www.freepik.com/free-vector/square-buttons-with-chocolate-hard-sugar-candies-fruit-drops-lollipop-cake-bonbon-vector-cartoon-set-sweet-food-icons-caramel-christmas-candy-cane-confectionery_24417276.htm">
          Images by upklyak on Freepik
        </a>
      </footer>
    </div>
  );
}

export default App;

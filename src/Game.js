import { useState } from "react";

/* Import images */
import cleanRoom from "./assets/images/01_clean_room.jpg";
import messyRoom from "./assets/images/02_messy_room.jpg";
import cleanToys from "./assets/images/03_clean_toys.jpg";
import messyToys from "./assets/images/04_messy_toys.png";
import cleanClothes from "./assets/images/05_clean_clothes.png";
import messyClothes from "./assets/images/06_messy_clothes.png";
import cleanPlate from "./assets/images/07_clean_plate.png";
import dirtyPlate from "./assets/images/08_dirty_plate.png";

function Game({ setPage, setScore }) {
  const items = [
    { text: "The room is clean", answer: "clean", image: cleanRoom },
    { text: "The room is messy", answer: "messy", image: messyRoom },
    { text: "Toys are kept properly", answer: "clean", image: cleanToys },
    { text: "Toys are on the floor", answer: "messy", image: messyToys },
    { text: "Clothes are folded", answer: "clean", image: cleanClothes },
    { text: "Clothes are scattered", answer: "messy", image: messyClothes },
    { text: "Plate is clean", answer: "clean", image: cleanPlate },
    { text: "Plate is dirty", answer: "messy", image: dirtyPlate }
  ];

  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  function choose(option) {
    if (option === items[index].answer) {
      setScore((prev) => prev + 1);
      setMessage("⭐ Good job!");

      setTimeout(() => {
        setMessage("");
        if (index === items.length - 1) {
          setPage("result");
        } else {
          setIndex(index + 1);
        }
      }, 800);
    } else {
      setMessage("🙂 Try again");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Sorting Game</h2>

        <p className="subtitle">
          Look at the picture and choose the correct option.
        </p>

        <p className="calm-text">
          🧠 Today’s focus: Keeping things clean
        </p>

        <img
          src={items[index].image}
          alt="sorting task"
          className="item-image"
        />

        <p className="item-text">
          {items[index].text}
        </p>

        <div className="buttons">
          <button
            className="clean-btn"
            onClick={() => choose("clean")}
          >
            🧼 Clean
          </button>

          <button
            className="messy-btn"
            onClick={() => choose("messy")}
          >
            🗑️ Messy
          </button>
        </div>

        {message && <p className="message">{message}</p>}

        <p className="subtitle">
          Question {index + 1} of {items.length}
        </p>
      </div>
    </div>
  );
}

export default Game;

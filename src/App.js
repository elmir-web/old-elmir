import "./App.scss";

import { useState } from "react";

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const MOVE_VARIANT_NONE = 0; // 0 - не куда не может двигаться
const MOVE_VARIANT_UP = 1; // 1 - может двигаться на верх
const MOVE_VARIANT_RIGHT = 2; // 2 - может двигаться вправо
const MOVE_VARIANT_DOWN = 3; // 3 - может двигаться вниз
const MOVE_VARIANT_LEFT = 4; // 4 - может двигаться влево

class Field {
  field = 55;
  freeMove = MOVE_VARIANT_NONE;

  constructor(element) {
    this.field = element;
  }
}

class Game {
  one = 0;
  two = 0;
  three = 0;
  four = 0;
  five = 0;
  six = 0;
  seven = 0;
  eight = 0;

  constructor() {
    let arrayGame = [1, 2, 3, 4, 5, 6, 7, 8];
    shuffle(arrayGame);

    let index = 0;

    for (let key in this) {
      this[key] = new Field(arrayGame[index]);
      index++;
    }

    this.six.freeMove = MOVE_VARIANT_DOWN;
    this.eight.freeMove = MOVE_VARIANT_RIGHT; // может двигаться вправо
  }
}

function App() {
  let game = new Game();

  let divArray = [];

  let index = 0;

  for (let key in game) {
    divArray.push(
      <div
        className="field"
        onClick={() => {
          switch (game[key].freeMove) {
            case MOVE_VARIANT_NONE:
              window.alert("Нельзя переместить этот блок");
              break;

            case MOVE_VARIANT_UP:
              window.alert("вверх");
              break;

            case MOVE_VARIANT_RIGHT:
              // двигаться вправо

              switch (index) {
                case 8:
                  game.nine = game.eight;
                  delete game.eight;
                  game.nine.freeMove = MOVE_VARIANT_LEFT;

                  let divEight = divArray[index - 1];
                  divArray[index - 1] = divArray[index];
                  divArray[index] = divEight;

                  setStateDivs(divArray);
                  break;

                default:
                  break;
              }
              break;

            case MOVE_VARIANT_DOWN:
              window.alert("вниз");
              break;

            case MOVE_VARIANT_LEFT:
              window.alert("влево");
              break;

            default:
              break;
          }
        }}
        key={game[key].field.toString()}
      >
        <span className="fieldValue">{game[key].field}</span>
      </div>
    );

    index++;
  }

  divArray.push(
    <div
      className="fieldEmpty"
      onClick={() => {
        window.alert("empty");
      }}
    >
      <span className="fieldValue">Пусто</span>
    </div>
  );

  const [stateDivs, setStateDivs] = useState(divArray);

  return <div className="App">{stateDivs}</div>;
}

export default App;

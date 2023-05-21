// ! data-* give stability of working code
// ! querySelector by class, the class could be removed or changed
// ! it will brake the code

const App = {
  $: {
    action: document.querySelector(`[data-id="actions"]`),
    actionItems: document.querySelector(`[data-id="actions-items"]`),
    resetBtn: document.querySelector(`[data-id="reset"]`),
    newGameBtn: document.querySelector(`[data-id="new-game"]`),
    upgradeLayout: document.querySelector(`[data-id="game-4x4"]`),
    gameLauks: document.querySelectorAll(`[data-id="game-square"]`),
    turn: document.querySelector(`[data-id="turn"]`),
  },

  state: {
    currentPlayer: 1,
  },
  init() {
    const { events } = App;
    events();
  },

  events() {
    // ! Destructuring the $ object from app for readability
    const {
      action,
      actionItems,
      resetBtn,
      newGameBtn,
      upgradeLayout,
      gameLauks,
      turn,
    } = App.$;

    action.addEventListener("click", (e) => {
      actionItems.classList.toggle("hidden");
    });

    resetBtn.addEventListener("click", (e) => {
      console.log("reseting the game");
    });

    newGameBtn.addEventListener("click", (e) => {
      console.log("starting new game ");
    });

    upgradeLayout.addEventListener("click", (e) => {
      console.log("changing the layout to 4 x 4");
    });
    gameLauks.forEach((lauks) => {
      lauks.addEventListener("click", (e) => {
        const { currentPlayer } = App.state;

        if (lauks.hasChildNodes()) {
          return;
        }

        const element =
          currentPlayer === 1
            ? `<img src="./assets/cross-svgrepo-com.svg" alt="X" class="icon-div" />`
            : `<img src="./assets/circle-svgrepo-com.svg" alt="O" class="icon-div" />`;

        e.target.innerHTML = element;

        turn.innerHTML =
          currentPlayer === 2
            ? `<img src="./assets/cross-svgrepo-com.svg" alt="X" class="icon" />
        Player 1 turn`
            : `<img src="./assets/circle-svgrepo-com.svg" alt="O" class="icon" />
        Player 2 turn`;

        // ! changing the App.state
        App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
      });
    });
  },
};

window.addEventListener("load", App.init);

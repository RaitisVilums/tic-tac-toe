import View from "./view.js";
import Store from "./store.js";

const App = {
  $: {
    action: document.querySelector(`[data-id="actions"]`),
    actionItems: document.querySelector(`[data-id="actions-items"]`),
    resetBtn: document.querySelector(`[data-id="reset"]`),
    newGameBtn: document.querySelector(`[data-id="new-game"]`),
    upgradeLayout: document.querySelector(`[data-id="game-4x4"]`),
    gameLauks: document.querySelectorAll(`[data-id="game-square"]`),
    turn: document.querySelector(`[data-id="turn"]`),
    modal: document.querySelector(`[data-id="modal"]`),
    modalBackdrop: document.querySelector(`[data-id="backdrop"]`),
    modalContent: document.querySelector(`[data-id="modal-content"]`),
    modalButton: document.querySelector(`[data-id="modal-button"]`),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);

    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progress",
      winner,
    };
  },

  init() {
    const { events } = App;
    events();
  },

  events() {
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

    modalButton.addEventListener("click", (e) => {
      App.state.moves = [];
      gameLauks.forEach((lauks) => lauks.replaceChildren());
      modal.classList.add("hidden");
      modalBackdrop.classList.add("hidden");
    });

    gameLauks.forEach((lauks) => {
      lauks.addEventListener("click", (e) => {
        const { moves } = App.state;
        const { modal, modalContent, modalBackdrop } = App.$;
        const hasMove = (squareId) => {
          const existingMove = moves.find((move) => move.squareId === squareId);
          return existingMove !== undefined;
        };

        if (hasMove(lauks.id)) {
          return;
        }

        const lastMove = moves.at(-1);

        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);

        const currentPlayer =
          moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);

        moves.push({
          squareId: +lauks.id,
          playerId: currentPlayer,
        });

        const game = App.getGameStatus(moves);

        if (game.status === "complete") {
          modal.classList.remove("hidden");
          modalBackdrop.classList.remove("hidden");

          if (game.winner) {
            const message = `Player ${game.winner} wins!`;
            modalContent.textContent = message;
          } else {
            const message = `It's a TIE!`;
            modalContent.textContent = message;
          }
        }
      });
    });
  },
};

const players = [{ id: 1 }, { id: 2 }];

function init() {
  const view = new View();
  const store = new Store(players);

  view.gameResetEvent((e) => {
    console.log(`reset the game`);
  });

  view.newRoundEvent((e) => {
    console.log(`reset the game`);
  });

  view.playerMoveEvent((lauks) => {
    const blocked = store.game.moves.find((move) => move.laukaId === +lauks.id);

    if (blocked) {
      return;
    }

    view.tooglePlayerMove(lauks, store.game.currPlayer);

    store.playerMove(+lauks.id);

    view.turnIndicator(store.game.currPlayer);
  });
}
window.addEventListener("load", init);

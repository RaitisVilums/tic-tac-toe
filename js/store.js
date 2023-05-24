const initialValue = {
  moves: [],
};

export default class Store {
  #state = initialValue;

  constructor(players) {
    this.players = players;
  }

  //   ! Gether method
  get game() {
    const state = this.#getState();
    // ! using state.moves.lenght % 2 we can find which player did the move 1 or 0 ( 1st or 2nd )
    const currPlayer = this.players[state.moves.length % 2];

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

    for (const player of this.players) {
      const selectedLaukumsid = state.moves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.laukaId);
    }

    for (const pattern of winningPatterns) {
      if (pattern.every((v) => selectedLaukumsid.includes(v))) {
        winner = player;
      }
    }

    return {
      moves: state.moves,
      currPlayer,
      status: {
        isComplete: winner != null || state.moves.length === 9,
        winner,
      },
    };
  }

  playerMove(laukaId) {
    const state = this.#getState();

    // ! strucuredClone() gives a clone of the object
    const stateClone = structuredClone(state);

    stateClone.moves.push({
      laukaId,
      player: this.game.currPlayer,
    });

    this.#saveState(stateClone);
  }

  #getState() {
    return this.#state;
  }

  #saveState(stateOrFn) {
    const prevState = this.#getState();

    let newState;

    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
        break;
      case "object":
        newState = stateOrFn;
        break;

      default:
        throw new Error(`INVALID ARGUMENT PASSED TO SAVESTATE`);
    }

    this.#state = newState;
  }
}

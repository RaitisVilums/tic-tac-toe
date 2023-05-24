// ! data-* give stability of working code
// ! querySelector by class, the class could be removed or changed
// ! it will brake the code

export default class View {
  $ = {};

  constructor() {
    this.$.action = this.#qs(`[data-id="actions"]`);
    this.$.actionItems = this.#qs(`[data-id="actions-items"]`);
    this.$.resetBtn = this.#qs(`[data-id="reset"]`);
    this.$.newGameBtn = this.#qs(`[data-id="new-game"]`);
    this.$.upgradeLayout = this.#qs(`[data-id="game-4x4"]`);
    this.$.gameLauks = this.#qsAll(`[data-id="game-square"]`);
    this.$.turn = this.#qs(`[data-id="turn"]`);
    this.$.modal = this.#qs(`[data-id="modal"]`);
    this.$.modalBackdrop = this.#qs(`[data-id="backdrop"]`);
    this.$.modalContent = this.#qs(`[data-id="modal-content"]`);
    this.$.modalButton = this.#qs(`[data-id="modal-button"]`);

    // ! UI only

    this.$.action.addEventListener("click", (e) => {
      this.#toogleMenu();
    });
  }

  // ! Bind methods

  gameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }
  newRoundEvent(handler) {
    this.$.newGameBtn.addEventListener("click", handler);
  }
  playerMoveEvent(handler) {
    this.$.gameLauks.forEach((lauks) => {
      lauks.addEventListener("click", () => handler(lauks));
    });
  }

  // ! DOM helper methods
  // ! PRIVATE METHOD
  #toogleMenu() {
    this.$.actionItems.classList.toggle("hidden");
  }

  tooglePlayerMove(gameLauks, player) {
    const element =
      player.id === 1
        ? `<img src="../assets/cross-svgrepo-com.svg" alt="X" class="icon-div" />`
        : `<img src="../assets/circle-svgrepo-com.svg" alt="O" class="icon-div" />`;

    gameLauks.innerHTML = element;
  }

  turnIndicator(player) {
    this.$.turn.innerHTML =
      player.id === 2
        ? `<img src="../assets/cross-svgrepo-com.svg" alt="X" class="icon" />
          Player 1 turn`
        : `<img src="../assets/circle-svgrepo-com.svg" alt="O" class="icon" />
          Player 2 turn`;
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error(`NO ELEMENT FOUND`);
    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error(`NO ELEMENTS FOUND`);
    return elList;
  }
}

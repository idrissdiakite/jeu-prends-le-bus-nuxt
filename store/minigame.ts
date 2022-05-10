interface PropsMiniGame {
  screen: string;
  acf: object;
}

export const state = () => ({
  screen: "start", // start - game - finish
  acf: null
});

export const mutations = {
  changeScreen(state: PropsMiniGame, screen: string) {
    state.screen = screen;
  },
  saveGameFields(state: PropsMiniGame, acf: object) {
    state.acf = acf;
  }
};

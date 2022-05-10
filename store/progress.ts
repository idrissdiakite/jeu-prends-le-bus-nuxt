interface PropsProgress {
  step: number;
  game: number;
}

export const state = () => ({
  step: 0,
  game: 0,
});

export const mutations = {
  updateStep(state: PropsProgress) {
    state.step++;
    state.game = 0;
  },
  updateGame(state: PropsProgress) {
    state.game++;
  },
  set(state: PropsProgress, props: PropsProgress) {
    state.step = props.step;
    state.game = props.game;
  },
  unset(state: PropsProgress) {
    state.step = 0;
    state.game = 0;
  },
  saveLocal(state: PropsProgress) {
    try {
      localStorage.setItem("jplb-progress-step", state.step.toString());
      localStorage.setItem("jplb-progress-game", state.game.toString());
    } catch (e) {}
  }
};

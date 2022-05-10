interface PropsGame {
  isPause: boolean;
  hasSound: boolean;
  isLoading: boolean;
  isHelp: boolean;
  canPause: boolean;
  canHelp: boolean;
  isTransition: boolean;
  playMusic: boolean;
  isFinish: boolean;
  isClick: boolean;
}

export const state = () => ({
  isPause: false,
  hasSound: true,
  isLoading: true,
  isHelp: false,
  canHelp: true,
  canPause: true,
  isTransition: false,
  playMusic: false,
  isFinish: false,
  isClick: false,
});

export const mutations = {
  toggleSound(state: PropsGame) {
    state.hasSound = !state.hasSound;
  },
  togglePause(state: PropsGame) {
    state.isPause = !state.isPause;
  },
  toggleHelp(state: PropsGame) {
    state.isHelp = !state.isHelp;
  },
  changeLoading(state: PropsGame, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  changeCanPause(state: PropsGame, canPause: boolean) {
    state.canPause = canPause;
  },
  changeCanHelp(state: PropsGame, canHelp: boolean) {
    state.canHelp = canHelp;
  },
  changeTransition(state: PropsGame, isTransition: boolean) {
    state.isTransition = isTransition;
  },
  changePlayMusic(state: PropsGame, playMusic: boolean) {
    state.playMusic = playMusic;
  },
  changeFinish(state: PropsGame, isFinish: boolean) {
    state.isFinish = isFinish;
  },
  changeClick(state: PropsGame, isClick: boolean) {
    state.isClick = isClick;
  },
};

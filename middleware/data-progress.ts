interface dataProps {
  store: any;
}

export default function(props: dataProps) {
  const { store } = props;

  if (!store.state.progress.status) {
    let getStepSaved = null;
    let getGameSaved = null;

    try {
      getStepSaved = localStorage.getItem("jplb-progress-step");
      getGameSaved = localStorage.getItem("jplb-progress-game");
    } catch (e) {
      alert("Les cookies sont désactivés sur votre navigateur, cela veut dire que nous ne pourrons enregistrer votre progression. Pour modifier cela, allez dans les paramètres de votre navigateur et 'Autoriser les cookies'")
    }

    const progress = {
      step: Number(getStepSaved) ?? 0,
      game: Number(getGameSaved) ?? 0,
    };

    store.commit("progress/set", progress);
    store.commit("progress/saveLocal");
  }
}

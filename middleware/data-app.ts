interface dataProps {
    store: any
}

import axios from 'axios'

export default async function(props: dataProps) {
    const {store} = props
    
    if (!store.state.app.hasInfos) {
        await axios
            .get(`${process.env.apiUrl}/options/options`)
            .then(response => {
                const acf = response.data.acf

                const appInfos = {
                    steps: acf.organisation_steps,
                    games: acf.organisation_games,
                    assets: acf.assets,
                }

                store.commit('app/set', appInfos)
            })
    }
}
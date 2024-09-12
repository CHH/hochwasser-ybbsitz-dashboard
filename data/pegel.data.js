import riversData from './rivers.data.js'

export default {
    async load() {
        const rivers = riversData.load()

        const requests = Object.values(rivers)
            .map((river) => fetch(`https://pegel.feuerwehr-krems.at/api/getPegel?pegelid=${river.id}`))

        const responses = await Promise.all(requests)
        const pegel = {}

        for (const res of responses) {
            const json = await res.json()

            pegel[json.Key.aPegelID] = json
        }

        return pegel
    }
}
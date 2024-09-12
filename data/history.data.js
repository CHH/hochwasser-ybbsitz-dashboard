import riversData from './rivers.data.js'
import dayjs from 'dayjs'

export default {
    async load() {
        const rivers = riversData.load()
        const data = {}

        for (const river of Object.values(rivers)) {
            const until = dayjs().add(2, 'hour').format('YYYY-MM-DDTHH:mm:ss')
            const from = dayjs().add(2, 'hour').subtract(2, 'day').format('YYYY-MM-DDTHH:mm:ss')

            const res = await fetch(`https://pegel.feuerwehr-krems.at/api/getPegelwerte?pegelid=${river.id}&d1=${from}&d2=${until}&za=15`)
            const json = await res.json()

            data[river.id] = json
        }

        return data
    }
}
// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import HomeLayout from './HomeLayout.vue'
import './style.css'

import dayjs from 'dayjs'
import 'dayjs/locale/de-at'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'

dayjs.extend(relativeTime)
dayjs.extend(quarterOfYear)
dayjs.locale('de-at')

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('home', HomeLayout)
  }
}

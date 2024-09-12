// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import HomeLayout from './HomeLayout.vue'
import './style.css'

import dayjs from 'dayjs'
import 'dayjs/locale/de-at'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('de-at')

dayjs.tz.setDefault('Europe/Vienna')

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('home', HomeLayout)
  }
}

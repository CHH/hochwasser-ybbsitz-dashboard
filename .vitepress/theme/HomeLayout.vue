<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { data as rivers } from '../../data/rivers.data.js'
import { data as pegel } from '../../data/pegel.data.js'
import { data as history } from '../../data/history.data.js'
import River from './Partials/Home/River.vue';

const timer = ref(null)

onMounted(() => {
    timer.value = setInterval(() => {
        const timestamp = +(new Date())
        const minutes = Math.floor(timestamp / 1000 / 60)

        // Reload every 5th minute of the hour
        if ((minutes % 5) === 0) {
            document.location.reload()
        }
    }, 60 * 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<template>
    <div class="pt-3">
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-3 xl:gap-6"> 
            <section
                class="rounded-xl bg-gray-800 xl:col-span-6"
                v-for="(river) in rivers"
            >
                <River
                    :river="river"
                    :data="pegel[river.id]"
                    :history="history[river.id]"
                />
            </section>

            <section class="rounded-xl bg-white shadow-sm xl:col-span-6 overflow-hidden">
                <iframe src="https://www.feuerwehr-krems.at/Dokumente/Bezirk/Die%20Feuerwehren/Die%20Feuerwehren/FFInfo_Allgemein.asp?EldisID=337401&Select=1" frameborder="0"
                    class="w-full aspect-video"
                ></iframe>
            </section>

            <section class="rounded-xl bg-white shadow-sm xl:col-span-6 overflow-hidden">
                <iframe src="https://warnungen.zamg.at/wsapp/de/alle/heute/496799,437164,539634,459470" frameborder="0"
                    class="w-full aspect-video"
                ></iframe>
            </section>
        </div>
    </div>

    <footer class="mt-9">
        <div>
            Die Daten für dieses Dashboard werden alle 15 Minuten aktualisiert.
        </div>

        <div class="mt-3">
            Quelle & laufende Daten: <a href="https://pegel.feuerwehr-krems.at/">https://pegel.feuerwehr-krems.at/</a>
        </div>
    </footer>
</template>
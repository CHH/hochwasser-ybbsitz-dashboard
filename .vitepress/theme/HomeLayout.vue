<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import EChart from './EChart.vue';
import dayjs from 'dayjs';
import { data as rivers } from '../../data/rivers.data.js'
import { data as pegel } from '../../data/pegel.data.js'
import { data as history } from '../../data/history.data.js'

const timer = ref(null)

onMounted(() => {
    timer.value = setInterval(() => {
        const timestamp = +(new Date())
        const minutes = Math.floor(timestamp / 1000 / 60)

        // Reload every 15th minute of the hour
        if ((minutes % 15) === 0) {
            document.location.reload()
        }
    }, 60 * 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<template>
    <div class="">
        <h1 class="mb-3">Dashboard</h1>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-6"> 
            <section
                class="rounded-xl bg-white shadow-sm"
                v-for="(river) in rivers"
            >
                <header class="py-3 px-6 rounded-t grid grid-cols-12 items-center">
                    <h2 class="col-span-6">{{ river.name }}</h2>
                    <div class="col-span-6 text-right">
                        <div>
                            {{ (+(pegel[river.id].Value?.Value ?? null)).toLocaleString() }} cm
                        </div>
                        <div class="text-sky-600 text-sm">
                            {{ dayjs(pegel[river.id].Value?.Key).format('DD.MM.YYYY HH:mm') }}
                        </div>
                    </div>
                </header>
                <div class="py-3 px-6">
                    <e-chart
                        class="border-0"
                        :height="400"
                        :options="{
                            xAxis: [
                                {
                                    type: 'time',
                                    name: 'Zeit',
                                }
                            ],
                            yAxis: {
                                name: 'Pegel in cm',
                                min: 0,
                                max: Math.max(+pegel[river.id].Key.cLinie3, ...history[river.id].map((it) => +it.Value)),
                            },
                            tooltip: {
                            },
                            toolbox: {
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            dataZoom: [
                                {
                                    type: 'inside',
                                    start: 0,
                                    end: 100
                                },
                                {
                                    start: 0,
                                    end: 100
                                }
                            ],
                            series: [
                                {
                                    name: `Pegel ${river.name}`,
                                    type: 'line',
                                    step: true,
                                    data: history[river.id].map((it) => (
                                        [+dayjs(it.Key), it.Value]
                                    )),
                                    symbolSize: 0,
                                    markLine: {
                                        data: [
                                            {
                                                name: 'Vorwarnstufe',
                                                yAxis: +pegel[river.id].Key.cLinie1,
                                                lineStyle: {
                                                    color: 'yellow',
                                                },
                                                label: {
                                                    formatter: '{b}'
                                                },
                                                symbol: 'none',
                                            },
                                            {
                                                name: 'Hochwasserwarnstufe',
                                                yAxis: +pegel[river.id].Key.cLinie2,
                                                lineStyle: {
                                                    color: 'orange',
                                                },
                                                label: {
                                                    formatter: '{b}'
                                                },
                                                symbol: 'none',
                                            },
                                            {
                                                name: 'Hochwasseralarmstufe',
                                                yAxis: +pegel[river.id].Key.cLinie3,
                                                lineStyle: {
                                                    color: 'red',
                                                },
                                                label: {
                                                    formatter: '{b}'
                                                },
                                                symbol: 'none',
                                            },
                                        ]
                                    }
                                }
                            ]
                        }"
                    />
                    <details class="mt-3">
                        <summary class="text-gray-500 text-sm">Rohdaten</summary>
                        <pre class="text-xs"><code>{{ pegel[river.id] }}</code></pre>
                        <pre class="text-xs"><code>{{ history[river.id] }}</code></pre>
                    </details>
                </div>
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
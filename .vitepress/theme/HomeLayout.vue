<script setup>
import { ref } from 'vue';
import EChart from './EChart.vue';
import dayjs from 'dayjs';
import { data as rivers } from '../../data/rivers.data.js'
import { data as pegel } from '../../data/pegel.data.js'
import { data as history } from '../../data/history.data.js'
</script>

<template>
    <div class="space-y-3">
        <h1>Dashboard</h1>

        <section
            class="border border-sky-600 rounded bg-white"
            v-for="(river) in rivers"
        >
            <header class="py-3 px-6 bg-sky-100 rounded-t grid grid-cols-12 items-center">
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
                    :height="300"
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
                    <summary>Rohdaten</summary>

                    <pre class="text-xs"><code>{{ pegel[river.id] }}</code></pre>
                    <pre class="text-xs"><code>{{ history[river.id] }}</code></pre>
                </details>
            </div>
        </section>

        <footer>
            Quelle: <a href="https://pegel.feuerwehr-krems.at/">https://pegel.feuerwehr-krems.at/</a>
        </footer>
    </div>
</template>
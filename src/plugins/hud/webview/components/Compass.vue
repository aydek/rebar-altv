<script lang="ts" setup>
import { useStore } from '../store';

const store = useStore();
</script>

<template>
    <div class="compass-wrapper">
        <div class="street-container">
            <div class="area">{{ store.compass.area }}</div>
        </div>

        <div class="compassui">
            <div class="compass-bar">
                <svg id="compass1" :view-box.camel="`${store.compass.heading - 90} 0 180 5`">
                    <rect width="1" fill="white" height="6" x="-90" />
                    <rect width="1" fill="white" height="2" x="-81" />
                    <rect width="1" fill="white" height="2" x="-72" />
                    <rect width="1" fill="white" height="2" x="-63" />
                    <rect width="1" fill="white" height="2" x="-54" />
                    <rect width="1" fill="white" height="4" x="-45" />
                    <rect width="1" fill="white" height="2" x="-36" />
                    <rect width="1" fill="white" height="2" x="-27" />
                    <rect width="1" fill="white" height="2" x="-18" />
                    <rect width="1" fill="white" height="2" x="-9" />
                    <rect width="1" fill="white" height="6" x="0" />
                    <rect width="1" fill="white" height="2" x="9" />
                    <rect width="1" fill="white" height="2" x="18" />
                    <rect width="1" fill="white" height="2" x="27" />
                    <rect width="1" fill="white" height="2" x="36" />
                    <rect width="1" fill="white" height="4" x="45" />
                    <rect width="1" fill="white" height="2" x="54" />
                    <rect width="1" fill="white" height="2" x="63" />
                    <rect width="1" fill="white" height="2" x="72" />
                    <rect width="1" fill="white" height="2" x="81" />
                    <rect width="1" fill="white" height="6" x="90" />
                    <rect width="1" fill="white" height="2" x="99" />
                    <rect width="1" fill="white" height="2" x="108" />
                    <rect width="1" fill="white" height="2" x="117" />
                    <rect width="1" fill="white" height="2" x="126" />
                    <rect width="1" fill="white" height="4" x="135" />
                    <rect width="1" fill="white" height="2" x="144" />
                    <rect width="1" fill="white" height="2" x="153" />
                    <rect width="1" fill="white" height="2" x="162" />
                    <rect width="1" fill="white" height="2" x="171" />
                    <rect width="1" fill="white" height="6" x="180" />
                    <rect width="1" fill="white" height="2" x="189" />
                    <rect width="1" fill="white" height="2" x="198" />
                    <rect width="1" fill="white" height="2" x="207" />
                    <rect width="1" fill="white" height="2" x="216" />
                    <rect width="1" fill="white" height="4" x="225" />
                    <rect width="1" fill="white" height="2" x="234" />
                    <rect width="1" fill="white" height="2" x="243" />
                    <rect width="1" fill="white" height="2" x="252" />
                    <rect width="1" fill="white" height="2" x="261" />
                    <rect width="1" fill="white" height="6" x="270" />
                    <rect width="1" fill="white" height="2" x="279" />
                    <rect width="1" fill="white" height="2" x="288" />
                    <rect width="1" fill="white" height="2" x="297" />
                    <rect width="1" fill="white" height="2" x="306" />
                    <rect width="1" fill="white" height="4" x="315" />
                    <rect width="1" fill="white" height="2" x="324" />
                    <rect width="1" fill="white" height="2" x="333" />
                    <rect width="1" fill="white" height="2" x="342" />
                    <rect width="1" fill="white" height="2" x="351" />
                    <rect width="1" fill="white" height="6" x="360" />
                    <rect width="1" fill="white" height="2" x="369" />
                    <rect width="1" fill="white" height="2" x="378" />
                    <rect width="1" fill="white" height="2" x="387" />
                    <rect width="1" fill="white" height="2" x="396" />
                    <rect width="1" fill="white" height="4" x="405" />
                    <rect width="1" fill="white" height="2" x="414" />
                    <rect width="1" fill="white" height="2" x="423" />
                    <rect width="1" fill="white" height="2" x="432" />
                    <rect width="1" fill="white" height="2" x="441" />
                    <rect width="1" fill="white" height="6" x="450" />
                </svg>

                <svg id="compass2" :view-box.camel="`${store.compass.heading - 90} 0 180 1.5`">
                    <text x="0" y="1.5" fill="white" text-anchor="middle">N</text>
                    <text x="360" y="1.5" fill="white" text-anchor="middle">N</text>

                    <text x="315" y="1.5" fill="white" text-anchor="middle">NE</text>
                    <text x="-45" y="1.5" fill="white" text-anchor="middle">NE</text>

                    <text x="45" y="1.5" fill="white" text-anchor="middle">NW</text>
                    <text x="405" y="1.5" fill="white" text-anchor="middle">NW</text>

                    <text x="90" y="1.5" fill="white" text-anchor="middle">W</text>
                    <text x="135" y="1.5" fill="white" text-anchor="middle">SW</text>
                    <text x="180" y="1.5" fill="white" text-anchor="middle">S</text>
                    <text x="225" y="1.5" fill="white" text-anchor="middle">SE</text>
                    <text x="270" y="1.5" fill="white" text-anchor="middle">E</text>
                </svg>
            </div>

            <div class="indicator"></div>
            <div class="indicator-value">{{ store.compass.heading.toFixed() }}</div>
        </div>
        <div class="street-container">
            <div class="street-name">
                <div style="display: flex; gap: 5px">
                    <div>{{ store.compass.street }}</div>
                    <div>{{ store.compass.crossing }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.compass-wrapper {
    position: absolute;
    display: flex;
    gap: 1rem;
    top: 0.5rem;
    left: 0px;
    width: 100vw;
    justify-content: center;

    font-family: 'Roboto', sans-serif;

    color: whitesmoke;
}
.compassui {
    width: 40vh;
    z-index: 1000;
    text-align: center;
    position: relative;
}

.indicator-value {
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);

    width: 5rem;
    background: rgba(0, 0, 0, 0.4);
    margin: auto auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.indicator {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);

    width: 0;
    height: 0;
    border-left: 1vh solid transparent;
    border-right: 1vh solid transparent;

    border-top: 1.5vh solid whitesmoke;
}

.street-container {
    font-weight: bold;
    letter-spacing: 1px;
    position: relative;
    font-size: 1rem;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    margin-top: 1rem;
}

.street-name {
    position: absolute;
    white-space: nowrap;
    left: 0px;
    top: 0px;
}
.area {
    text-align: end;
    white-space: nowrap;
    position: absolute;
    right: 0px;
    top: 0px;
}

.compass-bar {
    margin: 0 auto;
    position: relative;
    height: 5vh;
    padding-top: 1vh;
    font-weight: 500;
    color: whitesmoke;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
    mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0));
}

#compass1,
#compass2 {
    display: block;
    width: 100%;
    height: 50%;
    font-size: 5px;
    font-weight: 700;
    transform: scale(1);
}

#compass2 {
    font-family: Verdana;
}
</style>

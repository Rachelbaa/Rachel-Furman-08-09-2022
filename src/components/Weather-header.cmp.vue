<template>
    <section class="weather-header">
        <WeatherInfo :weatherCard="weatherCard"/>
        <WeatherInfo2 :weatherCard="weatherCard"/>
    </section>
</template>
  
<script lang="ts">
import WeatherInfo from './Weather-info.cmp.vue';
import WeatherInfo2 from './Weather-info2.cmp.vue';

export default {
    name: "weather-header",
    props: {
        weatherCard: {
            type: Object,
            required: true
        }
    },
    components: { WeatherInfo, WeatherInfo2 }
}
</script>
  

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_typography.scss";
@import "./src/styles/setup/_variables.scss";

.weather-header {
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 0px 30px;
    flex-direction: column-reverse;
    position: relative;


    @include for-narrow-layout {
        flex-direction: row;
    }

}
</style>
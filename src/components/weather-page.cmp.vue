<template>
  <perfect-scrollbar>
    <section class="weather-page" v-if="weatherCard">
      <div class="weather-container" :class="setBgcColor">
        <WeatherHeader :weatherCard="weatherCard" />
        <div class="futureWeather-container" :class="setBgcColor">
          <DailyForecast class="dailyForecast" v-for="num in 5" :weather="weatherCard.dailyForecasts[num-1]" />
        </div>
      </div>
    </section>
  </perfect-scrollbar>
</template>

<script lang="ts">
import DailyForecast from './Daily-forecast.cmp.vue';
import WeatherHeader from './Weather-header.cmp.vue';


export default {
  name: 'weather-page',
  data() {
    return {
      weatherCard: null,
    }
  },
  created() {
    this.loadWeatherCard()
  },
  methods: {
    async loadWeatherCard() {
      await this.$store.dispatch({ type: 'loadDefaultCard' })
      const selectedCard = this.$store.getters.currCard;
      JSON.parse(JSON.stringify(selectedCard))
      if (selectedCard && selectedCard?.locationData?.Key) {
        this.weatherCard = selectedCard;
        return;
      }
      this.weatherCard = this.$store.getters.defaultCard;
    }
  },
  computed: {
    setBgcColor() {
      let num = this.$store.getters.colorNum;
      return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
    }
  },
  components: {
    DailyForecast,
    WeatherHeader
  }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_typography.scss";
@import "./src/styles/setup/_variables.scss";

.ps {
  height: 90vh;
}

@include for-Hnormal-layout {
  .ps {
    height: 93.6vh;
  }
}

.weather-page {

  @include for-Hnormal-layout {
    margin: 0;
    height: 93.6vh;

    @include for-normal-layout {
      margin: 150px auto;
      height: auto;
    }

  }

  .weather-container {
    background-image: url('@/assets/background/appBG.jpg');
    background-blend-mode: multiply;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 90vh;

    @include for-Hnormal-layout {
      height: 93.6vh;
    }


    &.lightTheme {
      background-color: rgba(221, 221, 221, 0.9);
    }

    &.darkTheme {
      background-color: rgba(37, 37, 37, 0.8);
    }

    @include for-normal-layout {
      margin: 20px auto;
      max-width: 800px;
      border-radius: 10px;
      height: auto;
    }

    @include for-wide-layout {
      max-width: 800px;
      margin: 20px auto;

    }


  }
  .futureWeather-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex-direction: column;

    @include for-narrow-layout {
      flex-direction: row;
    }

    @include for-normal-layout {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &.lightTheme {
      background-color: rgba(180, 180, 180, 0.5);
    }

    &.darkTheme {
      // background-color: rgb(59, 74, 84, 0.9);
      background-color: rgb(28 31 32 / 90%);
    }
  }
}
</style>
<template>
  <section class="favorites-card">
    <div @click.stop="setCurrCard" class="favorite-card" :class="[setRandomImageClass, setBgcColor()]">
      <button @click="removeFromFavorites">X</button>
      <div class="curr-day-details-container">
        <div> {{cityData.mainWeather.WeatherText}} </div>
        <div> {{cityData.locationData.LocalizedName}} </div>
        <div>
          <p v-if="tempType === 'c'">{{cityData.mainWeather.Temperature.Metric.Value}} °C</p>
          <p v-else>{{cityData.mainWeather.Temperature.Imperial.Value}} °F</p>
        </div>
        <div></div>
      </div>
      <div class="future-details-container">
        <div class="flex space-between">
          <div>{{skipDay(1)}}</div>
          <div class="flex"> <img :src="require(`@/assets/icons/${cityData.dailyForecasts[0].Day.Icon}.png`)">

            <div class="temp-box" v-if="tempType === 'c'">
              <span>{{convertToC(cityData.dailyForecasts[0].Temperature.Minimum.Value)}}° |
                {{convertToC(cityData.dailyForecasts[0].Temperature.Maximum.Value)}}°</span>
            </div>
            <div class="temp-box" v-else>
              <span>{{cityData.dailyForecasts[0].Temperature.Minimum.Value}}° |
                {{cityData.dailyForecasts[0].Temperature.Maximum.Value}}°</span>
            </div>
          </div>
        </div>
        <div class="flex space-between">
          <div>{{skipDay(2)}}</div>
          <div class="flex"> <img :src="require(`@/assets/icons/${cityData.dailyForecasts[0].Day.Icon}.png`)">

            <div class="temp-box" v-if="tempType === 'c'">
              <span>{{convertToC(cityData.dailyForecasts[1].Temperature.Minimum.Value)}}° |
                {{convertToC(cityData.dailyForecasts[1].Temperature.Maximum.Value)}}°</span>
            </div>
            <div class="temp-box" v-else>
              <span>{{cityData.dailyForecasts[1].Temperature.Minimum.Value}}° |
                {{cityData.dailyForecasts[1].Temperature.Maximum.Value}}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import moment from 'moment';

export default {
  props: {
    cityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tempType(): string {
      return this.$store.getters.tempType;
    },
    setRandomImageClass() {
      return `img-${this.getRandomInt(4)}`;
    }
  },
  methods: {
    skipDay(num: number) {
      return moment().add(num, 'day').format('ddd')
    },
    convertToC(num: number) {
      let c = (num - 32) * 5 / 9
      return Math.floor(c);
    },
    setCurrCard() {
      this.$store.commit('setCurrCard', { cityWeather: this.cityData })
      this.$router.push('/')
    },
    removeFromFavorites() {
      this.$store.dispatch({ type: 'toggleFavorite', currCard: this.cityData })
    },
    setBgcColor() {
      let num = this.$store.getters.colorNum;
      return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

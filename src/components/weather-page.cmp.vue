<template>
  <section class="weather-page" v-if="weatherCard">
    
    <div class="weather-container" :class="setBgcColor">
      <!-- <div class="bgc"></div> -->
      <div class="header">
        <div class="weatherInfo-container">
          <div class="weather-info">
            <p>{{weatherCard.locationData.LocalizedName}}, <span>{{weatherCard.locationData.Country.LocalizedName}}</span></p>
            <p class="date">{{setDate}}</p>
          </div>
          <div class="imageWeather-container">
            <img :src="require(`@/assets/icons/${weatherCard.mainWeather.WeatherIcon}.png`)" :alt="weatherCard.mainWeather.WeatherText">
            <p>{{weatherCard.mainWeather.WeatherText}}</p>
          </div>
        </div>
        <div class="weatherInfo2-container">
          <div class="addF-container">
            <img v-if="reactiveIsFavorites" @click.prevent="toggleFav" src="../assets/icons/heart.png" alt="heart">
            <img v-else @click.prevent="toggleFav" src="../assets/icons/empty-heart.png" alt="empty-heart">
          </div>
          <div class="temp-container">
            <p v-if="tempType === 'c'">{{weatherCard.mainWeather.Temperature.Metric.Value}} °C </p>
            <p v-else>{{weatherCard.mainWeather.Temperature.Imperial.Value}} °F</p>
          </div>
          <div class="search-input-container" :class="setBgcColor">
            <span class="inputPH" :class="(isWriting) ? 'isWriting' : ''" @click.prevent="setInput">Search city</span>
            <input type="text" ref="searchCity" v-model="city" v-debounce:400ms="searchForCities" @input="setIsWriting"/>
            <div v-if="cityListRender" class="dataList"  :class="setBgcColor">
              <div class="option" v-for="city in cityListRender" @click.prevent="makeCard(city)" :value="city.LocalizedName">
                <h3>{{city.LocalizedName}}, <span class="country">{{city.Country.LocalizedName}} </span></h3>
              </div>
            </div>
          </div>
          <!-- <div v-if="!reactiveIsFavorites" @click.prevent="toggleFav">Add to favorites</div>
          <div v-else @click.prevent="toggleFav">Remove from favorites</div> -->
        </div>
        
      </div>
      <div class="futureWeather-container" :class="setBgcColor">
        <dailyForecast class="dailyForecast" v-for="num in 5" :weather="weatherCard.dailyForecasts[num-1]"/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import dailyForecast from '../components/daily-forecast.cmp.vue';
import moment from 'moment';


export default {
  name: 'weather-page',
  data() {
    return {
      city: '',
      isF: this.isFavorite(),
      imageW: '',
      isWriting: false,
      weatherCard: null,
      cityListRender: [],
    }
  },
  created() {
    this.loadWeatherCard()
  },
  methods: {
    async loadWeatherCard() {
      await this.$store.dispatch({type:'loadDefaultCard'})
      const selectedCard =  this.$store.getters.currCard;
      JSON.parse(JSON.stringify(selectedCard))
      if (selectedCard && selectedCard?.locationData?.Key) {
        this.weatherCard = selectedCard;
        return;
      }
      this.weatherCard = this.$store.getters.defaultCard;
    },
    async searchForCities() {
      if(this.city === '' || this.city === null) {
        this.cityListRender = [];
        return;
      } 
      this.cityListRender = await this.$store.dispatch({type:'searchCities', text: this.city})
    },
    async makeCard(cardInfo: object) {
      this.city = null;
      this.isWriting = false;
      this.cityListRender = [];
      const isFCard = this.isFavorite(cardInfo.Key);
      const isDCard = this.isDefault(cardInfo.Key);
      if(isFCard) {
        this.weatherCard = isFCard
      }else if (isDCard){
        this.weatherCard = isDCard
      }else {
        const newCityCard = await this.$store.dispatch({type:'getCityWeather', cardInfo: cardInfo})
        this.weatherCard = newCityCard;

      }      
    },
    toggleFav() {
     this.$store.dispatch({type:'toggleFavorite',currCard: this.weatherCard});
    },
    setIsWriting(ev) {
      this.isWriting = (ev.target.value === '') ? false : true;      
    },
    setInput() {
      this.$refs['searchCity'].focus();
    },
    isFavorite(key?: string){
     const searchBy = (key) ? key : this.weatherCard?.locationData?.Key
     const favorites = this.$store.getters.favorites
      if (this.weatherCard) {
        const cardIdx = favorites.findIndex((fav)=>fav.locationData.Key === searchBy)
        return (cardIdx > -1) ? favorites[cardIdx] : false ;
      }
    },
    isDefault(key?: string) {
      const card = JSON.parse(localStorage.getItem('defaultCard') as string)
      return (key === card.locationData.Key) ? card : false;
    }
  },
  computed: {
    tempType() {
      return this.$store.getters.tempType;
    },
    reactiveIsFavorites(){
      return this.isFavorite()
    },
    setBgcColor() {
      let num = this.$store.getters.colorNum;
      return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
    },
    setDate() {
      let date = this.weatherCard.mainWeather.LocalObservationDateTime;
      return moment(date).format('LL');
    }

  },
  components: {
    dailyForecast
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
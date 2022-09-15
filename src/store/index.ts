import Vue from 'vue'
import Vuex from 'vuex'
import { WeatherService } from '@/services/weather.service';
import {IFullCityData} from '@/interfaces/weather-data.interface'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultCard: {},
    currCard: {},
    favorites: JSON.parse(localStorage.getItem('favorites') as string) || [] as IFullCityData[],
    tempType: 'c',
    bgc: '',
    colorNum: ''

  },
  getters: {
    defaultCard(state) {
      return state.defaultCard
    },
    currCard(state) {
      return state.currCard
    },
    favorites(state) {
      return state.favorites
    },
    tempType(state) {
      return state.tempType
    },
    bgc(state) {
      return state.bgc
    },
    colorNum(state) {
      return state.colorNum
    }
  },
  mutations: {
    setBgc(state,{color}) {
      state.bgc = color;
    },
    setColorNum(state,{num}) {
      state.colorNum = num;
    },
    setTempType(state,{temp}) {
      state.tempType = temp;
    },
    setDefaultCard(state, {card}) {
      state.defaultCard = card
    },
    addCardToFavorites(state, {currCard}) {
      state.favorites.push(currCard)
      
    },
    removeCardFromFavorites(state, {cardIdx}) {
      state.favorites.splice(cardIdx, 1)

    },
    setCurrCard(state, {cityWeather}) {
      state.currCard = cityWeather;
    }
  },
  actions: {
    async loadDefaultCard({commit, state}, ) {
      const weatherService = new WeatherService();
      return weatherService.getDefaultCard()
        .then(card => {
          commit({type:'setDefaultCard', card})
        })
    },

    toggleFavorite({commit, state}, {currCard}) {
      const cardIdx = state.favorites.findIndex((card: any)=>card.locationData.Key === currCard.locationData.Key )
      if (cardIdx > -1) {
        commit({type:'removeCardFromFavorites', cardIdx})
        localStorage.setItem('favorites',JSON.stringify(state.favorites))
      } else {
        commit({type:'addCardToFavorites', currCard})
        localStorage.setItem('favorites',JSON.stringify(state.favorites))

      }
    
    },
    async searchCities({commit, state}, {text}) {
      const weatherService = new WeatherService();
      const cities = weatherService.searchForCities(text)
      return cities;
    },
    async getCityWeather({commit, state} , {cardInfo}) {
      const weatherService = new WeatherService();
      const cityWeather = await weatherService.getCard(cardInfo)
      commit({type:'setCurrCard', cityWeather})
      return cityWeather;

    }

  }
})

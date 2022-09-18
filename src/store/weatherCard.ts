// import { WeatherService } from '@/services/weather.service';

// // State 
// const state = {
//     defaultCard: {},
//     currCard: {},
// };

// // Getters
// const getters = {
//     defaultCard:(state: { defaultCard: Object; }) => state.defaultCard,
//     currCard:(state: { currCard: Object; }) => state.currCard,
// };

// // Actions
// const actions = {
//     async getCityWeather:({ commit }:any, cardInfo:object) => {
//         const weatherService = new WeatherService();
//         const cityWeather = await weatherService.getCard(cardInfo)
//         commit({ type: 'setCurrCard', cityWeather })
//         return cityWeather;

//     },
//     async loadDefaultCard({ commit },) {
//         const weatherService = new WeatherService();
//         return weatherService.getDefaultCard()
//             .then(card => {
//                 commit({ type: 'setDefaultCard', card })
//             })
//     },
//     async searchCities(text:string) {
//         const weatherService = new WeatherService();
//         const cities = weatherService.searchForCities(text)
//         return cities;
//     }
// };

// // Mutations
// const mutations = {
//     setDefaultCard(state, { card }) {
//         state.defaultCard = card
//     },
//     setCurrCard(state, { cityWeather }) {
//         state.currCard = cityWeather;
//     },

// };

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }
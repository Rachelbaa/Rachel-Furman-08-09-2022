// import { IFullCityData } from '@/interfaces/weather-data.interface';

// // State 
// const state = {
//     favorites: JSON.parse(localStorage.getItem('favorites') as string) || [] as IFullCityData[],
// };

// // Getters
// const getters = {
//     favorites:(state: { favorites: Object; }) => state.favorites
// };

// // Actions
// const actions = {
//     toggleFavorite:({ commit, state }:any,  currCard:object) => {
//         const cardIdx = state.favorites.findIndex((card: any) => card.locationData.Key === currCard.locationData.Key)
//         if (cardIdx > -1) {
//             commit('removeCardFromFavorites', cardIdx)
//             localStorage.setItem('favorites', JSON.stringify(state.favorites))
//         } else {
//             commit('addCardToFavorites', currCard)
//             localStorage.setItem('favorites', JSON.stringify(state.favorites))

//         }

//     }
// };

// // Mutations
// const mutations = {
//     addCardToFavorites(state:any, currCard:object) {
//         state.favorites.push(currCard)

//     },
//     removeCardFromFavorites(state:any , cardIdx:number) {
//         state.favorites.splice(cardIdx, 1)

//     }
// };

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }
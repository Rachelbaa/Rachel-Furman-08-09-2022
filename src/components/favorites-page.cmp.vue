<template>
  <perfect-scrollbar>
  <section class="favorites-page">
      <favorite-card v-for="(favoriteCity, idx) in getFavorites" :cityData="favoriteCity" :key="idx"></favorite-card>
  </section>
</perfect-scrollbar>
</template>

<script lang="ts">
import { IFullCityData } from '@/interfaces/weather-data.interface'
import favoriteCard from './favorite-card.cmp.vue'
export default {
  data() {
    return {
      favorites: [] as IFullCityData[]
    }
  },
  created() {
    this.favorites = this.$store.getters.favorites

  },
  computed: {
    getFavorites():IFullCityData[] {
      return this.$store.getters.favorites
    }
  },
  components: {
    favoriteCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
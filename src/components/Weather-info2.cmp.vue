<template>
    <section class="weather-info2">
        <div class="addF-container">
            <img v-if="reactiveIsFavorites" @click.prevent="toggleFav" src="../assets/icons/heart.png" alt="heart">
            <img v-else @click.prevent="toggleFav" src="../assets/icons/empty-heart.png" alt="empty-heart">
        </div>
        <div class="temp-container">
            <p v-if="tempType === 'c'">{{weatherCard.mainWeather.Temperature.Metric.Value}} °C </p>
            <p v-else>{{weatherCard.mainWeather.Temperature.Imperial.Value}} °F</p>
        </div>

        <SearchInput class="search-input"/>

    </section>

</template>

<script lang="ts">
import SearchInput from './Search-input.cmp.vue';

export default {
    name: "weather-info2",
    props: {
        weatherCard: {
            type: Object,
            required: true
        }
    },

    methods: {
        toggleFav() {
            this.$store.dispatch({ type: "toggleFavorite", currCard: this.weatherCard });
        },
        isFavorite(key?: string) {
            const searchBy = (key) ? key : this.weatherCard?.locationData?.Key;
            const favorites = this.$store.getters.favorites;
            if (this.weatherCard) {
                const cardIdx = favorites.findIndex((fav) => fav.locationData.Key === searchBy);
                return (cardIdx > -1) ? favorites[cardIdx] : false;
            }
        },
        isDefault(key?: string) {
            const card = JSON.parse(localStorage.getItem("defaultCard") as string);
            return (key === card.locationData.Key) ? card : false;
        }
    },
    computed: {
        tempType() {
            return this.$store.getters.tempType;
        },
        reactiveIsFavorites() {
            return this.isFavorite();
        },
    },
    components: { SearchInput }
}
</script>

<style lang="scss" scoped>
@import "./src/styles/setup/_mixins.scss";
@import "./src/styles/setup/_variables.scss";

.weather-info2 {
    display: flex;
    flex-direction: column;
    align-items: end;

    .addF-container {
        order: 0;
        position: absolute;
    }

    .temp-container {
        order: 2;
        position: absolute;
        bottom: 99px;
        right: 27px;
        font-size: 3rem;
    }

    .search-input {
        order: 1;
    }

    @include for-narrow-layout {
        .addF-container {
            order: 0;
            position: relative;
        }

        .temp-container {
            order: 1;
            font-size: 5rem;
            position: relative;
            top: 0;
            right: 0;
        }

        .search-input {
            order: 2;
        }

    }


    .addF-container {
        img {
            width: 35px;
            height: 35px;
            margin-top: 14px;
            cursor: pointer;
        }

        div {
            font-size: 0.8rem;
            cursor: pointer;
            margin: 17px 11px 10px 15px;
            width: 127.5px;

            &:hover {
                color: red;
            }
        }
    }

    .temp-container {
        margin: 5px 20px;
    }
}

</style>
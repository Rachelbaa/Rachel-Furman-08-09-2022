<template>
    <section class="weather-info">
        <div class="cityInfo-container">
            <p>{{weatherCard.locationData.LocalizedName}},
                <span>{{weatherCard.locationData.Country.LocalizedName}}</span>
            </p>
            <p class="date">{{setDate}}</p>
        </div>
        <div class="imageWeather-container">
            <img :src="require(`@/assets/icons/${weatherCard.mainWeather.WeatherIcon}.png`)"
                :alt="weatherCard.mainWeather.WeatherText">
            <p>{{weatherCard.mainWeather.WeatherText}}</p>
        </div>
    </section>
</template>

<script lang="ts">
    import moment from 'moment';
 
    export default {
      name: 'weather-info',
      props: {
        weatherCard: {
            type: Object,
            required: true
        }
      },
      computed: {
        setBgcColor() {
          let num = this.$store.getters.colorNum;
          return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
        },
        setDate() {
            let date = this.weatherCard.mainWeather.LocalObservationDateTime;
            return moment(date).format("LL");
        }
      }
    }
</script>

<style lang="scss" scoped>
    @import "./src/styles/setup/_mixins.scss";
    @import "./src/styles/setup/_variables.scss";

    .weather-info {
        margin-bottom: 60px;

        @include for-narrow-layout {
            margin-bottom: 0px;
        }

        .imageWeather-container {
            display: flex;
            flex-direction: column;

            img {
                margin: 10px 0px;
                width: 85px + 40px;
                float: left;
            }

            p {
                text-align: left;
                margin-left: 8px;
                font-size: 1.3rem;
            }
        }

        .cityInfo-container {
            text-align: left;
            margin-top: 7px;

            :first-child {
                font-size: 3rem;

                span {
                    font-size: 2.5rem;
                }
            }

            :last-child {
                font-size: 1.3rem;
            }
        }
    }
</style>
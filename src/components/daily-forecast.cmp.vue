<template>
    <section class="daily-forecaste" v-if="day">
        <h2>{{day}}</h2>
        <div class="temp-box" v-if="tempType === 'c'">
            <span>{{convertToC(weather.Temperature.Maximum.Value)}}° | {{convertToC(weather.Temperature.Minimum.Value)}}°</span>
        </div>
        <div class="temp-box" v-else>
            <span>{{weather.Temperature.Maximum.Value}}° | {{weather.Temperature.Minimum.Value}}°</span>
        </div>
        <div>
            <img v-if="isLight === 'Day'" :src="require(`@/assets/icons/${weather.Day.Icon}.png`)" alt="">
            <img v-else :src="require(`@/assets/icons/${weather.Night.Icon}.png`)" alt="">
        </div>
    </section>
</template>
    
<script lang="ts">

export default {
    name: 'daily-forecast',
    props: {
        weather: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            day: null,
            isLight: 'Day',

        }
    },
    created() {
        let hour = new Date().getHours();
        if (hour < 5 || hour > 19) {
            this.isLight = 'Night'
        }
        this.checkDay(new Date(this.weather.Date).getDay())
    },
    methods: {
        checkDay(num) {
            switch (num) {
                case 0:
                    this.day = "Sun";
                    break;
                case 1:
                    this.day = "Mon";
                    break;
                case 2:
                    this.day = "Tue";
                    break;
                case 3:
                    this.day = "Wed";
                    break;
                case 4:
                    this.day = "Thu";
                    break;
                case 5:
                    this.day = "Fri";
                    break;
                case 6:
                    this.day = "Sat";
                default:
                    this.day = "Happy Day";
            }
        },
        convertToC(num) {
            let c = (num - 32) * 5 / 9
            return Math.floor(c);
        },
    },
    computed: {
        tempType() {
           return this.$store.getters.tempType;
        }
    }

}
</script>
    
<style lang="scss" scoped>
    @import "./src/styles/setup/_mixins.scss";
    @import "./src/styles/setup/_variables.scss";

    .daily-forecaste {
    align-items: center;
    padding: 7px 20px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    img {
        width: 75px + 25px;
        margin-top: 0px;
    }
    
    @include for-narrow-layout {
        padding: 20px;
        text-align: center;
        flex-direction: column;
        img {
            margin-top: 20px;
        }
    }

    h2 {
        text-transform: uppercase;
    }


}
</style>
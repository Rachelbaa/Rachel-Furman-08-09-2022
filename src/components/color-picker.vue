<template>
    <section class="color-picker">
        <div v-for="option of 25" class="sky-gradient" @mouseover="hoverColor(option-1)"
            @mouseleave="unHoverColor" @click.prevent="setColor(option-1)" :class="optionNum(option-1)">
            {{formatTime(option-1)}}:00
        </div>
    </section>
</template>
    
<script lang="ts">

export default {
    name: 'color-picker',
    props: {

    },
    data() {
        return {
            currColor: null
        }
    },
    created() {
      this.currColor = this.$store.getters.colorNum;
    },
    methods: {
        optionNum(num: number): string | number {
            let className = 'sky-gradient-';
            className += (num < 10) ? `0${num}` : num;
            if (num <= 5 || num >= 20) {
                className += ' darkTheme'
            }
            return className;
        },
        formatTime(num: number): string | number {
            const time = (num < 10) ? `0${num}` : num;
            if (time === 24) return '00'
            return time
        },
        hoverColor(num:number) {
            this.$emit('hoverColor', num)
            this.$store.commit({type:'setColorNum',num})
        },
        unHoverColor() {
            this.$emit('unhoverColor')
            this.$store.commit({type:'setColorNum', num: this.currColor})
        },
        setColor(num) {
            this.currColor = num;
            let className = 'sky-gradient-';
            className += (num < 10) ? `0${num}` : num;
            if (num <= 5 || num >= 20) {
                className += ' darkTheme'
            }
            this.$emit('setedColor')
            this.$store.commit({ type: 'setBgc', color: className })
            this.$store.commit({ type: 'setColorNum', num })
        }
    }

}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
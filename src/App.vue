<template>
  <div id="app" >
    <ColorPicker @hoverColor="hoverColor" @unhoverColor="unhoverColor" class="colorPicker" @setedColor="closePicker" v-if="colorPickerClicked"></ColorPicker>
    <div class="app-container" :class="color">
      <header :class="setBgcColor">
        <svg class="navBar-icon" @click.prevent="colorPickerClicked = !colorPickerClicked" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 7h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1zm0 6h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1zm0 6h14c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1z" /></svg>
        <div class="temp-controller">
          <span :class="(clickedTemp ==='c')?'clickedTemp':''">°C</span>
          <el-switch @change="setTemp" v-model="clickedTemp" active-color="#3c3c3c54" inactive-color="#3c3c3c54" active-value="f"
            inactive-value="c"></el-switch>
          <span :class="(clickedTemp ==='f')?'clickedTemp':''">°F</span>
        </div>
        <!-- <p @click.prevent="colorPickerClicked = false">close</p> -->
        <nav>
          <router-link to="/">Weather</router-link>
          <router-link to="/favorites">Favorites</router-link>
        </nav>
      </header>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import ColorPicker from './components/color-picker.vue';


export default {
  name: "App",
  data() {
    return {
      clickedTemp: null,
      colorPickerClicked: false,
      color: ''
    };
  },
  created() {
    this.setFirstColor()
    this.clickedTemp = this.$store.getters.tempType;
  },
  methods: {
    setFirstColor() {
      let num = new Date().getHours()
      let className = 'sky-gradient-';
      className += (num < 10) ? `0${num}` : num;
      if (num <= 5 || num >= 20) {
        className += ' darkTheme'
      }
      // this.color = className;
      this.color = className;
      this.$store.commit({ type: 'setBgc', color: this.color })
      this.$store.commit({ type: 'setColorNum', num })
    },
    setColor(num:number) {
      let className = 'sky-gradient-';
      className += (num < 10) ? `0${num}` : num;
      if (num <= 5 || num >= 20) {
        className += ' darkTheme'
      }
      this.color = className;
    },
    async setTemp() {
      await this.$store.commit({type:'setTempType', temp: this.clickedTemp})

    },
    hoverColor(num:number) {
      this.setColor(num)
    },
    unhoverColor() {
      let bgc = this.$store.getters.bgc;
      this.color = bgc;
    },
    closePicker() {
      this.colorPickerClicked = false;
    }
  },
  computed: {
    setBgcColor():string {
      let num = this.$store.getters.colorNum;
      return (num <= 5 || num >= 20) ? 'darkTheme' : 'lightTheme';
    },

  },
  components: { ColorPicker }
}
</script>

<style>
</style>

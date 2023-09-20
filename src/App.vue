<script setup>
import {ref, onMounted, computed} from 'vue'
import {BASE_URL, KEY_API} from './constants/constants.js'
import {upperCaseOneSimbol} from './utils/index.js'

import Highlights from './components/Highlights.vue'
import WeatherSummary from './components/WeatherSummary.vue'
import Coords from './components/Coords.vue'
import Humidity from './components/Humidity.vue'

const city = ref('Stavropol');
const weatherData = ref(null);

const isError = computed(() => {
  return weatherData.value?.cod !== 200;
})

function getWeatherData() {
  fetch(`${BASE_URL}?q=${city.value}&units=metric&appid=${KEY_API}`)
  .then((response) => response.json())
  .then((data) => weatherData.value = data)
}

onMounted(getWeatherData)
</script>

<template>
  <div class="page">
      <main class="main">
        <div class="container" v-if="weatherData">
          <div class="laptop">
            <div class="sections">
              <section :class="['section', 'section-left', {'error-input': isError}]">
                <div class="info">
                  <div class="city-inner">

                    <input 
                    type="text" 
                    class="search"
                    v-model="city"
                    @keyup.enter="getWeatherData">

                  </div>

                  <WeatherSummary  v-if="!isError" :weatherData="weatherData"/>
                  <div v-else class="error">
                    <div class="error-title">
                      Oooops, something went wrong
                    </div>
                    <div class="error-message">

                        {{ upperCaseOneSimbol(weatherData?.message) }}
                      
                    </div>
                  </div>
                </div>
              </section>
              <section class="section section-right" v-if="!isError">

                <Highlights :weatherData="weatherData"/>

              </section> 
            </div>
            <div class="sections" v-if="!isError">
              <section class="section-bottom">
                <div class="block-bottom">

                  <Coords :coord="weatherData.coord"/>

                </div>
              </section>
              <section class="section-bottom">
                <div class="block-bottom">

                 <Humidity :humidity="weatherData.main.humidity"/>

                </div>

              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>

<style lang="sass" scoped>
@import './assets/styles/main.sass'
.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px 0
  background-color: #59585d

.laptop
  width: 100%
  padding: 20px
  background-color: #0e100f
  border-radius: 25px

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-left
  width: 30%
  padding-right: 10px

  @media (max-width: 767px)
    width: 100%
    padding-right: 0

  &.error-input
    min-width: 235px
    width: auto

.section-right
  width: 70%
  padding-left: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0

.city-inner
  position: relative
  display: inline-block
  width: 100%

  &::after
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('./assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('./assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: $white
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

.section-bottom
  width: 50%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%

.error
  &-title
    font-size: 18px
    font-weight: 600
    padding-top: 5px
    padding-bottom: 10px

  &-message
    font-size: 14px
</style>

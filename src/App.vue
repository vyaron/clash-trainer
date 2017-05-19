<template>
  <div id="app">
    <transition name="slide-fade" appear>
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style src="./App.scss" lang="scss" ></style>

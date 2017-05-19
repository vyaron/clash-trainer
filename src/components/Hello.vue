<template>
  <div class="hello">
  
    <h2 class="animated pulse">Clash Trainer</h2>
    <h4 class="animated tada">Clashing was never Easier</h4>
  
    <img src="static/img/logo.png">
    <!--<img src="../assets/cards.png">-->
    <nav>
      <a @click="gling"
         class="btn animated pulse">Build your Deck now!</a>
    </nav>
    <!--<img src="static/img/cards.png">-->
  
    <img class="img-champion animated swing"
         src="static/img/champion.png">
  
    <p>Setup your ultimate deck
      <br/> and train yourself for
      <br/> the real battle out there</p>
  </div>
</template>

<script>
import CardService from '../services/CardService'

export default {

  name: 'hello',
  data() {
    return {

    }
  },
  created() {
    // getting the cards here only to kick img preloading
    CardService.getCards();
    CardService.audio.lose.play();
  },
  methods: {
    gling() {
      CardService.audio.btn.play();
      this.$router.push('/deck-edit');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../css/layout';
.hello {
  height: 100%;
  font-size: 2em;
  line-height: 1.5em;
  @include for-mobile-only {
    font-size: 1em;
  }
  
}
@include for-mobile-only {
  .hello img {
    max-width: 300px;
  }
}
nav {
  margin: 2em;
}

p {
  margin-bottom: 2em;
}

.img-champion {
   @include for-mobile-only {
    max-height: 100px;
  }
  
  animation-delay: 1s;
}

.btn {
  animation-delay: 2s;
}

h4 {
  color: lightgray;
}

</style>

<template lang="html">

  <section class="card-filter flex">
      <label>
        By Type
        <select v-model="cardsFilter.byType">
          <option value="">All</option>
          <option v-for="cardType of cardTypes" >{{cardType}}</option>
        </select>
      </label>
      <label>
        Max Arena
        <select v-model.number="cardsFilter.byArena">
          <option value="">All</option>
          <option v-for="(_, i) of arenas" >{{i}}</option>
        </select>
      </label>
      <br><br>
      <label>
        
        <input type="number" v-model.number="cardsFilter.byMaxCost" placeholder="By Max Cost">
      </label>
      <label>
        <input type="text" v-model="cardsFilter.byName" placeholder="By Names">
      </label>
      
  </section>

</template>

<script lang="js">

  import CardService from '../services/CardService'

  export default  {
    name: 'card-filter',
    props: [],
    created() {
      CardService.getCardTypes().then(cardTypes => {
        this.cardTypes = cardTypes;
      });
    },
    mounted() {

    },
    data() {
      return {
        cardsFilter: {byName: '', byType: '', byArena: '', byMaxCost: ''},
        cardTypes: [],
        arenas: new Array(11)
      }
    },
    methods: {
    },
    watch: {
      cardsFilter: {
        handler: function(newFilter) {
                  console.log('this.filter', newFilter);
                  this.$emit('change', newFilter)
                },
        deep: true
      }
    }
}
</script>

<style scoped lang="scss">
  .card-filter {
    padding: 1em;
    label {
      display: inline-block;
    }
    background-color: rgba(3, 3, 3, 0.2);


    input {
      background: #333;
      color: #ccc;
      max-width: 150px;
      padding: 6px 10px;
      border-radius: 20px;
      box-shadow: 0 1px 0 #ccc inset;
      transition:500ms all ease;
    }
  }
</style>

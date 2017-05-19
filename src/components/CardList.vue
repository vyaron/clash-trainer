<template lang="html">

  <section class="card-list full-height">
    <h4>Showing {{cards.length}} Cards</h4>
       <transition-group name="list" class="full-height flex">
        <card v-for="card in cards" :key="card._id" :card="card" mode="preview" :class="{animated: card.selected, pulse : card.selected}"
            @click.native="toggleCardSelection(card._id, this)" >
        
         </card>
         </transition-group>

      
    
  </section>

</template>

<script lang="js">
import Card from './Card';

  export default  {
    name: 'card-list',
    props: ['cards'],
    mounted() {

    },
    data() {
      return {
      
      }
    },
    methods: {
      toggleCardSelection (cardId, el) {
        // console.log('el', el);
        this.$emit('toggle', {cardId});
      }
    },
    computed: {

    },
    components: {
        Card
    }
}
</script>

<style scoped lang="scss">
  .card-list {
    background-color: #0067c4;
    /*.card.selected {
        color: red;
    }*/
  }
.list-move {
  transition: transform 1s;
}
.list-enter-active, .list-leave-active {
  transition: all 2s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
</style>

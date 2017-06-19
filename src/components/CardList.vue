<template lang="html">

  <section class="card-list full-height">
    <h4>Showing {{cards.length}} Cards</h4>
       <transition-group name="list" class="full-height flex">
        <card v-for="card in cards" :key="card._id" :card="card" mode="preview" :class="{animated: card.selected, pulse : card.selected}"
            @click.native="toggleCardSelection(card._id)" >
        
         </card>
         </transition-group>

      
    
  </section>

</template>

<script lang="js">
import Card from './Card';

  export default  {
    name: 'card-list',
    props: ['cards'],
    methods: {
      toggleCardSelection (cardId) {
        this.$emit('toggle', {cardId});
      }
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
  transition: transform 2s;
  transition-delay: 2s;
}
.list-enter-active, .list-leave-active {
  transition: all 3s;
}
.list-enter, .list-leave-to  {
  opacity: 0;
  // transform: translateY(10px);
  transform: translateX(200px);
}
</style>

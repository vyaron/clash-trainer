<template>
    <section class="deck-view">
        <h1>Deck View!</h1>
            <article v-for="card in cards" class="flex">

              <img :src="`static/img/cards/${card.idName}.png`" />
              <section>
                <h4 class="card-name">{{ card.name }}</h4>
                <p class="card-cost"><span>{{ card.elixirCost }}</span></p>
                <p>{{card.description}}</p>
              </section>


            </article>

    </section>
</template>


<script>
import CardService from '../services/CardService.js'

export default {
    data(){
        return {
            cards: []
        }
    },
    created() {
        this.cards = CardService.getDeck()
        console.log(this.cards);
    }    
}


</script>

<style lang="scss" scoped>
.deck-view {
    img {
        max-height:120px;
    }
}

</style>
<template lang="html">
  <section class="deck-edit" v-cloak>
    <section class="deck-preview ">
      <transition-group name="list" class="flex" >
        <card v-for="card in selectedCards" 
              :key="card._id" 
              :card="card" 
              mode="deck-preview"
              @click.native="showInfo(card)"></card>  
      </transition-group>
    </section>
    <section class="deck-summary" v-if="deckReady">
        <hr />
        <h3>Average Elixir Cost: <span>{{avgElixirCost}}</span></h3>
        <button @click="showReviewModal" class="btn">Quick Review</button>
        <button @click="goPlay" class="btn btn-primary">Fight!</button>
        
        <img class="img-champion animated swing" src="static/img/champion.png">
        <a @click="newDeck">New Deck</a>
    </section>
    <card-filter v-if="!deckReady" @change="applyFilter"></card-filter>
    <card-list v-if="!deckReady" :cards="cardsToShow" @toggle="toggleCardSelection"></card-list>
  </section>

</template>

<script lang="js">
  import CardService from '../services/CardService'
  import CardFilter from './CardFilter'
  import CardList from './CardList'
  import Card from './Card'
  export default  {

    name: 'deck-edit',
    props: [],
    created() {
      CardService.getCards().then( cards => this.cards = cards )
    },
    mounted() {
      
    },
    data() {
      return {
        cards: [],
        filter: null,
      }
    },
    methods: {
      
      applyFilter(filter) {
        this.filter = filter;
      },
     toggleCardSelection (ev) {
        const card = this.cards.find(card => card._id === ev.cardId)

        if (!card.selected && this.selectedCards.length < 8) {
            card.selected = !card.selected;
            CardService.audio.count[this.selectedCards.length].play();
        } else {
          card.selected = false;
          CardService.audio.btn.play();
        }
     },
     showInfo(card) {
       CardService.audio.btn.play();
        swal({
          title: `${card.name}`,
          text: `
              <section class="popup-content">
                <h4>(${card.rarity} ${card.type})</h4>
                <article>${card.description}</article>
              </section>`,
          imageUrl: card.imgUrl,
          html:true
        });
     },
     showReviewModal() {
       CardService.audio.btn.play();
        const review = CardService.analyzeDeck(this.selectedCards)
        const body = '<ol>' + review.tips.map(tip => `<li> ${tip.txt} </li>`).join('\n') + '</ol>'
        swal({
          title: `Deck Review`,
          text: `
              <section class="popup-content">
                <h4>Avg Cost: ${review.avgCardCost}</h4>
                <article>
                ${body}
                </article>
              </section>`,
          imageUrl: 'static/img/logo/cards144.png',
          html:true
        });
      },
      goPlay() {
        CardService.audio.btn.play();
        this.$router.push('/deck-play');

      },
      newDeck() {
        this.cards = this.cards.map(card => {
          card.selected = false;
          return card;
        })
      }
    },
      

    computed: {
      cardsToShow() {
        if (!this.filter) return this.cards;
        else return CardService.filterCards(this.cards, this.filter)
        
      },
      selectedCards() {
        return this.cards.filter(card => card.selected);
      },
      deckReady() {
        return this.selectedCards.length === 8
      },
      avgElixirCost() {
          const res = this.cards.reduce((acc, card) => {
            if (card.selected) {
                acc.sum += card.elixirCost
                acc.count++;
            }
            return acc;
          }, {sum: 0, count: 0});
          return Number(res.sum / res.count).toFixed(1);
      }
    },
    watch: {
        deckReady(isReady) {
            if (isReady) {
                setTimeout(() => CardService.audio.ready.play(), 1000);
                CardService.saveDeck(this.selectedCards);
            }
        }
    },
    components: {
      CardList,
      CardFilter,
      Card
    }
}
</script>

<style scoped lang="scss" >
@import '../css/layout';
.deck-edit {

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter,
  .list-leave-to/* .list-leave-active for <2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }

  .deck-summary {
    > h3 > span {
      color:antiquewhite;
    }
  }
  .img-champion {
    display: block;
    margin:auto;
    margin-top: 2em;
    @include for-mobile-only {
      max-height: 20vh;
    }
    
  }
}



</style>

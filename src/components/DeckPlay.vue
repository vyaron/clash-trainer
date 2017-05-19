<template lang="html">
  <section class="deck-play">
    <section class="board flex" >
        <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOutUp">
            <div v-if="op.currCard" class="board-card op-card" >
                <img :src="op.currCard.imgUrl" />
            </div>
        </transition>
        <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOutUp">
            <div v-if="me.currCard" class="board-card me-card">
                <img :src="me.currCard.imgUrl" />
            </div>
        </transition>
    </section>
    <section class="deck">
        <div class="flex">
            <img v-for="card in cards" :key="card._id"  
                    @click="placeCard(card)" 
                    :src="card.imgUrl" />
        </div>
    </section>
  </section>

</template>

<script lang="js">
import 'sweetalert'; 
import CardService from '../services/CardService';
import Card from './Card';


function drawOpCard(op) {
    // console.log('drawOpCard: op.cards', op.cards);
    op.currCard = op.cards.pop();
    if (!op.currCard) return false;
    CardService.audio.opAttack.play();
    return true;
}


  export default  {
    name: 'deck-play',
    props: [],
    data() {
      return {
        cards: CardService.getDeck(),
        op: {},
        me: {health: 7, currCard: null, currCardHealth: 0},
        isGameOn: false
      }
    },
    created() {
        CardService.audio.bg.play();

        CardService.getRandomOp().then(op => {
            this.op = op;
            setTimeout(()=> {
                drawOpCard(this.op)
                this.isGameOn = true;
            }, 1000);
            
        })
    },
    
    methods: {
      placeCard(card) {

        if (!this.isGameOn) return;
        this.isGameOn = false;
        this.me.currCard = card;
        CardService.audio.meAttack.play();

        const res = CardService.analyzeMove(this.op.currCard, this.me.currCard, this.cards);
        this.cards.splice(this.cards.indexOf(card), 1);  
        
        // Give the user feedback for move
        setTimeout(() => {
            swal({
                title: res.txt,
                imageUrl: (res.betterCard)? res.betterCard.imgUrl : card.imgUrl,
                timer: 2000
            });
            setTimeout(() => {
                this.me.currCard = null;
                this.op.currCard = null;
                setTimeout(() => {
                    const opCard = drawOpCard(this.op);
                    if (opCard) this.isGameOn = true;
                    else this.gameOver();
                }, 2000);
            }, 1500)
            
        }, 1000);

      },
       gameOver() {
           this.isGameOn = false;
            if (Math.random() > 0.5)        CardService.audio.win.play();
            else                            CardService.audio.lose.play();
            swal({
                title: 'You need more Practice...',
                imageUrl: 'static/img/super-magical-chest.png',
                timer: 3000
            });
            setTimeout(() => {
                CardService.audio.bg.pause();
                this.$router.push('/');

            }, 3000);
        } 
    },
   
    components: {
        Card
    }
}
</script>

<style scoped lang="scss" >
@import '../css/layout';
.deck-play {
    height: 100vh;
    background-image: url('https://coding-academy.net/clash/static/img/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .deck {
        height: 25vh;
        background-color: rgba(4, 4, 4, 0.5);
        h2 {
            color: darkgreen;
            font-size: 2em;
            font-weight: bold;
        }
        img {
            cursor: pointer;
            max-height: 200px;
            margin-top: 3px;
            @include for-mobile-only {
                max-height: 91px;
            }
        }
    }

    .board {
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        @include for-mobile-only {
            img {
                max-width: 150px;
            }
        }
        .board-card {

            &.op-card {
                transform: rotate(15deg);
            }
            &.me-card {
                transform: rotate(-15deg);
            }
        }
    }
}
</style>

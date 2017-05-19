<template lang="html">

  <section class="deck-play">
    <!--<div class="popup">
        <h1>Game On!</h1>
        <h2>You ({{me.health}}) vs {{op.name}} ({{op.health}})</h2>
    </div>-->
    <section class="opInfo" >
        {{op.name}} {{op.health}}&hearts;
    </section>

    <section class="board flex" >
        <div v-if="op.currCard" class="board-card op-card" >
            <h2>{{ op.currCard.name }}</h2>
            <img :src="`http://www.clashapi.xyz/images/cards/${op.currCard.idName}.png`" />
            <h6>Card Health: {{op.currCardHealth}}</h6>
        </div>
        <div v-if="me.currCard" class="board-card me-card">
            <h2>{{ me.currCard.name }}</h2>
            <img :src="`http://www.clashapi.xyz/images/cards/${me.currCard.idName}.png`" />
            <h6>Card Health: {{me.currCardHealth}}</h6>
        </div>
    </section>
    <section class="deck">
        <h2>{{me.health}}&hearts;</h2>
        <img v-for="card in cards" :key="card._id"  
                @click="placeCard(card)" 
                :src="`http://www.clashapi.xyz/images/cards/${card.idName}.png`" />
    </section>
  </section>

  

</template>

<script lang="js">




import CardService from '../services/CardService'
import Card from './Card';


function drawOpCard(op) {
    console.log('drawOpCard: op.cards', op.cards);
    op.currCard = op.cards.pop();
    if (!op.currCard) return false;
    op.currCardHealth = op.currCard.elixirCost;
    op.currCard.audio.play();
    return true;
}



  export default  {
    name: 'deck-play',
    props: [],
    data() {
      return {
        cards: CardService.getDeck(),
        op: {},
        me: {health: 7, currCard: null, currCardHealth: 0}
      }
    },
    created() {
       
        // CardService.audio.bg.play();

        CardService.getRandomOp().then(op => {
            this.op = op;
        })
    },
    mounted() {

        const gameOver = () => {
            clearInterval(gameInterval);
            if (this.op.health === 0)   CardService.audio.win.play();
            else                        CardService.audio.lose.play();
        }
        
        const gameInterval = setInterval(()=>{


        if (!this.op.currCard) {
            console.log('DRAWING OP');
            const success = drawOpCard(this.op);
            if (!success){
                //gameOver();
            }
        }   



        function hit(p1, p2) {
            var p2Hit = 0;
            if (p1.currCard) {
                p2Hit = p1.currCard.offense / 10;
                if (p2.currCard) {
                    p2Hit = Math.max(0,(p1.currCard.offense-p2.currCard.defense) /10);
                }
                if (--p1.currCardHealth === 0) {
                    console.log('Card ENDED');
                    p1.currCard = null;
                }
            }
            p2.health = Math.max(0, Number(p2.health - p2Hit).toFixed(1));
            if (p2.health === 0) {
                gameOver();
            }
        }

        hit(this.op, this.me);
        hit(this.me, this.op);

        }, 1000);
    },
    
    methods: {
      imgUrl: function (path) {
        return images(path)
      },
      placeCard(card) {
        this.cards.splice(this.cards.indexOf(card), 1);  
        this.me.currCard = card;
        this.me.currCardHealth = card.elixirCost;
        // this.me.currCard.audio.play();
        CardService.audio.attack.play();

      }
    },
    computed: {

    },
    components: {
        Card
    }
}
</script>

<style scoped lang="scss" >
// @import '../css/layout';
.deck-play {
    height: 100vh;
    // display:flex;
    // flex-flow: column nowrap;
    // TODO
    background-image: url('http://localhost:8080/static/img/bg.jpg');  
    background-size:     cover;                  
    background-repeat:   no-repeat;
    background-position: center center;        

    .opInfo {
        height: 2vh;
        background-color: rgba(4, 4, 4, 0.5);
        padding: .5em;
        color:lightsalmon;
        font-size: 2em;
    }
    .deck {
        height: 25vh;
        h2 {
            color:darkgreen;
            font-size: 2em;
            font-weight: bold;
        }
        img {
            width:30%;
            max-width: 215px;
            height:auto;
        }
    }  
    .board {
        height: 73vh;
        outline:1px solid red;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
            // width:45%;
        }
        //   background-color: brown;
        .board-card {
            color:pink;
                h2 {
                    position: relative;
                    top:20px;
                }
                &.op-card {
                    transform: rotate(-15deg);
                    border-color: darkred;
                    color:darkred
                }
                &.me-card {
                    transform: rotate(15deg);
                    border-color: green;
                    color:green;
                }

        }
        .myCard {
            // background-color:lightgreen;
        }
    }
    
}
  
</style>

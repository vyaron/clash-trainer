let cards = null;

const imgs = [];

const audio = {
    ready :  new Audio('static/audio/ready.ogg'),
    bg :  new Audio('static/audio/bg.ogg'), 
    win :  new Audio('static/audio/win.mp3'), 
    lose :  new Audio('static/audio/lose.mp3'),
    opAttack :  new Audio('static/audio/attack1.mp3'),
    meAttack :  new Audio('static/audio/attack2.mp3'),
    btn :  new Audio('static/audio/gling.mp3'),
    count: []
};
for (let i=1; i<=8; i++) {
    audio.count[i] = new Audio(`static/audio/count/${i}.mp3`)
}

window.audio = audio;

// const knownCards = ['arrows', 'bomber', 'archers', 'goblin', 'giant'];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCards = () => {
    if (cards) return Promise.resolve(cards);
    // return fetch('http://www.clashapi.xyz/api/cards')
    return fetch('static/data/cards.json')
                .then(res => res.json())
                .then(res => {

                    // res = res.filter(card => knownCards.includes(card.idName));

                    cards = res.map(card => {
                        card.imgUrl = `static/img/cards/${card.idName}.png`;
                        card.selected = false;
                        // Preloading the images
                        const img = new Image()
					    img.src = card.imgUrl;
                        imgs.push(img);
                        return card;
                    });
                    return cards;
                })
                
}

const getDeck = () => {
    if (localStorage.deck) {
        return JSON.parse(localStorage.deck);
    } 
    else return [];
}

const saveDeck = deck => {
    localStorage.deck = JSON.stringify(deck);
}

const getRandomFromArr = (arr) => {
    const item = arr[Math.floor(Math.random()*arr.length)];
    return item;
}

const getRandomOp = () => {
    const op = {name: 'Fat Bastard', health: 7, cards: []}
    return getCards().then(cards => {
        op.cards = Array(4).fill().map(() => getRandomFromArr(cards));
        op.currCard = null;
        op.currCardHealth = 0;
        // console.log('op is ready', op);
        return op;
    })

}

const getCardTypes = () => {
    return getCards().then(cards => Array.from(
            cards.reduce((acc, card) => acc.add(card.type), new Set()).values()))
}

const filterCards = (cards, cardsFilter) => {
    return cards.filter(card => {
            
            return card.name.toLowerCase().includes(cardsFilter.byName.toLowerCase()) &&
                    (!cardsFilter.byType || cardsFilter.byType === card.type) &&
                    (cardsFilter.byArena === '' || cardsFilter.byArena >= card.arena) && 
                    (cardsFilter.byMaxCost === '' || cardsFilter.byMaxCost >= card.elixirCost) 
                    
    })
}

const analyzeDeck = deck => {
  return {
    avgCardCost: 4,
    score: 8,
    tips: [
      {
        txt: 'Better have something against flying troops',
        level: 'warning'
      },
      {
        txt: 'It is recommended to have at least two spells',
        level: 'info'
      },
      {
        txt: 'Your deck is costly!',
        level: 'info'
      }      
    ]
  };
}

const analyzeMove = (opCard, meCard, currDeck) => {
    const analyze =  {score: 90, txt: 'Best Move!', betterCard: null}
    const betterCard = currDeck[Math.floor(Math.random()*currDeck.length)];        

    if (Math.random() > 0.5 && betterCard !== meCard) {
        analyze.score = 60;
        
        analyze.betterCard = betterCard;
        analyze.txt = `${betterCard.name} would be a better choice!`
    }

    return analyze;

}

export default {
    getCards,
    getDeck,
    saveDeck,
    getRandomOp,
    audio,
    getCardTypes,
    filterCards,
    analyzeDeck,
    analyzeMove
}
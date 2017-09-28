webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let cards = null;

const imgs = [];

const audio = {
    ready: new Audio('static/audio/ready.ogg'),
    bg: new Audio('static/audio/bg.ogg'),
    win: new Audio('static/audio/win.mp3'),
    lose: new Audio('static/audio/lose.mp3'),
    opAttack: new Audio('static/audio/attack1.mp3'),
    meAttack: new Audio('static/audio/attack2.mp3'),
    btn: new Audio('static/audio/gling.mp3'),
    count: []
};
for (let i = 1; i <= 8; i++) {
    audio.count[i] = new Audio(`static/audio/count/${i}.mp3`);
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
    return fetch('static/data/cards.json').then(res => res.json()).then(res => {

        // res = res.filter(card => knownCards.includes(card.idName));

        cards = res.map(card => {
            card.imgUrl = `static/img/cards/${card.idName}.png`;
            card.selected = false;
            // Preloading the images
            const img = new Image();
            img.src = card.imgUrl;
            imgs.push(img);
            return card;
        });
        return cards;
    });
};

const getDeck = () => {
    if (localStorage.deck) {
        return JSON.parse(localStorage.deck);
    } else return [];
};

const saveDeck = deck => {
    localStorage.deck = JSON.stringify(deck);
};

const getRandomFromArr = arr => {
    const item = arr[Math.floor(Math.random() * arr.length)];
    return item;
};

const getRandomOp = () => {
    const op = { name: 'Fat Bastard', health: 7, cards: [] };
    return getCards().then(cards => {
        op.cards = Array(4).fill().map(() => getRandomFromArr(cards));
        op.currCard = null;
        op.currCardHealth = 0;
        // console.log('op is ready', op);
        return op;
    });
};

const getCardTypes = () => {
    return getCards().then(cards => Array.from(cards.reduce((acc, card) => acc.add(card.type), new Set()).values()));
};

const filterCards = (cards, cardsFilter) => {
    return cards.filter(card => {

        return card.name.toLowerCase().includes(cardsFilter.byName.toLowerCase()) && (!cardsFilter.byType || cardsFilter.byType === card.type) && (cardsFilter.byArena === '' || cardsFilter.byArena >= card.arena) && (cardsFilter.byMaxCost === '' || cardsFilter.byMaxCost >= card.elixirCost);
    });
};

const analyzeDeck = deck => {
    return {
        avgCardCost: 4,
        score: 8,
        tips: [{
            txt: 'Better have something against flying troops',
            level: 'warning'
        }, {
            txt: 'It is recommended to have at least two spells',
            level: 'info'
        }, {
            txt: 'Your deck is costly!',
            level: 'info'
        }]
    };
};

const analyzeMove = (opCard, meCard, currDeck) => {
    const analyze = { score: 90, txt: 'Best Move!', betterCard: null };
    const betterCard = currDeck[Math.floor(Math.random() * currDeck.length)];

    if (Math.random() > 0.5 && betterCard !== meCard) {
        analyze.score = 60;

        analyze.betterCard = betterCard;
        analyze.txt = `${betterCard.name} would be a better choice!`;
    }

    return analyze;
};

/* harmony default export */ __webpack_exports__["a"] = ({
    getCards,
    getDeck,
    saveDeck,
    getRandomOp,
    audio,
    getCardTypes,
    filterCards,
    analyzeDeck,
    analyzeMove
});

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(19)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(35),
  /* scopeId */
  "data-v-314ace06",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Hello__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Hello___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Hello__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_DeckEdit__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_DeckEdit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_DeckEdit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_DeckPlay__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_DeckPlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_DeckPlay__);






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Hello',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Hello___default.a
  }, {
    path: '/deck-edit',
    name: 'DeckEdit',
    component: __WEBPACK_IMPORTED_MODULE_3__components_DeckEdit___default.a
  }, {
    path: '/deck-play',
    name: 'DeckPlay',
    component: __WEBPACK_IMPORTED_MODULE_4__components_DeckPlay___default.a
  }]
}));

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(24)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(40),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'card',
  props: ['card', 'mode']
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_CardService__ = __webpack_require__(2);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'card-filter',
  props: [],
  created() {
    __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].getCardTypes().then(cardTypes => {
      this.cardTypes = cardTypes;
    });
  },
  data() {
    return {
      cardsFilter: { byName: '', byType: '', byArena: '', byMaxCost: '' },
      cardTypes: [],
      arenas: new Array(11)
    };
  },
  watch: {
    cardsFilter: {
      handler: function (newFilter) {
        console.log('this.filter', newFilter);
        this.$emit('change', newFilter);
      },
      deep: true
    }
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Card__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'card-list',
  props: ['cards'],
  methods: {
    toggleCardSelection(cardId) {
      this.$emit('toggle', { cardId });
    }
  },
  components: {
    Card: __WEBPACK_IMPORTED_MODULE_0__Card___default.a
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_CardService__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardFilter__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardFilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CardFilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CardList__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CardList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__CardList__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card__);






/* harmony default export */ __webpack_exports__["default"] = ({

  name: 'deck-edit',
  props: [],
  created() {
    __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].getCards().then(cards => this.cards = cards);
  },
  mounted() {},
  data() {
    return {
      cards: [],
      filter: null
    };
  },
  methods: {

    applyFilter(filter) {
      this.filter = filter;
    },
    toggleCardSelection(ev) {
      const card = this.cards.find(card => card._id === ev.cardId);

      if (!card.selected && this.selectedCards.length < 8) {
        card.selected = !card.selected;
        __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.count[this.selectedCards.length].play();
      } else {
        card.selected = false;
        __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.btn.play();
      }
    },
    showInfo(card) {
      __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.btn.play();
      swal({
        title: `${card.name}`,
        text: `
              <section class="popup-content">
                <h4>(${card.rarity} ${card.type})</h4>
                <article>${card.description}</article>
              </section>`,
        imageUrl: card.imgUrl,
        html: true
      });
    },
    showReviewModal() {
      __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.btn.play();
      const review = __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].analyzeDeck(this.selectedCards);
      const body = '<ol>' + review.tips.map(tip => `<li> ${tip.txt} </li>`).join('\n') + '</ol>';
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
        html: true
      });
    },
    goPlay() {
      __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.btn.play();
      this.$router.push('/deck-play');
    },
    newDeck() {
      this.cards = this.cards.map(card => {
        card.selected = false;
        return card;
      });
    }
  },

  computed: {
    cardsToShow() {
      if (!this.filter) return this.cards;else return __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].filterCards(this.cards, this.filter);
    },
    selectedCards() {
      return this.cards.filter(card => card.selected);
    },
    deckReady() {
      return this.selectedCards.length === 8;
    },
    avgElixirCost() {
      const res = this.cards.reduce((acc, card) => {
        if (card.selected) {
          acc.sum += card.elixirCost;
          acc.count++;
        }
        return acc;
      }, { sum: 0, count: 0 });
      return Number(res.sum / res.count).toFixed(1);
    }
  },
  watch: {
    deckReady(isReady) {
      if (isReady) {
        setTimeout(() => __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.ready.play(), 1000);
        __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].saveDeck(this.selectedCards);
      }
    }
  },
  components: {
    CardList: __WEBPACK_IMPORTED_MODULE_2__CardList___default.a,
    CardFilter: __WEBPACK_IMPORTED_MODULE_1__CardFilter___default.a,
    Card: __WEBPACK_IMPORTED_MODULE_3__Card___default.a
  }
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_CardService__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Card__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Card__);





function drawOpCard(op) {
    // console.log('drawOpCard: op.cards', op.cards);
    op.currCard = op.cards.pop();
    if (!op.currCard) return false;
    __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.opAttack.play();
    return true;
}

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'deck-play',
    props: [],
    data() {
        return {
            cards: __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].getDeck(),
            op: {},
            me: { health: 7, currCard: null, currCardHealth: 0 },
            isUserTurn: false
        };
    },
    created() {
        __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.bg.play();

        __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].getRandomOp().then(op => {
            this.op = op;
            setTimeout(() => {
                drawOpCard(this.op);
                this.isUserTurn = true;
            }, 1000);
        });
    },

    methods: {
        placeCard(card) {

            if (!this.isUserTurn) return;
            this.isUserTurn = false;
            this.me.currCard = card;
            __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.meAttack.play();

            const res = __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].analyzeMove(this.op.currCard, this.me.currCard, this.cards);
            this.cards.splice(this.cards.indexOf(card), 1);

            // Give the user feedback for move
            setTimeout(() => {
                swal({
                    title: res.txt,
                    imageUrl: res.betterCard ? res.betterCard.imgUrl : card.imgUrl,
                    timer: 2000
                });
                setTimeout(() => {
                    this.me.currCard = null;
                    this.op.currCard = null;
                    setTimeout(() => {
                        const opCard = drawOpCard(this.op);
                        if (opCard) this.isUserTurn = true;else this.gameOver();
                    }, 2000);
                }, 1500);
            }, 1000);
        },
        gameOver() {
            this.isUserTurn = false;
            if (Math.random() > 0.5) __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.win.play();else __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.lose.play();
            swal({
                title: 'You need more Practice...',
                imageUrl: 'static/img/super-magical-chest.png',
                timer: 3000
            });
            setTimeout(() => {
                __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.bg.pause();
                this.$router.push('/');
            }, 3000);
        }
    },

    components: {
        Card: __WEBPACK_IMPORTED_MODULE_1__Card___default.a
    }
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_CardService__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({

  name: 'hello',
  created() {
    // getting the cards here only to kick img preloading
    __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].getCards();
    __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.lose.play();
  },
  methods: {
    gling() {
      __WEBPACK_IMPORTED_MODULE_0__services_CardService__["a" /* default */].audio.btn.play();
      this.$router.push('/deck-edit');
    }
  }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sweetalert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(8);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.







__WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].config.productionTip = false;

// Audio.prototype.play = ()=>console.log('playing');
// navigator.serviceWorker.register('sw.js');

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_2__App___default.a }
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(39),
  /* scopeId */
  "data-v-d0dfa1c4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(20)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(36),
  /* scopeId */
  "data-v-4dbafcc4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(22)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  "data-v-75d8fcc9",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(41),
  /* scopeId */
  "data-v-f351161a",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(21)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(37),
  /* scopeId */
  "data-v-509e75cc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', {
    staticClass: "card",
    class: [{
      'selected': _vm.card.selected
    }, _vm.mode]
  }, [_c('img', {
    attrs: {
      "src": _vm.card.imgUrl
    }
  }), _vm._v(" "), _c('h4', {
    staticClass: "card-name"
  }, [_vm._v(_vm._s(_vm.card.name))]), _vm._v(" "), _c('p', {
    staticClass: "card-cost"
  }, [_c('span', [_vm._v(_vm._s((_vm.mode === 'preview' && _vm.card.selected) ? '✔' : _vm.card.elixirCost))])])])
},staticRenderFns: []}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "card-list full-height"
  }, [_c('h4', [_vm._v("Showing " + _vm._s(_vm.cards.length) + " Cards")]), _vm._v(" "), _c('transition-group', {
    staticClass: "full-height flex",
    attrs: {
      "name": "list"
    }
  }, _vm._l((_vm.cards), function(card) {
    return _c('card', {
      key: card._id,
      class: {
        animated: card.selected, pulse: card.selected
      },
      attrs: {
        "card": card,
        "mode": "preview"
      },
      nativeOn: {
        "click": function($event) {
          _vm.toggleCardSelection(card._id)
        }
      }
    })
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  }, [_c('h2', {
    staticClass: "animated pulse"
  }, [_vm._v("Clash Trainer")]), _vm._v(" "), _c('h4', {
    staticClass: "animated tada"
  }, [_vm._v("Clashing was never Easier")]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "static/img/logo.png"
    }
  }), _vm._v(" "), _c('nav', [_c('a', {
    staticClass: "btn animated pulse",
    on: {
      "click": _vm.gling
    }
  }, [_vm._v("Build your Deck now!")])]), _vm._v(" "), _c('img', {
    staticClass: "img-champion animated swing",
    attrs: {
      "src": "static/img/champion.png"
    }
  }), _vm._v(" "), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("Setup your ultimate deck\n    "), _c('br'), _vm._v(" and train yourself for\n    "), _c('br'), _vm._v(" the real battle out there")])
}]}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "deck-edit"
  }, [_c('section', {
    staticClass: "deck-preview "
  }, [_c('transition-group', {
    staticClass: "flex",
    attrs: {
      "name": "list"
    }
  }, _vm._l((_vm.selectedCards), function(card) {
    return _c('card', {
      key: card._id,
      attrs: {
        "card": card,
        "mode": "deck-preview"
      },
      nativeOn: {
        "click": function($event) {
          _vm.showInfo(card)
        }
      }
    })
  }))], 1), _vm._v(" "), (_vm.deckReady) ? _c('section', {
    staticClass: "deck-summary"
  }, [_c('hr'), _vm._v(" "), _c('h3', [_vm._v("Average Elixir Cost: "), _c('span', [_vm._v(_vm._s(_vm.avgElixirCost))])]), _vm._v(" "), _c('button', {
    staticClass: "btn",
    on: {
      "click": _vm.showReviewModal
    }
  }, [_vm._v("Quick Review")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": _vm.goPlay
    }
  }, [_vm._v("Fight!")]), _vm._v(" "), _c('img', {
    staticClass: "img-champion animated swing",
    attrs: {
      "src": "static/img/champion.png"
    }
  }), _vm._v(" "), _c('a', {
    on: {
      "click": _vm.newDeck
    }
  }, [_vm._v("New Deck")])]) : _vm._e(), _vm._v(" "), (!_vm.deckReady) ? _c('card-filter', {
    on: {
      "change": _vm.applyFilter
    }
  }) : _vm._e(), _vm._v(" "), (!_vm.deckReady) ? _c('card-list', {
    attrs: {
      "cards": _vm.cardsToShow
    },
    on: {
      "toggle": _vm.toggleCardSelection
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "card-filter flex"
  }, [_c('label', [_vm._v("\n      By Type\n      "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cardsFilter.byType),
      expression: "cardsFilter.byType"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cardsFilter.byType = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("All")]), _vm._v(" "), _vm._l((_vm.cardTypes), function(cardType) {
    return _c('option', [_vm._v(_vm._s(cardType))])
  })], 2)]), _vm._v(" "), _c('label', [_vm._v("\n      Max Arena\n      "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.cardsFilter.byArena),
      expression: "cardsFilter.byArena",
      modifiers: {
        "number": true
      }
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return _vm._n(val)
        });
        _vm.cardsFilter.byArena = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("All")]), _vm._v(" "), _vm._l((_vm.arenas), function(_, i) {
    return _c('option', [_vm._v(_vm._s(i))])
  })], 2)]), _vm._v(" "), _c('br'), _c('br'), _vm._v(" "), _c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.cardsFilter.byMaxCost),
      expression: "cardsFilter.byMaxCost",
      modifiers: {
        "number": true
      }
    }],
    attrs: {
      "type": "number",
      "placeholder": "By Max Cost"
    },
    domProps: {
      "value": (_vm.cardsFilter.byMaxCost)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cardsFilter.byMaxCost = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cardsFilter.byName),
      expression: "cardsFilter.byName"
    }],
    attrs: {
      "type": "text",
      "placeholder": "By Names"
    },
    domProps: {
      "value": (_vm.cardsFilter.byName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.cardsFilter.byName = $event.target.value
      }
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('transition', {
    attrs: {
      "name": "slide-fade",
      "appear": ""
    }
  }, [_c('router-view')], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "deck-play"
  }, [_c('section', {
    staticClass: "board flex"
  }, [_c('transition', {
    attrs: {
      "enter-active-class": "animated bounceIn",
      "leave-active-class": "animated bounceOutUp"
    }
  }, [(_vm.op.currCard) ? _c('div', {
    staticClass: "board-card op-card"
  }, [_c('img', {
    attrs: {
      "src": _vm.op.currCard.imgUrl
    }
  })]) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "enter-active-class": "animated bounceIn",
      "leave-active-class": "animated bounceOutUp"
    }
  }, [(_vm.me.currCard) ? _c('div', {
    staticClass: "board-card me-card"
  }, [_c('img', {
    attrs: {
      "src": _vm.me.currCard.imgUrl
    }
  })]) : _vm._e()])], 1), _vm._v(" "), _c('section', {
    staticClass: "deck"
  }, [_c('div', {
    staticClass: "flex"
  }, _vm._l((_vm.cards), function(card) {
    return _c('img', {
      key: card._id,
      attrs: {
        "src": card.imgUrl
      },
      on: {
        "click": function($event) {
          _vm.placeCard(card)
        }
      }
    })
  }))])])
},staticRenderFns: []}

/***/ })
],[18]);
//# sourceMappingURL=app.7bedc74db925b5399ce4.js.map
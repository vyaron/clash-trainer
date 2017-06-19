import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import DeckEdit from '@/components/DeckEdit'
import DeckPlay from '@/components/DeckPlay'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/deck-edit',
      name: 'DeckEdit',
      component: DeckEdit
    },
    {
      path: '/deck-play',
      name: 'DeckPlay',
      component: DeckPlay
    }


  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import DeckEdit from '@/components/DeckEdit'
import DeckPlay from '@/components/DeckPlay'
import DeckView from '@/components/DeckView'


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
      path: '/deck-view',
      name: 'DeckView',
      component: DeckView
    },
    {
      path: '/deck-play',
      name: 'DeckPlay',
      component: DeckPlay
    }


  ]
})

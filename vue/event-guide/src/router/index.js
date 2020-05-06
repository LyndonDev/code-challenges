import Vue from 'vue'
import Router from 'vue-router'

import Page404 from '@/components/Page404'
import PageSession from '@/components/PageSession'
import PageSessions from '@/components/PageSessions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/sessions/today'
    },
    {
      path: '/sessions',
      redirect: '/sessions/today'
    },
    {
      path: '/sessions/:filter',
      component: PageSessions
    },
    {
      path: '/sessions/:filter/page/:page',
      component: PageSessions
    },
    {
      path: '/sessions/:filter/search/:search',
      component: PageSessions
    },
    {
      path: '/sessions/:filter/search/:search/page/:page',
      component: PageSessions
    },
    {
      path: '/session/:sessionId',
      component: PageSession
    },
    {
      path: '/404',
      component: Page404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

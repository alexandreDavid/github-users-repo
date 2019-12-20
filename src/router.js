import Vue from 'vue'
import Router from 'vue-router'
import GithubProjectReadMe from '@/components/GithubProjectReadMe'
import GithubProjectsByUser from '@/components/GithubProjectsByUser'
import GithubUserSearch from '@/components/GithubUserSearch'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/search',
      name: 'search',
      component: GithubUserSearch
    },
    {
      path: '/:username',
      name: 'projectsByUser',
      component: GithubProjectsByUser,
      props: true
    },
    {
      path: '/:username/:repo',
      name: 'projectReadMe',
      component: GithubProjectReadMe,
      props: true
    },
    {
      path: '*',
      redirect: { name: 'search' }
    }
  ]
})
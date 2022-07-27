import { createRouter, createWebHashHistory } from 'vue-router'

const groups = {
  Basic: [
    {
      name: 'Home',
      link: '/home',
    },
    {
      name: 'Playlist',
      link: '/playlist',
    },
    {
      name: 'Lib',
      link: '/lib',
    },
  ],
  Discover: [
    {
      name: 'Trends',
      link: '/trends',
    },
    {
      name: 'new',
      link: '/new',
    },
    {
      name: 'Calendar',
      link: '/calendar',
    },
  ],
  Collection: [
    {
      name: 'Favorites',
      link: '/fav',
    },
    {
      name: 'Artist',
      link: '/artist',
    },
    {
      name: 'Albums',
      link: '/albums',
    },
  ],
}

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'index',
      path: '/',
      redirect: '/home',
      children: [
        /* basic */
        {
          name: 'Home',
          path: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          name: 'Playlist',
          path: 'playlist',
          component: () => import('../views/PlaylistView.vue'),
        },
        {
          name: 'Lib',
          path: 'lib',
          component: () => import('../views/LibView.vue'),
        },
        /* discover */
        {
          name: 'Trends',
          path: 'trends',
          component: () => import('../views/HomeView.vue'),
        },
        {
          name: 'New',
          path: 'new',
          component: () => import('../views/PlaylistView.vue'),
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('../views/LibView.vue'),
        },
        // collection
        {
          name: 'Favorites',
          path: 'favorites',
          component: () => import('../views/FavoriteView.vue'),
        },
        {
          name: 'Artist',
          path: 'artist',
          component: () => import('../views/PlaylistView.vue'),
        },
        {
          name: 'Albums',
          path: 'albums',
          component: () => import('../views/LibView.vue'),
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

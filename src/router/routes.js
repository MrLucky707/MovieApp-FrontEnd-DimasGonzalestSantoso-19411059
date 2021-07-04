
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardAdmin', component: () => import('src/pages/admin/Index.vue') },
      { path: ' inputbarang ', name: 'inputBarang', component: () => import('src/pages/admin/InputBarang.vue') },
      { path: ' datauser ', name: 'dataUser', component: () => import('src/pages/admin/DataUser.vue') },
      { path: 'datamovie', name: 'dataMovie', component: () => import('pages/admin/DataMovie.vue') },
      { path: 'editmovie/:id', name: 'editMovie', component: () => import('pages/admin/FormEdit.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/Index.vue') },
      { path: '/myorder', name: 'myOrder', component: () => import('pages/user/myOrder.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/guest/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/guest/Register.vue')
  }
]

export default routes

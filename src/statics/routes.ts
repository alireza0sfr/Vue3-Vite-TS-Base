import DeleteThisLater from '~/components/delete-this-later.vue'

function lazy(path: string):object {
  return () => import(`~/views/${path}.vue`)
}

const routes = [
  { path: '/', name: 'Home', component: DeleteThisLater },
  { path: '/about', name: 'About', component: lazy('About') }
]

export default routes
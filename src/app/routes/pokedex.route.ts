export default [
    {
        path: '/pokedex',
        name: 'pokedex',
        component: () => import('../views/pokedex/Welcome.vue'),
        meta: { title: 'Inicio'},
    },
    {
        path: '/pokedex/list',
        name: 'pokemon-list',
        component: () => import('../views/pokedex/PokemonList.vue'),
        meta: { title: 'Listado'},
    },
];
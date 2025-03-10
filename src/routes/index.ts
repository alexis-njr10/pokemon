import {errorsRoute, pokedexRoute   } from '../app/routes';

export default [
	{
		path: '/:pathMatch(.*)',
		redirect: { name: 'error' },
	},
	{
		path: '/',
		redirect: { name: 'pokedex' },
	},
	...errorsRoute,
	...pokedexRoute
];
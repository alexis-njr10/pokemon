export default [
    {
        path: '/error',
        name: 'error',
        component: async () => await import('../views/errors/Index.vue'),
    },
];
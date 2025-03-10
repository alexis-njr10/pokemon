import { createRouter, createWebHistory } from 'vue-router';
import { environment } from '../environments/environment';
import { setLoading } from './loading'; 
import routes from '../routes';

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	document.title = `${environment.PROJECT_NAME} - ${to.meta.title}`;
	setLoading(true);
	next();
});

router.afterEach((to, from, next) => {
	setLoading(false);
})


export default router;

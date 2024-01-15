import { createRouter, createWebHistory } from 'vue-router';
import IndexVue from '@/views/Index.vue';
import SignInView from '@/views/SignInView.vue';
import LoginView from '@/views/LoginView.vue';
import ChatView from '@/views/ChatView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexVue
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LoginView
    },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatView
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import SignInView from '@/views/SignInView.vue';
import LoginView from '@/views/LoginView.vue';
import ChatView from '@/views/ChatView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
    // 其他路由...
  ],
});

export default router;

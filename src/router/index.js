import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Template from '@/components/Template';
import LessonPlan from '@/components/LessonPlan';
import PlanHistory from '@/components/PlanHistory';
import GoalDash from '@/components/GoalDash';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/template',
      name: 'Template',
      component: Template,
    },
    {
      path: '/lessonplan',
      name: 'LessonPlan',
      component: LessonPlan,
    },
    {
      path: '/planhistory',
      name: 'PlanHistory',
      component: PlanHistory,
    },
    {
      path: '/goaldash',
      name: 'GoalDash',
      component: GoalDash,
    }
  ],
});

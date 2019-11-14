import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue"
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue"

// Admin pages
import Dashboard from "@/pages/Dashboard.vue"
import UserProfile from "@/pages/UserProfile.vue"
import Deployments from "@/pages/Deployments.vue"
import Quakes from "@/pages/Earthquakes.vue"
import Weather from "@/pages/Weather.vue"

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: UserProfile
      },
      {
        path: "Deployments",
        name: "Deployments",
        component: Deployments
      },
      {
        path: "quakes",
        name: "quakes",
        component: Quakes
      },
      {
        path: "weather",
        name: "weather",
        component: Weather
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

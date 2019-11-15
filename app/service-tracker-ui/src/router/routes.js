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
    redirect: "/",
    children: [
      {
        path: "/",
        name: "Deployments",
        component: Deployments
      }
    ]
  },
  { path: "*", component: DashboardLayout }
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

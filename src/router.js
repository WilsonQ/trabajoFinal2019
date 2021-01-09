import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import {auth} from "../src/components/firebase";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta:{
        requiresAuth:true 
      }
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./components/Login.vue"),
      meta:{
        requiresGuest:false
      }
    },
    {
      path: "/estadisticas",
      name: "estadisticas",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Estadistica.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/NewProduct",
      name: "NewProduct",
      component: () => import("./views/ProductoView/AltaProductoView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/ComingSoon",
      name: "ComingSoon",
      component: () => import("./views/ProximamenteView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/Products",
      name: "Products",
      component: () => import("./views/ProductoView/ListadoProductosView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/UpdateProduct",
      name: "UpdateProduct",
      component: () => import("./views/ProductoView/ModificarProductoView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/DeleteProduct",
      name: "DeleteProduct",
      component: () => import("./views/ProductoView/EliminarProductoView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/NuevaVenta",
      name: "Nueva venta",
      component: () => import("./views/VentaView/AltaVentaView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/ListarVentas",
      name: "Lista de Ventas",
      component: () => import("./views/VentaView/ListarVentasView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/ListarOrdenTrabajo",
      name: "Listar Orden de Trabajo",
      component: () =>
        import("./views/OrdenTrabajoView/ListadoOrdenTrabahoView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/ModificarOrdenTrabajo",
      name: "Modificar Orden de Trabajo",
      component: () =>
        import("./views/OrdenTrabajoView/ModificarOrdenTrabajoView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/AltaOrdenTrabajo",
      name: "Nueva Orden de Trabajo",
      component: () =>
        import("./views/OrdenTrabajoView/AltaOrdenTrabajoView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/AltaMeliPublicacion",
      name: "Nueva Publicacion",
      component: () =>
        import("./views/MeliPublicacionView/AltaMeliPublicacionView.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/ModificarMeliPublicacion",
      name: "Modificar Publicacion",
      component: () =>
        import("./views/MeliPublicacionView/ModificarMeliPublicacion.vue"),
      meta:{
        requiresAuth:true
      }
    },
    {
      path: "/ListadoMeliPublicacion",
      name: "Listado de Publicacion",
      component: () =>
        import("./views/MeliPublicacionView/ListadoMeliPublicacionView.vue"),
      meta:{
        requiresAuth:true
      }
    }
  ]
});

router.beforeEach((to,from,next)=>{
  //checkeo los requiredauth
  if(to.matched.some(record=>record.meta.requiresAuth)){
    //checkeo si no esta logeado
    if(!auth.currentUser){
      //ir al login
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
    }
    else{
      //estoy logueado
      next();
    }

  }
  else if(to.matched.some(record=>record.meta.requiresGuest))
  {
     //checkeo si esta logeado
     if(auth.currentUser){
        //ir al login
        next({
          path:'/',
          query:{
            redirect: to.fullPath
          }
        });
      }
      else{
        
        next();
      }
  }
  else{
    next();
  }
});

export default router
<template>
  <v-navigation-drawer v-model="drawerChild" app clipped>
    <!-- Para barra automatica agregar expand-on-hover y permanent -->
    <v-list>
      <v-list-item to="/">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item to="/login">
        <v-list-item-action>
          <v-icon>lock</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>LOGIN</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item to="/estadisticas">
        <v-list-item-action>
          <v-icon>equalizer</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Estadisticas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        v-for="item in itemsPublicacion"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.path">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group
        v-for="item in itemsVenta"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.path">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.path">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group
        v-for="(item,i) in itemsOrdenTrabajo"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(subItem,index) in item.items" :key="index" :to="subItem.path">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavDrawer",
  props: {
    drawer: {
      default: true,
      type: Boolean
    }
  },
  data: () => ({
    itemsVenta: [
      {
        action: "monetization_on",
        title: "Ventas",
        active: false,
        items: [
          { title: "Nueva Venta", path: "NuevaVenta" },
          { title: "Listado De Ventas", path: "ListarVentas" }
        ]
      }
    ],
    items: [
      {
        action: "local_parking",
        title: "Productos",
        active: false,
        items: [
          { title: "Nuevo Producto", path: "NewProduct" },
          { title: "Modificar Producto", path: "UpdateProduct" },
          { title: "Listado De Productos", path: "Products" }
        ]
      }
    ],
    itemsOrdenTrabajo: [
      {
        action: "work",
        title: "Orden de Trabajo",
        active: false,
        items: [
          { title: "Nueva Orden", path: "AltaOrdenTrabajo" },
          { title: "Listado de Ordenes", path: "ListarOrdenTrabajo" }
        ]
      }
    ],
    itemsPublicacion: [
      {
        action: "dvr",
        title: "Publicaciones",
        active: false,
        items: [
          { title: "Nueva Publicacion", path: "AltaMeliPublicacion" },
          { title: "Listado de Publicaciones", path: "ListadoMeliPublicacion" }
        ]
      }
    ],
    drawerChild: true
  }),
  computed: {},
  watch: {
    drawer(value) {
      this.drawerChild = value;
    },
    drawerChild(value) {
      this.$emit("drawerStatus", value);
    }
  }
};
</script>


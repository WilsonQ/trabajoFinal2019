<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list>
      <v-list-item to="/">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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

      <v-list-item to="/ComingSoon">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Publicaciones</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/ComingSoon">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Stock</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/ComingSoon">
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Estadisticas</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    items: [
      {
        action: "local_activity",
        title: "Productos",
        path: "producto",
        active: false,
        items: [
          
          { title: "Nuevo Producto", path: "NewProduct" },
          { title: "Modificar Producto", path: "UpdateProduct" },
          { title: "Lista de Productos", path: "Products" }
        ]
      }
    ],
    itemsVenta: [
      {
        action: "local_activity",
        title: "Ventas",
        active: false,
        items: [
          { title: "Nueva Venta", path: "NuevaVenta" },
          { title: "Lista de Ventas", path: "ComingSoon" }
        ]
      }
    ]
  }),
  computed: {
    ...mapState(["drawer"])
  }
};
</script>


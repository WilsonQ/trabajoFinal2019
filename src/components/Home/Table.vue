<template>
  <v-card elevation="5">
    <v-card-title>
      <h4>{{ datos.titulo }}</h4>
    </v-card-title>
    <v-divider class="ma-0"></v-divider>
    <v-list class="pb-4">
      <v-list-item v-for="(item, i) in datos.items" :key="i">
        <v-list-item-content>{{ item.nombre }}:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{
          item.data
          }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    productos: {
      type: Object,
      default: {
        titulo: "Stock Bajo",
        items: [
          {
            nombre: "calories",
            data: 237
          },
          {
            nombre: "fat",
            data: 9.0
          },
          {
            nombre: "carbs",
            data: 37
          }
        ]
      }
    },
    validar: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    noData: {
      titulo: "No data",
      items: [
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        }
      ]
    },
    noData1: {
      titulo: "No data",
      items: [
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        },
        {
          nombre: "nodata",
          data: 0
        }
      ]
    }
  }),
  computed: {
    datos() {
      let validarAncho = this.validar ? this.noData : this.noData1;
      return this.productos.items.length === 3 ||
        this.productos.items.length === 5
        ? this.productos
        : validarAncho;
    }
  }
};
</script>

<style></style>

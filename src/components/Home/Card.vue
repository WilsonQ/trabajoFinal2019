<template>
  <v-row>
    <v-col v-for="(item, i) in cardData" :key="i" cols="12" md="4">
      <v-hover v-slot:default="{ hover }" open-delay="200">
        <v-card :elevation="hover ? 20 : 5" :color="color[i].color" dark>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ item.titulo }}</div>
              <v-list-item-title class="headline mb-1">
                {{
                item.data
                }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                item.descripcion
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [
        {
          titulo: "No data ",
          data: "ingrese Data",
          descripcion: "Greyhound divisely hello coldl fonwderfully"
        },
        {
          titulo: "No data",
          data: "ingrese Data",
          descripcion: "Greyhound divisely hello coldl fonwderfully"
        },
        {
          titulo: "No data",
          data: "ingrese Data",
          descripcion: "Greyhound divisely hello coldl fonwderfully"
        }
      ]
    }
  },
  data: () => ({
    noData: [
      {
        titulo: "No data ",
        data: "Minimo TRES Objetos",
        descripcion: "Greyhound divisely hello coldl fonwderfully"
      },
      {
        titulo: "No data",
        data: "Minimo TRES Objetos",
        descripcion: "Greyhound divisely hello coldl fonwderfully"
      },
      {
        titulo: "No data",
        data: "Minimo TRES Objetos",
        descripcion: "Greyhound divisely hello coldl fonwderfully"
      }
    ],
    color: [{ color: "#1F7087" }, { color: "#952175" }, { color: "#234354" }]
  }),
  computed: {
    cardData() {
      return this.items.length === 3 ? this.items : this.noData;
    }
  }
};
</script>

<style></style>

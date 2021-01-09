<script>
import { Bar } from "vue-chartjs";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Deciembre"
        ],
        datasets: [
          {
            label: "Ventas del Mes",
            backgroundColor: "#f87979",
            data: this.barraData
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
  methods: {
    ...mapGetters("home", ["GET_HOME_DATA"])
  },
  computed: {
    barraData() {
      return this.GET_HOME_DATA().ventasMes === undefined
        ? [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        : this.GET_HOME_DATA().ventasMes;
    }
  }
};
</script>

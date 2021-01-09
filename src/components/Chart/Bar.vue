<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    diagramaBarras: {
      type: Object,
      default: {
        titulo: "Ventas del Mes",
        etiquetas: [
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
        data: [577, 557, 817, 460, 845, 859, 750, 867, 845, 859, 750, 867]
      }
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.diagramaBarras.etiquetas,
        datasets: [
          {
            label: this.diagramaBarras.titulo,
            backgroundColor: "#f87979",
            data: this.diagramaBarras.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>

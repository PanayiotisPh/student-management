import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ClassGraphComponent extends Component {
  @tracked chart; // Track the chart instance
  @tracked chartData = [];
  @tracked selectedClassId = 'Mathematics';
  constructor() {
    super(...arguments);
    this.loadData();
  }

  @action
  handleClassSelection(event) {
    const selectedClassId = event.target.value;
    this.selectedClassId = selectedClassId;
    this.loadData();
  }

  @action
  loadData() {
    fetch(
      `http://localhost:8090/subject/averageperquarter/${this.selectedClassId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        this.chartData = data.subject_per_quarter;
        this.createChart();
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  @action
  createChart() {
    const ctx = document.getElementById('classChart').getContext('2d');
    if (this.chart) {
      this.chart.destroy(); // Destroy the previous instance if exists
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartData.map((item) => `${item.Quarter}-${item.Year}`),
        datasets: [
          {
            label: 'Average Grade per Quarter',
            data: this.chartData.map((item) => item.Average_Grade),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

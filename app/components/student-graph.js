import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StudentGraphComponent extends Component {
  @tracked chart; // Track the chart instance
  @tracked chartData = [];
  @tracked selectedStudentId = 1;
  constructor() {
    super(...arguments);
    this.loadData();
  }

  get students() {
    return this.args.data;
  }

  @action
  handleStudentSelection(event) {
    const selectedStudentId = event.target.value;
    this.selectedStudentId = selectedStudentId;
    console.log('selected student id', selectedStudentId);
    this.loadData();
  }

  @action
  loadData() {
    fetch(
      `http://localhost:8090/student/averageperquarter/${this.selectedStudentId}`,
    )
      .then((response) => response.json())
      .then((data) => {
        this.chartData = data.student_per_quarter;
        this.createChart();
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  @action
  createChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
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

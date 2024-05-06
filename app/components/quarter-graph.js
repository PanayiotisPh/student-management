import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ClassGraphComponent extends Component {
  // Define the tracked properties
  // set studentId default value to 2009 and 1 to match the first quarter in the list(default value)
  @tracked chart; // Track the chart instance
  @tracked chartData = [];
  @tracked year = 2009;
  @tracked quarter = 1;

  // Fetch the data for the selected class when the component is instantiated
  constructor() {
    super(...arguments);
    this.loadData();
  }

  // Handle the class selection from the dropdown
  @action
  handleSubmit(event) {
    event.preventDefault();
    this.year = event.target.year.value;
    this.quarter = event.target.quarter.value;
    this.loadData();
  }

  // Fetch the data for the selected class
  @action
  loadData() {
    fetch(
      `http://localhost:8090/subject/averageperyearall/${this.year}/Q${this.quarter}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const averages = data.average_per_year_all[0];
        this.chartData = Object.keys(averages).map((subject) => ({
          subject,
          average: averages[subject],
        }));
        this.createChart();
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  // Create the chart
  @action
  createChart() {
    const ctx = document.getElementById('quarterChart').getContext('2d');
    if (this.chart) {
      this.chart.destroy(); // Destroy the previous instance if exists
    }
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mathematics', 'IT', 'Literature'],
        datasets: [
          {
            label: 'Average Grade per Subject per Quarter',
            data: this.chartData.map((item) => item.average),
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

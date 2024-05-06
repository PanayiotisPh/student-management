import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StudentGraphComponent extends Component {
  // Define the tracked properties
  // set studentId default value to 1 to match the first student in the list(default value)
  @tracked chart; // Track the chart instance
  @tracked chartData = [];
  @tracked selectedStudentId = 1;
  constructor() {
    super(...arguments);
    this.loadData();
  }

  // Get the students data from the parent component
  get students() {
    return this.args.data;
  }

  // Handle the student selection from the dropdown
  @action
  handleStudentSelection(event) {
    const selectedStudentId = event.target.value;
    this.selectedStudentId = selectedStudentId;
    console.log('selected student id', selectedStudentId);
    this.loadData();
  }

  // Fetch the data for the selected class
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

  // Create the chart
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

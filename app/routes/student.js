import Route from '@ember/routing/route';

export default class StudentRoute extends Route {
  // Fetch the data from the API to display in the template/component
  async model(params) {
    try {
      const response = await fetch(
        `http://localhost:8090/student/${params.student_id}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      const data = await response.json();
      const convertedData = {
        id: data.student['Student ID'],
        name: data.student['Student Name'],
        birth: data.student['Date Of Birth'],
        class: data.student['Student Class'],
      };
      return convertedData;

    } catch (error) {
      console.error('Error fetching student data:', error);
      return {};
    }
  }
}

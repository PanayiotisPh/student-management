import Route from '@ember/routing/route';

export default class EditGradesRoute extends Route {
  // Fetch the data from the API to display in the template/component
  // formats data to fit the autofill of the form
  async model(params) {
    try {
      const response = await fetch(
        `http://localhost:8090/student/grade/${params.student_id}/${params.year}/${params.quarter}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      const data = await response.json();
      console.log(data);
      const convertedData = {
        id: data.grades[0]['Student ID'],
        year: data.grades[0]['Year'],
        quarter: data.grades[0]['Quarter'],
        math: data.grades[0]['Mathematics'],
        it: data.grades[0]['Computer Science'],
        literature: data.grades[0]['Literature'],
      };
      console.log(convertedData);
      return convertedData;

    } catch (error) {
      console.error('Error fetching student data:', error);
      return {};
    }
  }
}

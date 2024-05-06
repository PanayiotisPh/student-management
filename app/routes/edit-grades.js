import Route from '@ember/routing/route';

export default class EditGradesRoute extends Route {
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

      // Reshape the data to fit your application's conventions
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Handle errors in a way that the rest of your app can respond to,
      // e.g., by returning undefined, an empty object, or setting an error state.
      return {};
    }
  }
}

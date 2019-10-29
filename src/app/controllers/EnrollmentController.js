import { parseISO, addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Students from '../models/Students';
import Plan from '../models/Plans';


class EnrollmentController {
  async store(req, res){
    const { start_date, students_id, plan_id} = req.body;


  }
}

export default new EnrollmentController();

import { endOfDay, startOfDay, format, subDays, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Students from '../models/Students';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { page =1 } = req.query;
    const chekins = await Checkin.findAll({
      where: { students_id: req.params.id },
      limit:10,
      offset:(page -1)*10,
    });
    return res.json(chekins);
  }

  async store(req, res) {
    const students_id = req.params.id;

    const studentsExists = await Students.findByPk(students_id);

    if (!studentsExists) {
      return res.status(400).json({ error: 'Student not exists.' });
    }

    const enrollmentExists = await Enrollment.findOne({
      where: { students_id },
    });

    if (!enrollmentExists) {
      return res.status(400).json({ error: 'Student has not enrollment.' });
    }

    const oldDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    const oldCheckins = await Checkin.count({
      where: {
        students_id,
        created_at: {
          [Op.between]: [startOfDay(parseISO(oldDate)), endOfDay(new Date())],
        },
      },
    });

    if (oldCheckins === 5) {
      return res.status(401).json({ error: 'maximum login reached.' });
    }

    const checkin = await Checkin.create({students_id});

    return res.json(checkin);
  }
}

export default new CheckinController();

import * as Yup from 'yup';
import { parseISO, addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Students from '../models/Students';
import Plan from '../models/Plans';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollment = await Enrollment.findAll({
      attributes: [
        'id',
        'students_id',
        'plan_id',
        'start_date',
        'end_date',
        'total_price',
        'active',
      ],
      order: ['id'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      students_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const enrollmentExists = await Enrollment.findOne({
      where: { students_id: req.body.students_id },
    });

    if (!enrollmentExists) {
      return res.status(400).json({ error: 'Student already enrolled.' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' });
    }
    const { start_date, students_id, plan_id } = req.body;

    const startDate = parseISO(req.body.start_date);
    const end_date = addMonths(startDate, plan.duration);
    const total_price = plan.price * plan.duration;

    const enrollments = await Enrollment.create({
      students_id,
      plan_id,
      start_date,
      end_date,
      total_price,
    });
    const students = await Students.findByPk(req.body.students_id, {
      attributes: ['name', 'email'],
    });

    await Queue.add(EnrollmentMail.key, {
      students,
      plan,
      start_date,
      end_date,
      total_price,
    });

    return res.json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;
    const { start_date, students_id, plan_id } = req.body;
    const enrollment = await Enrollment.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    const startDate = parseISO(req.body.start_date);
    const end_date = addMonths(startDate, plan.duration);
    const total_price = plan.price * plan.duration;

    const enrollments = await enrollment.update({
      students_id,
      plan_id,
      start_date,
      end_date,
      total_price,
    });

    return res.json(enrollments);
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    await enrollment.destroy();

    return res.json();
  }
}

export default new EnrollmentController();

import * as Yup from 'yup';

import Students from '../models/Students';
import HelpOrder from '../models/HelpOrder';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {

  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer_at: null },
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { students_id: req.params.id },
    });
    return res.json(helpOrders);
  }

  async store(req, res){

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const students_id = req.params.id;

    const studentsExist = await Students.findByPk(students_id);

    if(!studentsExist){
      return res.status(400).json({error: 'Student does not exists'});
    }
    const question = req.body.question;

    const helpOrder = await HelpOrder.create({
      students_id,
      question,
    })

    return res.json(helpOrder);
  }

  async update(req, res){
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const answer_at = new Date();

    const Help = await HelpOrder.findByPk(req.params.id);
    if(!Help){
      return res.status(400).json({error: 'Help request not found'});
    }
    if(Help.answer){
      return res.status(400).json({error: 'Help request already answered'});
    }

    const answer = req.body.answer;

    await Help.update({
      answer,
      answer_at,
    });

    const students = await Students.findByPk(Help.students_id, {
      attributes:['name','email'],
    });

    await Queue.add(HelpOrderMail.key, {
      students,
      Help,
    });

    return res.json(Help);

  }
}

export default new HelpOrderController();

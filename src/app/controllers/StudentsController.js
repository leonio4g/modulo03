import * as Yup from 'yup';
import Students from '../models/Students';
import User from '../models/User';

class StudentsController {
  async store(req,res){

    const Schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.string().required(),
      height: Yup.string().required(),
      weight: Yup.string().required(),
    });

    if(!(await Schema.isValid(req.body))){
      return res.status(400).json({error:'Validation fails'});
    };

    const studentsExists = await Students.findOne({where:{email:req.body.email}});

    if(studentsExists){
      return res.status(400).json({error: 'Students already Exists'})
    }

    const userid = await User.findByPk(req.userId);


    if(userid.provider!== true){
      return res.status(400).json({error: 'User is not allowed'})
    }


    const {id,name,email,age,height,weight} = await Students.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight
    });

  }

  async update(req, res) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
            .email()
            .required(),
        age: Yup.number().required(),
        weight: Yup.number().required(),
        height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const student = await Students.findByPk(id);

    if (!student) {
        return res.status(400).json({ error: 'Student not found.' });
    }
    const {name,email,age, height, weight} = await student.update(req.body);

    return res.json({
      name,
      email,
      age,
      height,
      weight
    });
  }
}

export default new StudentsController();

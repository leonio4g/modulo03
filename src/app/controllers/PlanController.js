import Plan from '../models/Plans';
import * as Yup from 'yup';

class PlanController {
  async store(req, res){

    const Schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string().required(),
      price: Yup.string().required(),
    });

    if(!(await Schema.isValid(req.body))){
      return res.status(400).json({error:'Validation Fails'})
    }

    const checkTitle = await Plan.findOne({where: {title:req.body.title}});

    if(checkTitle){
      return res.status(400).json({error: 'Title already exists'});
    }
    const {id,title, duration, price} = await Plan.create(req.body)
    return res.json({
      id,
      title,
      duration,
      price
    });
  }

  async index(req,res){
    const plans = await Plan.findAll();

    return res.json(plans);
  }
  async update(req, res){

    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {id}  = req.params;
    const checkTitle = await Plan.findOne({
      where:{
        title:req.body.oldTitle,
      },
    });
    if(!checkTitle){
      return res.status(400).json({error: 'Title does not exists'});
    }
    const checkTitleExist = await Plan.findOne({where: {title:req.body.title}});

    if(checkTitleExist){
      return res.status(400).json({error: 'Title already exists'});
    }
    const plan = await Plan.findByPk(id);
    const upplan = await plan.update(req.body);
    return res.json(upplan);

  }
  async delete(req, res){

    const {id} = req.params;
    const plan = await Plan.findByPk(id);
    if(!plan){
      return res.status(400).json({error: 'Id does not exists'});
    }

    await plan.destroy();

    return res.json(plan);
  }
}

export default new PlanController();

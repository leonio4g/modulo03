import Plan from '../models/Plan';
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

    /*const checkIsProvider = await User.findOne({
      where: {id: req.userId, provider: true}
    });

    if(!checkIsProvider){
      return res.status(401).json({error: 'Only provider can load create'});
    }
*/
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
    const plans = await Plan.findAll({})
  }
}

export default new PlanController();

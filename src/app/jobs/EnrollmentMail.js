import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { students, plan, start_date, end_date, total_price } = data;
    await Mail.sendMail({
      to: `${students.name} <${students.email}>`,
      subject: 'Matricula Efetuada',
      template: 'enrollment',
      context: {
        students: students.name,
        plan: plan.title,
        dateInit: format(
          parseISO(start_date),
          "'dia' dd 'de' MMMM' de 'yyyy,' às' H:mm'h'",
          { locale: pt }
        ),
        dateFim: format(
          parseISO(end_date),
          "'dia' dd 'de' MMMM' de 'yyyy, 'às' H:mm'h'",
          { locale: pt }
        ),
        price: total_price,
      },
    });
  }
}

export default new EnrollmentMail();

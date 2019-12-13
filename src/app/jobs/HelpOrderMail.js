import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { Help, students } = data;
    await Mail.sendMail({
      to: `${students.name} <${students.email}>`,
      subject: 'Resposta GymPoint',
      template: 'HelpOrder',
      context: {
        students: students.name,
        question: Help.question,
        answer: Help.answer,
        answer_at: format(
          parseISO(Help.answer_at),
          "'dia' dd 'de' MMMM' de 'yyyy, 'às' H:mm'h'",
          { locale: pt }
        ),
      },
    });
  }
}

export default new HelpOrderMail();

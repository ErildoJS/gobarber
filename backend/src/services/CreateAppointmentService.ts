import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../erros/AppError';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // verificando se a data passada foi encontrada,
    // se sim o app da um erro
    // pk ja existe essa data  agendada no db
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // obs: o metodo create() nao salva no db , apenas cria uma instancia no db
    // o metodo que salva é p save()
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

/*
um para um oneToone
um para muitos oneTomany
muitos para muitos manyTomany

*/
// kiss - keep it simple and stupid -
@Entity('appointments') // decorators
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string; // prestador de serviço que vai prestar o agendamento

  @ManyToOne(() => User) // parte sempre da tabela de appointments
  @JoinColumn({ name: 'provider_id' }) // a coluna qu identifia o prestador desse agendamento
  provider: User; // para nos termos aceeso a todas info dos agendamentos

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;

import { Profile } from 'src/profile/profile.entity';
import { Role } from 'src/role/role.enum';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'auths' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Profile, (profiles) => profiles.auths)
  profiles: Profile;
  // @OneToOne(() => Profile)
  // @JoinColumn()
  // profiles: Profile;
  // roles:Role[]
}

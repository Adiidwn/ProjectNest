import { Auth } from 'src/auth/auth.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  displayName: string;

  @Column({nullable: true})
  gender: string;

  @Column({nullable: true})
  birthday: string;

  @Column({nullable: true})
  horoscope: string;

  @Column({nullable: true})
  zodiac: string;

  @Column({nullable: true})
  height: number;

  @Column({nullable: true})
  weight: number;

  @Column({nullable: true})
  image: string;

  @ManyToOne(() => Auth, (auths) => auths.profiles)
  auths: Auth;
}

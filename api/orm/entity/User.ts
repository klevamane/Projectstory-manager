import {
  IsEmail, IsNotEmpty, MaxLength, MinLength,
} from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Unique,
} from 'typeorm';
import { RoleEnum } from '../../util';
import Story from './Story';


@Entity()
@Unique(['email'])

class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 50 })
    @IsNotEmpty({ message: 'The firstname is required' })
    @MaxLength(50, { message: 'Maximum lenght for the firstname is $constraint1' })
    public firstname: string;

    @Column({ length: 50 })
    @IsNotEmpty({ message: 'The lastname is required' })
    @MaxLength(50, { message: 'Maximum lenght for the lastname is $constraint1' })
    public lastname: string;

    @Column({ length: 100 })
    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail(undefined, { message: 'Enter a valid email' })
    public email: string;

    @Column()
    @IsNotEmpty({ message: 'The email is required' })
    @MinLength(6, { message: 'Minimum password length is $constraint1' })
    public password: string ;

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
    public role: RoleEnum;

    @OneToMany(() => Story, (story) => story.user)
    public stories: Story[];
}

export default User;
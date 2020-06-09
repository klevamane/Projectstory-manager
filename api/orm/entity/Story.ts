import {
  IsEnum, IsNotEmpty, IsPositive, IsInt, IsNumber, MaxLength,
} from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn,
} from 'typeorm';
import { ComplexityEnum, LabelEnum, StatusEnum } from '../../util';

import User from './User';


@Entity()
class Story extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty({ message: 'The summary is required' })
    @MaxLength(200, { message: 'Maximum summary length is $constraint1' })
    public summary: string;

    @Column()
    @IsNotEmpty({ message: 'The description is required' })
    public description: string;

    @Column({ type: 'enum', enum: ComplexityEnum })
    @IsNotEmpty({ message: 'The complexity is required' })
    @IsEnum(ComplexityEnum, { message: 'Enter `ONE`, `TWO`, `THREE`, OR `EIGHT` for complexity' })
    public complexity: string;

    @Column()
    @IsInt({ message: 'Enter interger values only' })
    @IsPositive({ message: 'Enter only positive numbers' })
    public hours: number;

    @Column()
    @IsNotEmpty({ message: 'The cost is required' })
    @IsNumber(undefined, { message: 'Enter number for cost' })
    @IsPositive({ message: 'Enter only positive numbers' })
    public cost: number;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.OPEN })
    public status: string;

    @Column({ type: 'boolean', default: true })
    public isActive: boolean;

    @Column({ type: 'enum', enum: LabelEnum })
    @IsNotEmpty({ message: 'The label is required' })
    @IsEnum(LabelEnum, { message: 'Enter `FRONTEND` OR `BACKEND` for label' })
    public label: string;


    @Column()
    @CreateDateColumn()
    public created: Date;

    @ManyToOne(() => User, (user) => user.stories)
    user: User;
}

export default Story;
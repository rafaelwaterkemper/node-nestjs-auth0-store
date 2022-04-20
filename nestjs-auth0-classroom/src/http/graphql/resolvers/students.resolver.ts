import { Resolver } from '@nestjs/graphql';
import { Student } from '../models/students';

@Resolver(() => Student)
export class StudentsResolver {}

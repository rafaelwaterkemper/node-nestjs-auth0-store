import { Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {}

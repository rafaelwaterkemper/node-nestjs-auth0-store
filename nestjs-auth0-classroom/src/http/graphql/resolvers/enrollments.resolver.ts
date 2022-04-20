import { Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentResolver {}

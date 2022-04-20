import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from '../../../services/products.service';

import { PruchaseService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchaseService: PruchaseService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  products() {
    return this.purchaseService.listAll();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.findById(purchase.productId);
  }

  @Mutation(() => Purchase)
  async createPurchase(
    @CurrentUser() user: AuthUser,
    @Args('data') data: CreatePurchaseInput,
  ) {
    let customer = await this.customersService.findById(user.sub);

    if (!customer) {
      customer = await this.customersService.create({
        authUserId: user.sub,
      });
    }

    return this.purchaseService.create({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}

import { Service } from "medusa-extender";
import { EntityManager } from "typeorm";
import EventBusService from "@medusajs/medusa/dist/services/event-bus";
import { FindConfig } from "@medusajs/medusa/dist/types/common";
import { UserService as MedusaUserService } from '@medusajs/medusa/dist/services';
import { User } from '../entities/user.entity';
import UserRepository from "../repositories/user.repository";
import { MedusaError } from 'medusa-core-utils';
import { buildQuery, validateId } from '@medusajs/medusa/dist/utils';

type ConstructorParams = {
  manager: EntityManager;
  userRepository: typeof UserRepository;
  eventBusService: EventBusService;
};

@Service({ override: MedusaUserService })
export default class UserService extends MedusaUserService {
  private readonly manager: EntityManager;
  private readonly userRepository: typeof UserRepository;
  private readonly eventBus: EventBusService;

  constructor(readonly container: ConstructorParams) {
    super(container);
    this.manager = container.manager;
    this.userRepository = container.userRepository;
    this.eventBus = container.eventBusService;
  }

  public async retrieve(userId: string, config?: FindConfig<User>): Promise<User> {
    const userRepo = this.manager.getCustomRepository(this.userRepository);
    const validatedId = validateId(userId);
    const query = buildQuery({ id: validatedId }, config);

    const user = await userRepo.findOne(query);
    if (!user) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `User with id: {userId} was not found`);
    }
    return user as User;
  }
}

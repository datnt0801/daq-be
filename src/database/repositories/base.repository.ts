import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  ObjectLiteral,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  constructor(
    protected readonly entity: EntityTarget<T>,
    protected readonly manager: EntityManager,
  ) {}

  findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.manager.findOne(this.entity, options) as Promise<T | null>;
  }

  save(entity: T): Promise<T> {
    return this.manager.save(this.entity, entity);
  }
}

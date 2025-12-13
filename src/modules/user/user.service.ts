import { Injectable } from "@nestjs/common";
import { BuffetItemRepository } from "src/database/repositories/buffet-item.repository";
import { BuffetRepository } from "src/database/repositories/buffet.repository";
import { SetItemRepository } from "src/database/repositories/set-item.repository";
import { SetRepository } from "src/database/repositories/set.repository";
import { UserRepository } from "src/database/repositories/users.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly buffetRepository: BuffetRepository,
        private readonly buffetItemRepository: BuffetItemRepository,
        private readonly setRepository: SetRepository,
        private readonly setItemRepository: SetItemRepository,
    ) {}

    async getBuffets() {
        return this.buffetRepository.find();
    }

    async getBuffetItems() {
        return this.buffetItemRepository.find();
    }

    async getSets() {
        return this.setRepository.find();
    }

    async getSetItems() {
        return this.setItemRepository.find();
    }

}
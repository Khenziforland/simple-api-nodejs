import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, AfterLoad } from "typeorm"
import HashHelper from "../helpers/hash_helper"

@Entity({name: "product_categories"})
export class ProductCategory {
    @PrimaryGeneratedColumn({
      name: "id"
    })
    id: number
    hash_id: string

    @Column({
      name: "name"
    })
    name: string

    @Column({
      name: "description",
    })
    description: string

    @DeleteDateColumn({
      name: "deleted_at",
      nullable: true
    })
    deleted_at?: Date

    @CreateDateColumn({
      name: "created_at",
    })
    created_at: Date

    @UpdateDateColumn({
      name: "updated_at",
    })
    updated_at: Date

    @AfterLoad()
    generateHashId() : void {
      this.hash_id = HashHelper.encode(this.id);
      delete this.id
    }
}
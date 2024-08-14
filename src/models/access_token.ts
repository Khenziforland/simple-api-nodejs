import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, AfterLoad, ManyToOne, JoinColumn } from "typeorm"
import HashHelper from "../helpers/hash_helper"
import { User } from "./user"

@Entity({name: "access_tokens"})
export class AccessToken {
    @PrimaryGeneratedColumn({
      name: "id"
    })
    id: number
    hash_id: string

    @ManyToOne(() => User, (data) => data, {eager:true})
    @JoinColumn({
      name: "user_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_user_id"
    })
    user: User

    @Column({
      name: "token"
    })
    token: string

    @Column({
      name: "expired_at",
    })
    expired_at: Date

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
    }
}
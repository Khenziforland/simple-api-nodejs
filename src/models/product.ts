import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, DeleteDateColumn, ManyToOne, AfterLoad } from "typeorm";

import { ProductCategory } from "./product_category";

import { AppDataSource } from "../data_source";

import HashHelper from "../helpers/hash_helper";
import StorageHelper from "../helpers/storage_helper";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;
  hash_id: string;

  @ManyToOne(() => ProductCategory, (data) => data, { eager: true })
  @JoinColumn({
    name: "product_category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_product_category_id",
  })
  product_category: ProductCategory;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "price",
  })
  price: number;

  @Column({
    name: "image",
    nullable: true,
  })
  image?: string;
  image_url?: string;

  @DeleteDateColumn({
    name: "deleted_at",
    nullable: true,
  })
  deleted_at?: Date;

  @CreateDateColumn({
    name: "created_at",
  })
  created_at: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updated_at: Date;

  @AfterLoad()
  generateHashId(): void {
    this.hash_id = HashHelper.encode(this.id);
  }

  @AfterLoad()
  generateImageUrl(): void {
    if (this.image) {
      this.image_url = StorageHelper.getUrlFile("product-image", this.image);
    }
  }
}

export class ProductMethod {
  static async saveImage(request: any, id: number) {
    if (request.files.image) {
      const file = request.files.image;
      const result = await StorageHelper.uploadFile(file, "product-image");

      if (result.status) {
        await AppDataSource.getRepository(Product).update({ id: id }, { image: result.filename });
      }

      return null;
    }

    return null;
  }

  static async deleteImage(id: any) {
    const product = await AppDataSource.getRepository(Product).findOneBy({
      id: id,
    });

    if (product) {
      await StorageHelper.deleteFile("product-image", product!.image);
    }
  }
}

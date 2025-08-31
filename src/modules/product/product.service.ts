import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProductEntity } from 'src/entities/Products.entity';
import CategoryEntity from 'src/entities/Category.entity';
import UploadEntity from 'src/entities/Upload.entity';
import BrandEntity from 'src/entities/Brand.entity';
import { ProductCreateDto } from './dto/create.dto';
import { ProductUpdateDto } from './dto/update.dto';
import { PaginationQueryDto } from './dto/paginate.dto';
import { FilterProductsDto } from './dto/filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(UploadEntity)
    private uploadRepo: Repository<UploadEntity>,
    @InjectRepository(BrandEntity)
    private brandRepo: Repository<BrandEntity>
  ) {}

  async getAllProducts() {
    const products = await this.productRepo.find({
      relations: ['category', 'images', 'brand'],
    });
    return products;
  }

  async getPaginatedProducts(params: PaginationQueryDto) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepo.findAndCount({
      skip,
      take: limit,
      relations: ['category', 'images', 'brand'],
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'images', 'brand'],
    });

    if (!product) throw new NotFoundException('Product is not found with given id!');
    return product;
  }

  async filterProducts(params: FilterProductsDto) {
    const queryBuilder = this.productRepo.createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand');

    if (params.brandId) queryBuilder.andWhere('product.brandId = :brandId', { brandId: params.brandId });
    if (params.colors && params.colors.length > 0) queryBuilder.andWhere('product.colors && :colors', { colors: params.colors });
    if (params.sizes && params.sizes.length > 0) queryBuilder.andWhere('product.sizes && :sizes', { sizes: params.sizes });
    if (params.minPrice && params.maxPrice) queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', { minPrice: params.minPrice, maxPrice: params.maxPrice });
    else if (params.minPrice) queryBuilder.andWhere('product.price >= :minPrice', { minPrice: params.minPrice });
    else if (params.maxPrice) queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: params.maxPrice });

    const products = await queryBuilder.getMany();
    if (!products || products.length === 0) throw new NotFoundException('Products not found with given parameters');

    return products;
  }

  async create(params: ProductCreateDto) {
    const category = await this.categoryRepo.findOne({ where: { id: params.categoryId } });
    if (!category) throw new NotFoundException('Category is not found with given id!');

    const brand = await this.brandRepo.findOne({ where: { id: params.brandId } });
    if (!brand) throw new NotFoundException('Brand is not found with given id!');

    const uploads = await this.uploadRepo.find({ where: { id: In(params.images) } });
    if (!uploads.length) throw new NotFoundException('Image is not found with given id!');

    const slug = params.slug ? params.slug : this.slugify(params.name);
    const existingProduct = await this.productRepo.findOne({ where: { slug } });
    if (existingProduct) throw new ConflictException('Product already exists with given slug');

    const product = this.productRepo.create({
      ...params,
      images: uploads,
      slug,
    });

    await this.productRepo.save(product);
    return product;
  }

  slugify(text: string) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
  }

  async getProductByCategoryId(categoryId: number) {
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Category is not found with given id!');

    const products = await this.productRepo.find({
      where: { categoryId },
      relations: ['category', 'images', 'brand'],
    });

    if (!products || products.length === 0) throw new NotFoundException('Products not found for this category');
    return products;
  }

  async update(params: ProductUpdateDto, id: number) {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['images'] });
    if (!product) throw new NotFoundException('Product is not found with given id!');

    if (params.categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: params.categoryId } });
      if (!category) throw new NotFoundException('Category is not found with given id!');
    }

    if (params.brandId) {
      const brand = await this.brandRepo.findOne({ where: { id: params.brandId } });
      if (!brand) throw new NotFoundException('Brand is not found with given id!');
    }

    if (params.images) {
      const uploads = await this.uploadRepo.find({ where: { id: In(params.images) } });
      product.images = uploads;
    }

    Object.assign(product, {
      ...params,
      slug: params.slug ?? this.slugify(params.name ?? product.name),
    });

    await this.productRepo.save(product);
    return { message: 'Product updated successfully', product };
  }

  async deleteProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product is not found with given id!');

    await this.productRepo.delete(id);
    return { message: 'Product deleted successfully!' };
  }
}

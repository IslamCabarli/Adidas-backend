import { PartialType } from "@nestjs/swagger";
import BrandCreateDto from "./create.dto";

export default class UpdateBrandDto extends PartialType(BrandCreateDto) { }
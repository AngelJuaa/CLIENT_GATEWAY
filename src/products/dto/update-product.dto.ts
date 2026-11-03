import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto.js';

// Reutiliza las validaciones de creacion, pero vuelve opcionales todos sus campos
// porque una actualizacion parcial puede modificar solo nombre o solo precio.
export class UpdateProductDto extends PartialType(CreateProductDto) {

    
}

import { Type } from "class-transformer";
import { IsNumber, Min, IsString } from "class-validator";

// Define y valida los campos aceptados al crear un producto.
export class CreateProductDto {
    // El nombre debe ser texto.
    @IsString()
    public name!: string;
    // El precio debe ser numerico, no negativo y tener como maximo tres decimales.
    // Type convierte el valor de texto habitual en JSON/query a numero antes de validarlo.
    @IsNumber({maxDecimalPlaces:3,})
    @Min(0)
    @Type(()=> Number)
    public price!: number;
    
}

import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

// Parametros de paginacion que el endpoint de listado recibe en la query string.
export class PaginationDTO{
    // Convierte el texto de la URL a numero y exige un valor positivo si se envia.
    // Al ser opcional, si no se indica se usa la primera pagina.
    @IsPositive()
    @IsOptional()
    @Type(()=> Number)
    page:number=1;

    // Limite positivo de resultados por pagina; el valor predeterminado es 40.
    @IsPositive()
    @IsOptional()
    @Type(()=> Number)
    limit:number=40;
    
}
import 'dotenv/config';
import joi, { number, string } from 'joi';

// Variables de entorno requeridas por el gateway y el cliente TCP de productos.
interface Envars{
    PORT:number;
    PRODUCTS_MICROSERVICE_HOST:string;
    PRODUCTS_MICROSERVICE_PORT:number;
    
    ORDERS_MICROSERVICE_HOST:string;
    ORDERS_MICROSERVICE_PORT:number;


}

// Define y valida el formato esperado para cada variable de entorno.
const envsShema= joi.object<Envars>({
    PORT: joi.number().integer().max(123234567).min(1).required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().integer().max(123234567).min(1).required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().integer().max(123234567).min(1).required(),
}).unknown(true);

// Se recopilan todos los errores de validacion para reportarlos juntos.
const result = envsShema.validate(process.env,{abortEarly:false})
if (result.error) {
    // Impide que la aplicacion arranque con una configuracion incompleta o invalida.
    throw new Error(`config validator error: ${result.error.message}`);
}
const enVars = result.value;

// Expone nombres tipados y consistentes para el resto de la aplicacion.
export const envs ={
    port:enVars.PORT,
    productsMicroserviceHost:enVars.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicePort:enVars.PRODUCTS_MICROSERVICE_PORT,
    ordersMicroserviceHost:enVars.ORDERS_MICROSERVICE_HOST,
    ordersMicroservicePort:enVars.ORDERS_MICROSERVICE_PORT,
}as const;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postgresdatabase = void 0;
const typeorm_1 = require("typeorm");
const user_model_1 = require("./models/user.model");
const pet_post_model_1 = require("./models/pet-post.model");
/**
 * Clase para la conexión a la base de datos postgresSQL utilizando TypeORM
 *
 * @remarks
 * esta clase configura y administra la conexion a una base de datos, incluyendo la inicialización de las entidades : User y PetPost.
 *
 * La conexion se configura para sincronizar el esquema de la base de datos y utiliza SSL con `rejecrUnauthorized: false` para evitar errores en entornos de desarrollo.
 *
 * @example
 * ```typescript
 * const database = new PostgresDatabase({
 * host: 'localhost',
 * port: 5432,
 * username: 'postgres',
 * password: 'password',
 * database: 'mydatabase',
 *});
 * database.connect().then(() => {}).catch(() => {});
 * ```
 */
class Postgresdatabase {
    /**
     *  Crea una nueva instancia de la cpnexion a postgresSQL.
     * @param options  - opciones de configuracion para la conexions de la base de datos
     */
    constructor(options) {
        this.datasorce = new typeorm_1.DataSource({
            type: 'postgres',
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [user_model_1.User, pet_post_model_1.PetPost],
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }
    /**
     * Inicializa la conexion a la base de datos
     * @remarks
     * Este metodo inicializa la conexion a la base de datos y muestra un mensaje en consola si la conexion fue exitosa o si hubo un error.
     *
     * @returns Una promesa que se resuelve cuando la conexion es exitosa y se rechaza si hay un error.
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.datasorce.initialize();
                console.log('Connected to database 💪');
            }
            catch (error) {
                console.error('Error connecting to database 😢', error);
            }
        });
    }
}
exports.Postgresdatabase = Postgresdatabase;

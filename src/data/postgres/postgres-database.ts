import { DataSource } from 'typeorm';
import { User } from './models/user.model';
import { PetPost } from './models/pet-post.model';

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

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

export class Postgresdatabase {
  public datasorce: DataSource;

  /**
   *  Crea una nueva instancia de la cpnexion a postgresSQL.
   * @param options  - opciones de configuracion para la conexions de la base de datos
   */

  constructor(options: Options) {
    this.datasorce = new DataSource({
      type: 'postgres',
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      entities: [User, PetPost],
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

  async connect() {
    try {
      await this.datasorce.initialize();
      console.log('Connected to database 💪');
    } catch (error) {
      console.error('Error connecting to database 😢', error);
    }
  }
}

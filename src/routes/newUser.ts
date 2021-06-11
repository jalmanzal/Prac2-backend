// Dependencies
import Router from 'koa-router';
import SaveData from '../../controller/SaveData';
import UserDTO from '../../DTO/UserDTO';

// Assets
const router: Router = new Router();

// Method
router.post('/users', async (ctx: any) => {
  const DATOS: any = ctx.request.body;

  /**
   * Validates if fields have content
   */
  if (!DATOS.name || !DATOS.lastName || !DATOS.ssn || !DATOS.email
      || DATOS.age < 1 || !DATOS.password) {
    // eslint-disable-next-line no-nested-ternary
    const CAMPO: string = (!DATOS.name) ? 'nombre' : ((!DATOS.lastName) ? 'apellido paterno' : ((!DATOS.ssn)
      ? 'Numero de Seguro Social' : ((!DATOS.email) ? 'correo' : 'contraseña')));

    ctx.status = 400;
    ctx.body = {
      status: 'Invalid Content',
      message: (DATOS.age > 1) ? `El campo ${CAMPO} no puede ir vacío!` : 'Edad invalida!',
    };
  } else {
    const USERDTO: UserDTO = new UserDTO();

    USERDTO.setName(DATOS.name);
    USERDTO.setLastName(DATOS.lastName);
    USERDTO.setMotherLastName(DATOS.motherLastName);
    USERDTO.setSsn(DATOS.ssn);
    USERDTO.setEmail(DATOS.email);
    USERDTO.setAge(DATOS.age);
    USERDTO.setPassword(DATOS.password);

    /**
     * Save information and get an array with code and JSON to respond depending of status
     * @param USERDTO
     */
    [ctx.status, ctx.body] = await new SaveData(USERDTO).exec();
  }
});

export default router;

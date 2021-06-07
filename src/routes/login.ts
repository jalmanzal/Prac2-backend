import Router from 'koa-router';
import UserDTO from '../../DTO/UserDTO';
import ReadData from '../../controller/ReadData';

const router: Router = new Router();

router.post('/login', async (ctx) => {
  const DATOS = ctx.request.body;
  /**
   * Validates if fields have content
   */
  if (!DATOS.email || !DATOS.password) {
    const CAMPO: string = (!DATOS.email) ? 'correo' : 'contraseña';

    ctx.status = 400;
    ctx.body = {
      status: 'Invalid Content',
      message: `El campo ${CAMPO} no puede ir vacío!`,
    };
  } else {
    const USERDTO: UserDTO = new UserDTO();

    USERDTO.setEmail(DATOS.email);
    USERDTO.setPassword(DATOS.password);

    /**
     * Read information and get an array with code and JSON to respond depending of status
     * @param USERDTO
     */
    const RESPONSE: [number, object] = await new ReadData(USERDTO).exec();

    // eslint-disable-next-line prefer-destructuring
    ctx.status = RESPONSE[0];
    // eslint-disable-next-line prefer-destructuring
    ctx.body = RESPONSE[1];
  }
});

export default router;

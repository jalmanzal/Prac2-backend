import Router from 'koa-router';
import UserDTO from '../../DTO/UserDTO';
import ReadData from '../../controller/ReadData';

const router: Router = new Router();

router.post('/login', async (ctx: any) => {
  const DATOS: any = ctx.request.body;
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
    [ctx.status, ctx.body] = await new ReadData(USERDTO).exec();
  }
});

export default router;

import Router from "koa-router";
import {
  ControladorNuevaCredencial,
  ControladorNuevoUsuario,
} from "../../controller/controladorNuevoUsuario";

const router: Router = new Router();

router.post("/nuevo-usuario", async (ctx) => {
  const aux = { password: ctx.request.body.password };
  delete ctx.request.body.password;

  await new ControladorNuevoUsuario(ctx).exec();
  ctx.request.body = aux;
  await new ControladorNuevaCredencial(ctx).exec();
});

export default router;

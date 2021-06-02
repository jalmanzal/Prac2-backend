import Router from "koa-router";

const router: Router = new Router();

router.get("/hola", async (ctx) => {
  ctx.body = {
    status: "success",
    message: "Hola Mundo",
  };
});

export default router;

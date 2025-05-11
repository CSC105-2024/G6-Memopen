import { Hono } from "hono";
import { sendCookie } from "../controllers/cookies/sendCookies.ts";
import { sendSecureCookie } from "../controllers/cookies/sendSecureCookie.ts";
import { showCookies } from "../controllers/cookies/showCookies.ts";
import { decodeCookies } from "../controllers/cookies/decodeCookies.ts";
import { clearCookies } from "../controllers/cookies/clear.ts";
const cookiesRouter = new Hono();
cookiesRouter.get('/',sendCookie);
cookiesRouter.get('/secure',sendSecureCookie);
cookiesRouter.get('/show',showCookies);
cookiesRouter.get('/decode',decodeCookies);
cookiesRouter.get('/clear',clearCookies);

export default cookiesRouter;
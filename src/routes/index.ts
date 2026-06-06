import { Router } from "express";

import { refundsRoutes } from "./refunds-routes";
import { sessionsRoutes } from "./sessions-routes";
import { usersRoutes } from "./users-routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

routes.use("/refunds", refundsRoutes);
export { routes };

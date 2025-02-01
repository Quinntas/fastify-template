import {Context, Handler, Middleware} from "./types";
import {FastifySchema} from "fastify/types/schema";

export function middleware<C extends Context = Context, S extends FastifySchema = FastifySchema>(
    handler: Handler<S, C>
): Middleware<S, C> {
    return handler
}
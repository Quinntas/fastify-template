import {z} from "zod";
import {pgTable, serial} from "drizzle-orm/pg-core";
import {db} from "../../../../start/database";
import {controller} from "../../../../core/controller";

export const healthCheckController = controller({
        description: "Health check",
        tags: ["Utils"],
        response: {
            200: z.object({
                message: z.string(),
                uptime: z.number(),
            }),
        }
    },
    async (_, reply) => {
        await db.select().from(pgTable('users', {id:serial().primaryKey()}))

        return reply.status(200).send({
            message: "ok",
            uptime: process.uptime()
        })
    }
)

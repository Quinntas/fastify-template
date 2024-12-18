import {z} from "zod";
import {FastifyTypedInstance} from "./types";

export async function routes(app: FastifyTypedInstance) {
    app.post('/users', {
            schema: {
                description: "Create a new user",
                tags: ["Users"],
                body: z.object({
                    name: z.string(),
                    email: z.string().email(),
                }),
                response: {
                    201: z.object({
                        message: z.string(),
                    }),
                }
            }
        },
        async (req, reply) => {
            const {name, email} = req.body

            console.log(name, email)

            return reply.status(201).send({message: "User created successfully"})
        }
    )
}


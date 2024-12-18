import {fastify} from "fastify";
import {fastifyCors} from "@fastify/cors";
import {jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {fastifySwagger} from "@fastify/swagger";
import {fastifySwaggerUi} from "@fastify/swagger-ui";
import {FastifyTypedInstance} from "./types";
import {routes} from "./routes";

export const app: FastifyTypedInstance = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
    origin: "*",
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Fastify Template",
            description: "A template for Fastify projects",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

app.register(routes)

app.listen({port: 3000}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
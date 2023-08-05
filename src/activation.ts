import { Hono } from "hono";
import { Bindings } from "./utils/bindings";
import getPrisma from "./utils/prisma";

const activation = new Hono<{ Bindings: Bindings }>()

activation.get("/", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const keys = await prisma.activationKey.findMany()

    return c.json({
        message: "success",
        keys
    })
})

export default activation
import { z } from "zod";
import getPrisma from "../../utils/prisma";
import { createHandler } from "../../utils/app";

const schema = z.object({
    name: z.string()
})

const InsertCustomerHandler = createHandler(async (c) => {
    const data = await c.req.json()
    const validated = schema.safeParse(data)

    if (!validated.success) {
        return c.json({ error: validated.error.errors }, 400)
    }

    const prisma = getPrisma(c.env.DATABASE_URL)
    const customer = await prisma.customer.create({
        data: {
            name: validated.data.name
        }
    })

    return c.json({
        data: customer
    })
})

export default InsertCustomerHandler
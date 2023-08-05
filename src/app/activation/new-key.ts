import { z } from "zod"
import { generateActivationKey } from "../../utils/key";
import getPrisma from "../../utils/prisma";
import { createHandler } from "../../utils/app";

const Schema = z.object({
    customer: z.string()
})

const NewKeyHandler = createHandler(async (c) => {
    const data = await c.req.json()
    const validated = await Schema.safeParse(data)

    if (!validated.success) {
        return c.json({ error: validated.error.errors }, 400)
    }

    const prisma = getPrisma(c.env.DATABASE_URL)
    const customer = await prisma.customer.findFirst({ where: { id: validated.data.customer } })

    if (!customer) {
        return c.json({ error: "customer not found" }, 400)
    }

    const keyContent = await generateActivationKey(data.customer, c.env.APP_SECRET)
    const key = await prisma.activationKey.create({
        data: {
            value: keyContent,
            customer: {
                connect: {
                    id: data.customer
                }
            }
        }
    })

    return c.json({
        data: key
    })
})

export default NewKeyHandler
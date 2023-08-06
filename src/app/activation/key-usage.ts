import { z } from "zod";
import { createHandler } from "../../utils/app";
import getPrisma from "../../utils/prisma";

const schema = z.object({
    device: z.string()
})

const KeyUsageHandler = createHandler(async (c) => {
    const reqKey = c.req.param("key")

    const prisma = getPrisma(c.env.DATABASE_URL)
    const storedKey = await prisma.activationKey.findFirst({
        where: {
            value: reqKey
        },
        include: {
            usage: true
        }
    })

    if (!storedKey) {
        return c.json({ error: "key not found" }, 404)
    }

    const data = await c.req.json()
    const validated = await schema.safeParse(data)

    if (!validated.success) {
        return c.json({ error: validated.error.errors }, 400)
    }

    const active = storedKey.usage.find(use => use.active)

    if (active) {
        return c.json({
            error: "Key already in use"
        }, 400)
    }

    await prisma.keyUsage.create({
        data: {
            device: validated.data.device,
            key: {
                connect: {
                    id: storedKey.id
                }
            }
        }
    })

    return c.json({
        key: storedKey
    })
})

export default KeyUsageHandler
import getPrisma from "../../utils/prisma";
import { createHandler } from "../../utils/app";

const KeyStatusHandler = createHandler(async (c) => {
    const reqKey = c.req.param("key")

    const prisma = getPrisma(c.env.DATABASE_URL)
    const storedKey = await prisma.activationKey.findFirst({
        where: {
            value: reqKey
        }
    })

    if (!storedKey) {
        return c.json({ error: "key not found" }, 404)
    }

    return c.json({
        data: {
            valid: true,
            key: storedKey.value
        }
    })
})

export default KeyStatusHandler
import getPrisma from "../../utils/prisma";
import { createHandler } from "../../utils/app";

const ListCustomersHandler = createHandler(async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    const customers = await prisma.customer.findMany()

    return c.json({
        data: customers
    })
})

export default ListCustomersHandler
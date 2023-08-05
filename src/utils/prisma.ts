import { PrismaClient } from "@prisma/client/edge";

export default function getPrisma(url: string) {
    return new PrismaClient({
        datasources: {
            db: {
                url
            }
        }
    })
}
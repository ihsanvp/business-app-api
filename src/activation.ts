import { Hono } from "hono";

const activation = new Hono()

activation.get("/", async (c) => {
    return c.json({
        message: "success"
    })
})

export default activation
import { Hono } from 'hono'
import activation from './activation'

const app = new Hono()

app.route("/activation", activation)

app.get('/', async (c) => {
    return c.json({
        name: "business-app-api",
        version: "0.0.0"
    })
})

export default app

import { Hono } from 'hono'
import ActivationRouter from './app/activation/router'
import CustomersRouter from "./app/customer/router"

const app = new Hono()

app.route("/activation", ActivationRouter)
app.route("/customers", CustomersRouter)

app.get('/', async (c) => {
    return c.json({
        name: "business-app-api",
        version: "0.0.0"
    })
})

export default app

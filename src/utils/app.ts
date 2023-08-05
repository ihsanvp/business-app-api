import { Handler, Hono } from "hono";
import { Bindings } from "./bindings";

export function createRouter() {
    return new Hono<{ Bindings: Bindings }>()
}

export function createHandler(handler: Handler<{ Bindings: Bindings }>): Handler {
    return handler
}
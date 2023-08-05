import { createRouter } from "../../utils/app";
import KeyStatusHandler from "./key-status";
import NewKeyHandler from "./new-key";

const ActivationRouter = createRouter()

ActivationRouter.post("/key/new", NewKeyHandler)
ActivationRouter.get("/status/:key", KeyStatusHandler)

export default ActivationRouter
import { createRouter } from "../../utils/app";
import KeyStatusHandler from "./key-status";
import KeyUsageHandler from "./key-usage";
import NewKeyHandler from "./new-key";

const ActivationRouter = createRouter()

ActivationRouter.post("/key", NewKeyHandler)
ActivationRouter.post("/:key/usage", KeyUsageHandler)
ActivationRouter.get("/:key", KeyStatusHandler)

export default ActivationRouter
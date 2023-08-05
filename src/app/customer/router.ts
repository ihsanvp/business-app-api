import { createRouter } from "../../utils/app";
import InsertCustomerHandler from "./insert-customer";
import ListCustomersHandler from "./list-customers";

const CustomerRouter = createRouter()

CustomerRouter.get("/", ListCustomersHandler)
CustomerRouter.post("/", InsertCustomerHandler)

export default CustomerRouter
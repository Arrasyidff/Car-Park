const routes = require("express").Router()
const SlotsController = require("../controllers/SlotController")
const CarController = require("../controllers/CarController")

routes.post("/addSlot", SlotsController.addSlot)
routes.delete("/deleteSlot/:id", SlotsController.deleteSlot)

routes.post("/enter", CarController.enterCar)
routes.delete("/exit/:id", CarController.exitCar)

module.exports = routes
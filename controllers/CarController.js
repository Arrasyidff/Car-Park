const {Users, Slots} = require("../models")

class CarController {
    static async enterCar(req, res, next) {
        try {
            const {name, car_name, plats, slot_id} = req.body
            const dataSlot = await Slots.findByPk(slot_id,
                {include: [Users]}
            )
            if (dataSlot) {
                if (dataSlot.Users.length >= dataSlot.quota) {
                    next({
                        name: "Full Slot"
                    })
                } else {
                    const dataCar = await Users.create({name, car_name, plats, slot_id})
                    res.status(201).json(dataCar)
                }
            } else {
                next({name: "Slot Not Found"})
            }
        } catch (error) {
            next(error)
        }
    }

    static async exitCar(req, res, next) {
        try {
            const {id} = req.params
            const result = await Users.destroy({where: {id}})
            res.status(200).json({msg: "Success Delete"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CarController
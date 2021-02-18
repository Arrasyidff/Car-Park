const { Slots } = require("../models")

class SlotsController {
    static async addSlot(req, res, next) {
        const {name, quota} = req.body
        try {
            const data = await Slots.create({name, quota})
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteSlot(req, res, next) {
        try {
            const { id } = req.params
            const data = await Slots.destroy({where: {
                id
            }})
            res.status(200).json({msg: "Success Delete"})
        } catch (error) {
            next(error)   
        }
    }
}

module.exports = SlotsController
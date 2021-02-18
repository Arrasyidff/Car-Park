module.exports = (err, req, res, next) => {
    if (err.name === "SequelizeValidationError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "Full Slot") {
        res.status(401).json({msg: err.name})
    } else if(err.name === "Slot Not Found") {
        res.status(404).json({msg: err.name})
    } else {
        res.status(500).json({msg: "Internal Service Error"})
    }
}
const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

afterAll((done) => {
    queryInterface.bulkDelete("Slots")
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

let idSlot = ""
let idCars = ""

describe("POST slot /add slot", () => {
    describe("Adding slot", () => {
        test("response success", (done) => {
            request(app)
            .post("/addSlot")
            .send({name: "A", quota: 5})
            .end((err, res) => {
                const {body, status} = res
                idSlot = body.id
                if (err) {
                    return done(err)
                }
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "A")
                expect(body).toHaveProperty("quota", 5)
                done()
            })
        })
    })
    
    describe("Adding slot", () => {
        test("response error if name unique", (done) => {
            request(app)
            .post("/addSlot")
            .send({name: "A", quota: 5})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "name must be unique")
                done()
            })
        })
    })

    describe("Adding slot", () => {
        test("response error if name empty", (done) => {
            request(app)
            .post("/addSlot")
            .send({name: "", quota: 5})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "name cant be empty")
                done()
            })
        })
    })

    describe("Adding slot", () => {
        test("response error if name not UpperCase", (done) => {
            request(app)
            .post("/addSlot")
            .send({name: "a", quota: 5})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "name must be uppercase")
                done()
            })
        })
    })

    describe("Adding slot", () => {
        test("response error if quota not more than equal 5", (done) => {
            request(app)
            .post("/addSlot")
            .send({name: "A", quota: 3})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "quota must be more than equal 5")
                done()
            })
        })
    })

    describe("Adding slot", () => {
        test("response error if quota not integer", (done) => {
            request(app)
            .post("/addSlot")
            .send({name: "A", quota: "sdc"})
            .end((err, res) => {
                const {body, status} = res
                if (err) {
                    return done(err)
                }
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "quota must be number")
                done()
            })
        })
    })
})


describe("POST Car /post car", () => {
    describe("adding Car", () => {
        test("response success", (done) => {
            request(app)
            .post("/enter")
            .send({name: "Tony", car_name: "Jazz", plats: "DK 12345 FA", slot_id: idSlot})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                idCars = body.id
                expect(status).toBe(201)
                expect(body).toHaveProperty("name", "Tony")
                expect(body).toHaveProperty("car_name", "Jazz")
                expect(body).toHaveProperty("plats", "DK 12345 FA")
                expect(body).toHaveProperty("slot_id", idSlot)
                done()
            })
        })
    })

    describe("adding Car", () => {
        test("response error if plats unique", (done) => {
            request(app)
            .post("/enter")
            .send({name: "Tony", car_name: "Jazz", plats: "DK 12345 FA", slot_id: 0})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(404)
                expect(body).toHaveProperty("msg", "Slot Not Found")
                done()
            })
        })
    })

    describe("adding Car", () => {
        test("response error if plats unique", (done) => {
            request(app)
            .post("/enter")
            .send({name: "Tony", car_name: "Jazz", plats: "DK 12345 FA", slot_id: idSlot})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "plats must be unique")
                done()
            })
        })
    })

    describe("adding Car", () => {
        test("response error if name empty", (done) => {
            request(app)
            .post("/enter")
            .send({name: "", car_name: "Jazz", plats: "DK 12345 FA", slot_id: idSlot})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "name cant be empty")
                done()
            })
        })
    })

    describe("adding Car", () => {
        test("response error if car_name empty", (done) => {
            request(app)
            .post("/enter")
            .send({name: "Tony", car_name: "", plats: "DK 12345 FA", slot_id: idSlot})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "car_name cant be empty")
                done()
            })
        })
    })

    describe("adding Car", () => {
        test("response error if plats empty", (done) => {
            request(app)
            .post("/enter")
            .send({name: "Tony", car_name: "Jazz", plats: "", slot_id: idSlot})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg", "plat cant be empty")
                done()
            })
        })
    })
    
})

describe("DELETE cars /delete cars", () => {
    describe("delete cars", () => {
        test("success delete", (done) => {
            request(app)
            .delete(`/exit/${idCars}`)
            .send({name: "A", quota: 5})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(200)
                expect(body).toHaveProperty("msg", "Success Delete")
                done()
            })
        })
    })
})

describe("DELETE slot /delete slot", () => {
    describe("delete slot", () => {
        test("success delete", (done) => {
            request(app)
            .delete(`/deleteSlot/${idSlot}`)
            .send({name: "A", quota: 5})
            .end((err, res) => {
                const {body, status} = res
                if (err) return done(err)
                expect(status).toBe(200)
                expect(body).toHaveProperty("msg", "Success Delete")
                done()
            })
        })
    })
})
// process.env.NODE_ENV = "test";

// const { expect } = require("chai");
// const request = require("supertest");
// const app = require("../app");

// describe("API de productos de Luna's Barber Studio", () => {
//     const BARBER_API_KEY = "BARBER_SECURE_AUTH_KEY_2026";

//     it("rechaza solicitudes sin API Key con código 401", async () => {
//         const respuesta = await request(app).get("/api/productos");

//         expect(respuesta.status).to.equal(401);
//         expect(respuesta.body).to.include({
//             status: "error",
//             codigo: 401,
//         });
//         expect(respuesta.body.mensaje).to.be.a("string");
//     });

//     it("rechaza solicitudes con una API Key inválida con código 401", async () => {
//         const respuesta = await request(app)
//             .get("/api/productos")
//             .set("x-api-key", "clave-invalida");

//         expect(respuesta.status).to.equal(401);
//         expect(respuesta.body.status).to.equal("error");
//         expect(respuesta.body.codigo).to.equal(401);
//     });

//     it("devuelve la lista de productos correctamente con la API Key válida", async () => {
//         const respuesta = await request(app)
//             .get("/api/productos")
//             .set("x-api-key", BARBER_API_KEY);

//         expect(respuesta.status).to.equal(200);
//         expect(respuesta.body.status).to.equal("success");
//         expect(respuesta.body.codigo).to.equal(200);
//         expect(respuesta.body.total).to.equal(3);
//         expect(respuesta.body.data).to.be.an("array").that.is.not.empty;
//         expect(respuesta.body.data[0]).to.have.property("nombre", "Fussion Pomade");
//     });
// });

process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");

describe("API de productos de Luna's Barber Studio", () => {
    const BARBER_API_KEY = "BARBER_SECURE_AUTH_KEY_2026";

    it("rechaza solicitudes sin API Key con código 401", async () => {
        const respuesta = await request(app).get("/api/productos");

        expect(respuesta.status).to.equal(401);
        expect(respuesta.body).to.include({
            status: "error",
            codigo: 401,
        });
        expect(respuesta.body.mensaje).to.be.a("string");
    });

    it("rechaza solicitudes con una API Key inválida con código 401", async () => {
        const respuesta = await request(app)
            .get("/api/productos")
            .set("x-api-key", "clave-invalida");

        expect(respuesta.status).to.equal(401);
        expect(respuesta.body.status).to.equal("error");
        expect(respuesta.body.codigo).to.equal(401);
    });

    it("devuelve la lista de productos correctamente con la API Key válida", async () => {
        const respuesta = await request(app)
            .get("/api/productos")
            .set("x-api-key", BARBER_API_KEY);

        expect(respuesta.status).to.equal(200);
        expect(respuesta.body.status).to.equal("success");
        expect(respuesta.body.codigo).to.equal(200);
        expect(respuesta.body.total).to.equal(3);
        expect(respuesta.body.data).to.be.an("array").that.is.not.empty;
        expect(respuesta.body.data[0]).to.have.property("nombre", "Fussion Pomade");
    });
});
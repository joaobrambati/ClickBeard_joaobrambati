import express from "express";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerJsdoc from "swagger-jsdoc";
import barbeiroRoutes from "../clickbeardapi/routes/BarbeiroRoutes";
import usuarioRoutes from "../clickbeardapi/routes/UsuarioRoutes";
import especialidadeRoutes from "../clickbeardapi/routes/EspecialidadeRoutes";
import especialidadeBarbeiroRoutes from "../clickbeardapi/routes/barbeiroEspecialidadeRoutes";

const app = express();
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ClickBeard API",
      version: "1.0.0",
      description: "Documentação da API de agendamento da barbearia"
    }
  },
  apis: ["./src/clickbeardapi/controllers/*.ts"]
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/barbeiros", barbeiroRoutes)
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/especialidades", especialidadeRoutes)
app.use("/api/especialidadesBarbeiros", especialidadeBarbeiroRoutes)

app.listen(4000, () => console.log("Servidor rodando na porta 4000"));

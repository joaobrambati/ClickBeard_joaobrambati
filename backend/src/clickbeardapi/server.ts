import express from "express";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import swaggerJsdoc from "swagger-jsdoc";

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
  apis: ["./src/clickbeardapi/routes/*.ts"] // caminho dos arquivos com comentários
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("API ClickBeard rodando 🚀");
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

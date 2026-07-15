import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

// Permite que o front-end envie dados e entenda formato JSON
app.use(cors());
app.use(express.json());

// Rota 1: Receber os dados do formulário e SALVAR no Banco de Dados
app.post("/denuncias", async (req, res) => {
  try {
    const { nome, localizacao, ocorrencia, descricao } = req.body;

    // Salvando de verdade no SQLite através do Prisma
    const novaDenuncia = await prisma.denuncia.create({
      data: {
        nome,
        localizacao,
        ocorrencia,
        descricao
      }
    });

    // Devolve uma resposta de sucesso para o front-end
    return res.status(201).json(novaDenuncia);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno ao salvar denúncia." });
  }
});

// Rota 2: Listar todas as denúncias (Essa rota vai alimentar o seu Dashboard depois!)
app.get("/denuncias", async (req, res) => {
  try {
    const lista = await prisma.denuncia.findMany({
      orderBy: { data: "desc" } // Mostra as mais recentes primeiro
    });
    return res.json(lista);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar denúncias." });
  }
});

// Inicializa o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🛡️ Servidor da PMESP rodando com sucesso na porta ${PORT}!`);
});
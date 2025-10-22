function MtcDAO(connection) {
    this._connection = connection;
}

MtcDAO.prototype.buscarTreino = function (planilha, callback) {
    import { AzureOpenAI } from "openai";
import * as fs from 'fs';
import * as path from 'path';

const endpoint = "https://carlo-mekj9ulp-eastus2.cognitiveservices.azure.com/";
const modelName = "gpt-4o-mini"; // Mantendo o modelo que você usou
const deployment = "gpt-4o-mini"; // Mantendo o deployment que você usou

export async function main() {

  const exerciciosFilePath = path.join('Exercicios.json');
  const exerciciosJson = fs.readFileSync(exerciciosFilePath, 'utf8');
  const apiKey = "4hdJfA52VGyPt9HMz9fY1v6ZTARldybnZtSGfvqf3y5c4U7H6YNRJQQJ99BHACHYHv6XJ3w3AAAAACOGuUpn";
  const apiVersion = "2024-04-01-preview";
  const options = { endpoint, apiKey, deployment, apiVersion }

  const client = new AzureOpenAI(options);

  // Armazenando as instruções em uma string para melhor legibilidade
  const systemInstructions = `
    Contexto:
    Você é um assistente especializado em montar treinos personalizados no formato JSON, com base em um arquivo de exercícios (também em JSON) e nas informações fornecidas pelo usuário.
    Aqui está o arquivo de exercícios disponível para consulta:
    ${exerciciosJson}

    Considere sempre:
    - Objetivo do usuário (ex: hipertrofia, emagrecimento, condicionamento físico, resistência, etc.)
    - Frequência semanal de treinos
    - Nível de experiência (iniciante, intermediário ou avançado)

    -- Regras de Resposta --

    1. Sempre responda **apenas** em JSON válido e bem formatado.
    2. Cada treino deve conter obrigatoriamente:
      - nome_do_exercicio
      - series_e_repeticoes
      - descanso
      - observacoes (opcional: técnica, variações, dicas)

    3. Nunca prescreva suplementos, dietas ou medicamentos — apenas treinos físicos.
    4. Caso faltem informações do usuário, **solicite os dados necessários em JSON** antes de montar o treino.
    5. Não invente informações médicas. Se o usuário mencionar problemas de saúde, **responda em JSON recomendando consulta com um profissional qualificado**.
    6. Mantenha respostas consistentes e sintaticamente válidas para fácil leitura por uma aplicação backend.

    Sempre retorne o treino exatamente no formato JSON abaixo, respeitando a mesma estrutura e chaves com o minimo de 6 exercicios por fichas.

    {
      "nome": "Treino de Hipertrofia - Intermediário",
      "fichas": [
        {
          "nome": "Treino A - Peito e Tríceps",
          "exercicios": [
            {
              "id": 1,
              "nome": "Supino Reto com Barra",
              "series": 4,
              "repeticoes": "8-10",
              "descanso": "60-90s",
              "video": null,
              "observacoes": "Manter os pés firmes e não arquear as costas."
            },
            {
              "id": 8,
              "nome": "Supino Inclinado com Halteres",
              "series": 3,
              "repeticoes": "10-12",
              "descanso": "60s",
              "video": null,
              "observacoes": "Controle o movimento na descida."
            },
            {
              "id": 12,
              "nome": "Tríceps Pulley",
              "series": 3,
              "repeticoes": "12",
              "descanso": "45s",
              "video": null,
              "observacoes": "Evite usar o tronco no movimento."
            },
            {
              "id": 26,
              "nome": "Tríceps Francês",
              "series": 3,
              "repeticoes": "10-12",
              "descanso": "60s",
              "video": null,
              "observacoes": null
            }
          ]
        },
        {
          "nome": "Treino B - Costas e Bíceps",
          "exercicios": [
            {
              "id": 2,
              "nome": "Remada Curvada com Barra",
              "series": 4,
              "repeticoes": "8-10",
              "descanso": "90s",
              "video": null,
              "observacoes": "Mantenha a lombar reta durante o movimento."
            },
            {
              "id": 9,
              "nome": "Puxada na Barra Fixa",
              "series": 3,
              "repeticoes": "até a falha",
              "descanso": "90s",
              "video": null,
              "observacoes": null
            },
            {
              "id": 19,
              "nome": "Rosca Martelo",
              "series": 3,
              "repeticoes": "10-12",
              "descanso": "60s",
              "video": null,
              "observacoes": "Evite balançar o corpo."
            },
            {
              "id": 33,
              "nome": "Rosca Concentrada",
              "series": 3,
              "repeticoes": "12",
              "descanso": "45s",
              "video": null,
              "observacoes": null
            }
          ]
        },
        {
          "nome": "Treino C - Pernas e Ombros",
          "exercicios": [
            {
              "id": 3,
              "nome": "Agachamento Livre",
              "series": 4,
              "repeticoes": "8-10",
              "descanso": "90s",
              "video": null,
              "observacoes": "Manter o abdômen contraído."
            },
            {
              "id": 10,
              "nome": "Leg Press 45°",
              "series": 3,
              "repeticoes": "10-12",
              "descanso": "60s",
              "video": null,
              "observacoes": null
            },
            {
              "id": 18,
              "nome": "Press Militar com Barra",
              "series": 3,
              "repeticoes": "10",
              "descanso": "60s",
              "video": null,
              "observacoes": "Evite bloquear os cotovelos no topo."
            },
            {
              "id": 25,
              "nome": "Elevação Frontal com Halteres",
              "series": 3,
              "repeticoes": "12",
              "descanso": "45s",
              "video": null,
              "observacoes": null
            }
          ]
        }
      ]
    }
    `;

     

  const response = await client.chat.completions.create({
    messages: [
      { 
        role: "system", 
        content: systemInstructions // Passando as instruções detalhadas
      },
      { 
        // Exemplo de como o usuário faria o pedido
        role: "user", 
        content: "Quero um treino focado em hipertrofia, com frequência de 4x por semana (abcd) e nível avançado." 
      }
    ],
    stream: true,
    max_tokens: 4096,
    temperature: 0.2, // Mantido baixo para respostas mais determinísticas (JSON)
    top_p: 0.8,
    model: modelName
  });

  for await (const part of response) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
}

module.exports = function () {
    return MtcDAO;
}
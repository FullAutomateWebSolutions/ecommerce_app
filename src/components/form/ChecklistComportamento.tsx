import React, { useEffect, useState } from "react";
import {
  Form,
  Checkbox,
  Button,
  Typography,
  Divider,
  Card,
  Modal,
  Input,
  FloatButton,
  Popconfirm,
  message,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const { Title } = Typography;
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { isArrayBuffer } from "util/types";
import { randomUUID } from "crypto";

const categorias = {
  "Linguagem Corporal": [
    "🙅‍♂️ Braços cruzados (defensivo/fechado)",
    "🦵 Pernas cruzadas apontando para fora (quer ir embora)",
    "➡️ Inclinar corpo para frente (interesse)",
    "⬅️ Inclinar corpo para trás (afastamento)",
    "🤔 Cabeça inclinada de lado (empatia/escuta)",
    "🙈 Olhar que foge (insegurança ou mentira)",
    "👀 Olhar fixo demais (desafio/intimidação)",
    "😊 Sorriso com olhos (alegria genuína)",
    "🙂 Sorriso só de boca (social/forçado)",
  ],
  "Emoções Universais": [
    "😡 Raiva (sobrancelhas franzidas, boca dura)",
    "😱 Medo (olhos arregalados, boca aberta)",
    "😢 Tristeza (olhar baixo, boca caída)",
    "😃 Alegria (sorriso amplo, rugas nos olhos)",
    "😲 Surpresa (sobrancelhas levantadas, boca aberta)",
    "🤢 Nojo (nariz franzido, lábio superior levantado)",
    "😒 Desprezo (canto da boca levantado de um lado)",
  ],
  Comunicação: [
    "📢 Tom de voz mais grave (autoridade/confiança)",
    "🎤 Tom de voz mais agudo (nervosismo)",
    "⏸️ Pausas longas (reflexão ou ganhar tempo)",
    "⏩ Fala muito rápida (ansiedade/convencer)",
    "😅 Riso nervoso (alívio de tensão)",
  ],
  "Dinâmica Social": [
    "🤝 Espelhamento de gestos (empatia/sintonia)",
    "🙅‍♀️ Não-espelhamento (falta de conexão)",
    "🤫 Grupo em silêncio (discordância ou espera de liderança)",
    "🗣️ Interrupções constantes (disputa de poder)",
    "✋ Toque físico leve (aproximação/confiança)",
  ],
  "Pessoas Tóxicas": [
    "🙃 Ironia constante (agressividade disfarçada)",
    "😏 Elogio com crítica embutida (manipulação sutil)",
    "😭 Vitimismo frequente (busca por atenção)",
    "❌ Nunca assume erros (negação)",
    "🎭 Controla pela culpa (faz você se sentir errado)",
  ],
};

 interface IAjudaProp {
  ativar: boolean
 }

export const AjudaAnalise = ({ativar} : IAjudaProp)=>{
  const [visible, setVisible] = useState(ativar);

  return (
    <>
      {/* Botão flutuante no canto inferior direito */}
      <FloatButton
        icon={<InfoCircleOutlined />}
        tooltip={<div>Como funciona a análise?</div>}
        onClick={() => setVisible(true)}
      />

      {/* Modal com a explicação */}
      <Modal
        title="Como funciona a análise"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <p>
          <b>Transformação de sinais:</b> Cada sinal observado é traduzido em
          um traço psicológico (defensivo, empático, dominante, etc).
        </p>
        <p>
         <b>Resumo geral:</b> O sistema gera uma leitura consolidada da
          pessoa, como: <i>"Defensivo, Vulnerável e Competitivo"</i>.
        </p>
        <p>
          <b>Estratégias práticas:</b> As recomendações vêm de estudos de
          psicologia da comunicação (<b>Carl Rogers</b>, <b>Paul Ekman</b>,
          análise transacional, <b>PNL</b>).
        </p>
        <p>
         <b>Extensível:</b> Podemos adicionar pontuações e até perfis
          dominantes. Exemplo: <i>70% defensivo, 30% empático</i>.
        </p>
      </Modal>
    </>
  );
};

// Função para gerar perfil baseado nas respostas
const gerarPerfil = (respostas: any) => {
  const traços: string[] = [];
  const estrategias: string[] = [];

  // --- Linguagem Corporal ---
  if (
    respostas["Linguagem Corporal"]?.some(
      (s: string) =>
        s.includes("Braços cruzados") ||
        s.includes("Inclinar corpo para trás") ||
        s.includes("Olhar que foge")
    )
  ) {
    traços.push("Defensivo/Fechado");
    estrategias.push("Use empatia, perguntas abertas e não pressione.");
  }
  if (
    respostas["Linguagem Corporal"]?.some(
      (s: string) =>
        s.includes("Inclinar corpo para frente") ||
        s.includes("Cabeça inclinada")
    )
  ) {
    traços.push("Aberto/Interessado");
    estrategias.push(
      "Mantenha conexão, valorize a escuta e incentive participação."
    );
  }
  if (
    respostas["Linguagem Corporal"]?.some((s: string) =>
      s.includes("Olhar fixo demais")
    )
  ) {
    traços.push("Dominante/Competitivo");
    estrategias.push(
      "Seja firme, mantenha contato visual equilibrado e imponha respeito."
    );
  }
  if (
    respostas["Linguagem Corporal"]?.some((s: string) =>
      s.includes("Sorriso com olhos")
    )
  ) {
    traços.push("Positivo/Autêntico");
    estrategias.push("Reforce a relação e mantenha um tom de colaboração.");
  }

  // --- Emoções Universais ---
  if (
    respostas["Emoções Universais"]?.some(
      (s: string) =>
        s.includes("Raiva") || s.includes("Nojo") || s.includes("Desprezo")
    )
  ) {
    traços.push("Hostil/Resistente");
    estrategias.push(
      "Não confronte diretamente, valide a emoção e redirecione."
    );
  }
  if (
    respostas["Emoções Universais"]?.some(
      (s: string) => s.includes("Medo") || s.includes("Tristeza")
    )
  ) {
    traços.push("Vulnerável/Inseguro");
    estrategias.push("Ofereça segurança, escuta ativa e evite julgamentos.");
  }
  if (
    respostas["Emoções Universais"]?.some((s: string) => s.includes("Alegria"))
  ) {
    traços.push("Engajado/Positivo");
    estrategias.push("Mantenha o entusiasmo e use reforço positivo.");
  }

  // --- Comunicação ---
  if (respostas["Comunicação"]?.some((s: string) => s.includes("grave"))) {
    traços.push("Confiante/Autoritário");
    estrategias.push("Mostre respeito, mas não se intimide.");
  }
  if (
    respostas["Comunicação"]?.some(
      (s: string) => s.includes("agudo") || s.includes("rápida")
    )
  ) {
    traços.push("Ansioso/Inseguro");
    estrategias.push("Reduza a velocidade da conversa, transmita calma.");
  }
  if (respostas["Comunicação"]?.some((s: string) => s.includes("pausas"))) {
    traços.push("Reflexivo/Estrategista");
    estrategias.push("Dê tempo para resposta, não pressione.");
  }

  // --- Dinâmica Social ---
  if (
    respostas["Dinâmica Social"]?.some((s: string) =>
      s.includes("Espelhamento")
    )
  ) {
    traços.push("Empático/Conectado");
    estrategias.push("Aproveite a sintonia e aprofunde o vínculo.");
  }
  if (
    respostas["Dinâmica Social"]?.some(
      (s: string) =>
        s.includes("Não-espelhamento") || s.includes("Interrupções")
    )
  ) {
    traços.push("Competitivo/Desconectado");
    estrategias.push(
      "Mantenha postura firme e estabeleça regras de interação."
    );
  }
  if (
    respostas["Dinâmica Social"]?.some((s: string) => s.includes("silêncio"))
  ) {
    traços.push("Cauteloso/Observador");
    estrategias.push("Convide à fala com perguntas abertas, não force.");
  }

  // --- Pessoas Tóxicas ---
  if (respostas["Pessoas Tóxicas"]?.length > 0) {
    traços.push("Comportamento Tóxico");
    estrategias.push(
      "Estabeleça limites claros, evite entrar em manipulações emocionais."
    );
  }

  // --- Resumo Final ---
  const resumo =
    traços.length > 0 ? [...new Set(traços)] : ["Neutro / Não identificado"];
  const plano =
    estrategias.length > 0
      ? [...new Set(estrategias)]
      : ["Continue observando antes de decidir."];

  return {
    resumo,
    estrategias: plano,
  };
};

const gerarPerfilScore = (respostas: any) => {
  // inicializa pontuações
  const scores: Record<string, number> = {
    "Defensivo/Fechado": 0,
    "Aberto/Interessado": 0,
    "Dominante/Competitivo": 0,
    "Vulnerável/Inseguro": 0,
    "Positivo/Engajado": 0,
    "Hostil/Tóxico": 0,
    "Empático/Conectado": 0,
    "Reflexivo/Estrategista": 0,
  };

  const estrategias: string[] = [];

  // --- Linguagem Corporal ---
  if (respostas["Linguagem Corporal"]) {
    respostas["Linguagem Corporal"].forEach((s: string) => {
      if (
        s.includes("Braços cruzados") ||
        s.includes("Inclinar corpo para trás") ||
        s.includes("Olhar que foge")
      ) {
        scores["Defensivo/Fechado"] += 2;
      }
      if (
        s.includes("Inclinar corpo para frente") ||
        s.includes("Cabeça inclinada")
      ) {
        scores["Aberto/Interessado"] += 2;
      }
      if (s.includes("Olhar fixo demais")) {
        scores["Dominante/Competitivo"] += 2;
      }
      if (s.includes("Sorriso com olhos")) {
        scores["Positivo/Engajado"] += 2;
      }
      if (s.includes("Sorriso só de boca")) {
        scores["Defensivo/Fechado"] += 1; // sorriso forçado sugere fechamento
      }
    });
  }

  // --- Emoções Universais ---
  if (respostas["Emoções Universais"]) {
    respostas["Emoções Universais"].forEach((s: string) => {
      if (s.includes("Raiva") || s.includes("Nojo") || s.includes("Desprezo")) {
        scores["Hostil/Tóxico"] += 3;
      }
      if (s.includes("Medo") || s.includes("Tristeza")) {
        scores["Vulnerável/Inseguro"] += 2;
      }
      if (s.includes("Alegria")) {
        scores["Positivo/Engajado"] += 3;
      }
      if (s.includes("Surpresa")) {
        scores["Reflexivo/Estrategista"] += 1; // surpresa pode ser adaptação rápida
      }
    });
  }

  // --- Comunicação ---
  if (respostas["Comunicação"]) {
    respostas["Comunicação"].forEach((s: string) => {
      if (s.includes("grave")) {
        scores["Dominante/Competitivo"] += 2;
      }
      if (s.includes("agudo") || s.includes("rápida")) {
        scores["Vulnerável/Inseguro"] += 2;
      }
      if (s.includes("pausas")) {
        scores["Reflexivo/Estrategista"] += 2;
      }
      if (s.includes("Riso nervoso")) {
        scores["Vulnerável/Inseguro"] += 1;
      }
    });
  }

  // --- Dinâmica Social ---
  if (respostas["Dinâmica Social"]) {
    respostas["Dinâmica Social"].forEach((s: string) => {
      if (s.includes("Espelhamento")) {
        scores["Empático/Conectado"] += 3;
      }
      if (s.includes("Não-espelhamento") || s.includes("Interrupções")) {
        scores["Dominante/Competitivo"] += 2;
      }
      if (s.includes("silêncio")) {
        scores["Defensivo/Fechado"] += 1;
        scores["Reflexivo/Estrategista"] += 1;
      }
      if (s.includes("Toque físico")) {
        scores["Aberto/Interessado"] += 1;
      }
    });
  }

  // --- Pessoas Tóxicas ---
  if (respostas["Pessoas Tóxicas"]) {
    respostas["Pessoas Tóxicas"].forEach(() => {
      scores["Hostil/Tóxico"] += 3;
    });
  }

  // --- Determinar perfil dominante ---
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [perfilDominante, scoreMax] = sorted[0];

  // --- Estratégias baseadas no perfil dominante ---
  switch (perfilDominante) {
    case "Defensivo/Fechado":
      estrategias.push("Use empatia, perguntas abertas e não pressione.");
      break;
    case "Aberto/Interessado":
      estrategias.push(
        "Mantenha conexão, valorize a escuta e incentive participação."
      );
      break;
    case "Dominante/Competitivo":
      estrategias.push(
        "Seja firme, mantenha postura e imponha respeito sem confrontar."
      );
      break;
    case "Vulnerável/Inseguro":
      estrategias.push("Ofereça segurança, escuta ativa e evite julgamentos.");
      break;
    case "Positivo/Engajado":
      estrategias.push("Reforce entusiasmo e mantenha colaboração.");
      break;
    case "Hostil/Tóxico":
      estrategias.push(
        "Estabeleça limites claros, evite entrar em manipulações emocionais."
      );
      break;
    case "Empático/Conectado":
      estrategias.push("Aproveite a sintonia e aprofunde o vínculo.");
      break;
    case "Reflexivo/Estrategista":
      estrategias.push("Dê tempo, respeite silêncios e não pressione.");
      break;
    default:
      estrategias.push("Continue observando antes de decidir.");
  }

  return {
    scores,
    perfilDominante,
    scoreMax,
    estrategias,
  };
};

interface IResumo {
  resumo: string[];
  estrategias: string[] ;
}

interface IResumoScore {
  scores: Record<string, number>;
  perfilDominante: string;
  scoreMax: number;
  estrategias: string[];
}

interface IHistorico {
  uuid: string;
  apelido: string;
  resultado: any;
  perfilScore: IResumoScore;
  data: string;
}

const ChecklistComportamento: React.FC = () => {
  const [form] = Form.useForm();
  const [resultado, setResultado] = useState<any>(null);
  const [perfil, setPerfil] = useState<IResumo | null>(null);
  const [perfilScore, setPerfilScore] = useState<IResumoScore | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [apelido, setApelido] = useState("");

  const [historico, setHistorico] = useState<IHistorico[]>([]);
  const [editando, setEditando] = useState<IHistorico | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("analise");
    if (data) setHistorico(JSON.parse(data));
    
  }, []);

    const atualizarStorage = (novo: IHistorico[]) => {
    setHistorico(novo);
    localStorage.setItem("analise", JSON.stringify(novo));
  };

  const onFinish = (values: any) => {
    setResultado(values);
    setPerfil(gerarPerfil(values));
    setPerfilScore(gerarPerfilScore(values));
    setShowForm(false); // esconde formulário e mostra análise
  };

   const handleSalvarApelido = () => {
    if (!apelido) {
      message.warning("Digite um apelido");
      return;
    }

    if (editando) {
      // atualização
      const atualizado = historico.map((h) =>
        h.uuid === editando.uuid ? { ...h, apelido, resultado, perfilScore } : h
      );
      //@ts-ignore
      atualizarStorage(atualizado);
      setEditando(null);
    } else {
      // inclusão
      if (!perfilScore) {
        message.error("Perfil não gerado. Refazer análise.");
        return;
      }
    
      const perfilScores: IResumoScore = { ...perfilScore, estrategias: perfil?.estrategias ?? [] };
      const novo: IHistorico = {
        uuid: crypto.randomUUID(),
        apelido,
        resultado,
       perfilScore: perfilScores,
        data: new Date().toLocaleString(),
      };
      atualizarStorage([...historico, novo]);
    }
        message.info("Perfil gerado salvo com sucesso!");

    setShowForm(false)
    setModalVisible(false);
    setApelido("");
  };

  const handleRefazer = () => {
    form.resetFields();
    setResultado(null);
    setPerfil(null);
    setPerfilScore(null);
    setShowForm(true);
  };

    const handleGuardar = () => {
    setModalVisible(true);
  };

  return (
    <>
      {/* <Title level={3}>Checklist de Observação</Title> */}
 <AjudaAnalise ativar={true} />
      {showForm ? (
        <Form form={form} onFinish={onFinish} layout="vertical">
          {Object.entries(categorias).map(([categoria, itens]) => (
            <div key={categoria}>
              <Divider orientation="left">{categoria}</Divider>
              <Form.Item name={categoria}>
                <Checkbox.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {itens.map((item) => (
                    <Checkbox key={item} value={item}>
                      {item}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </div>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Registrar Observação
            </Button>
          </Form.Item>
        </Form>
      ) : (
        resultado && (
          <>
            <Title level={4}>Resumo da Observação</Title>
            {Object.entries(resultado).map(([cat, sinais]) => (
              <div key={cat}>
                <strong>{cat}:</strong>{" "}
                {
                  //@ts-ignore
                  sinais?.join(", ") || "Nenhum sinal marcado"
                }
              </div>
            ))}

            <Divider />
            <Title level={4}>Perfil Qualitativo</Title>
            <ul>
              {perfil?.resumo.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
              <br />
              <p>
                <strong>Estratégias:</strong>
              </p>
              {perfil?.estrategias.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            <Divider />
            <Title level={4}>Perfil Quantitativo</Title>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={Object.entries(perfilScore?.scores || {}).map(
                  ([traço, valor]) => ({ traço, valor })
                )}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="traço" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="valor" fill="#1890ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <Divider />
            <p>
              <strong>Perfil Dominante:</strong> {perfilScore?.perfilDominante}{" "}
              (score {perfilScore?.scoreMax})
            </p>
            <ul>
              {perfilScore?.estrategias.map((e: string, i: number) => (
                <li key={i}>{e}</li>
              ))}
            </ul>

            <Divider />
            <div style={{ display: "flex", gap: "8px" }}>
              <Button onClick={handleRefazer} block>
                Refazer
              </Button>
              <Button type="primary" onClick={handleGuardar} block>
                Guardar
              </Button>
            </div>

           
          </>
        )
      )}
      {historico.length > 0 && (
              <>
                <Divider />
                <Title level={4}>Observações Salvas</Title>
                <ul>
                  {historico.map((obs, i) => (
                    <li key={i}>
                      <strong>{obs.apelido}</strong> —{" "}
                      {obs.perfilScore.perfilDominante}
                    </li>
                  ))}
                </ul>
              </>
            )}
      <Modal
        title="Guardar Observação"
        open={modalVisible}
        onOk={handleSalvarApelido}
        onCancel={() => setModalVisible(false)}
      >
        <p>Digite um apelido para esta observação:</p>
        <Input
          value={apelido}
          onChange={(e) => setApelido(e.target.value)}
          placeholder="Ex: Fulano..."
        />
      </Modal>

    
    </>
  );
};

export default ChecklistComportamento;

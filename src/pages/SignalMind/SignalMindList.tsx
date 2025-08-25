import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Popconfirm, message, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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

const SignalMindList = () => {
  const [historico, setHistorico] = useState<IHistorico[]>([]);

  const atualizarStorage = (novo: IHistorico[]) => {
    setHistorico(novo);
    localStorage.setItem("analise", JSON.stringify(novo));
  };

  useEffect(() => {
    const data = localStorage.getItem("analise");
    if (data) setHistorico(JSON.parse(data));
  }, []);

  const handleRemover = (id: string) => {
    const filtrado = historico.filter((h) => h.uuid !== id);
    atualizarStorage(filtrado);
    message.success("Removido com sucesso");
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Button onClick={()=>atualizarStorage} block>Atualizar</Button>
        {historico.map((item) => (
          <Card
            key={item.uuid}
            title={
              <>
                <Text strong>{item.apelido} - </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.data}
                </Text>
              </>
            }
            extra={
              <Popconfirm
                title="Remover esta análise?"
                onConfirm={() => handleRemover(item.uuid)}
              >
                <Button danger type="text" icon={<DeleteOutlined />} />
              </Popconfirm>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Text strong>Perfil Dominante: </Text>
            <Text>{item.perfilScore.perfilDominante}</Text>
            <br />
            <Text strong>Score: </Text>
            <br />
            {Object.entries(item.perfilScore.scores).map(([chave, valor]) => (
              <>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {valor} - {valor > 1  ? <Text strong>{chave}</Text> : <>{chave}</>}
                </Text>
                <br />
              </>
            ))}

            <br />

            <Divider style={{ margin: "8px 0" }} />
            <Text strong>Estrategias:</Text>
            <br />
           
            {item.perfilScore.estrategias.map((e)=>(
              <>
              <br />
               <Text type="secondary" style={{ fontSize: 12 }}>
                {e}
              </Text>
              </>
            ))}
            
            <Divider style={{ margin: "8px 0" }} />

            <Text strong>Observações:</Text>
            <ul style={{ paddingLeft: 20 }}>
              {Object.entries(item.resultado).map(([categoria, obs]) => (
                <li key={categoria}>
                  <Text strong>{categoria}: </Text>
                  <br />
                  <Text>
                    {
                      //@ts-ignore
                      obs.join(", ")
                    }
                  </Text>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SignalMindList;

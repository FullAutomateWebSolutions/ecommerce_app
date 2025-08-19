import { StandardTable } from "@/components/table/StandardTable";
import { TableActions } from "@/components/ui/tableAction";
import { useEmotion } from "@/hooks/useEmotion";
import { IEmotion } from "@/services/EmotionService";
import { message } from "antd";

import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const EmotionList = () => {
  const [pageSize, setPageSize] = useState(8);
  const { list, deleter } = useEmotion();

  const handleDelete = (id: string) => {
    try {
      deleter.mutate(id, {
        onSuccess: (e) => message.success(e),
        onError: (err) => message.error("Erro: " + err),
      });
    } catch (error) {
      message.error(" " + error);
    }
  };

  const renderBoolean = (value: boolean) => (value ? "✅" : "❌");

  const renderEnergy = (value: string) => {
    switch (value) {
      case "high":
        return "Alta ⚡";
      case "medium":
        return "Média 🌤️";
      case "low":
        return "Baixa 😴";
      default:
        return value;
    }
  };

  const emotional = (value: string) => {
    switch (value) {
      case "motivated":
        return "😃 Motivado";
      case "neutral":
        return "😐 Neutro";
      case "anxious":
        return "😟 Ansioso";
          case "sad":
        return "😟 Triste";
          case "angry":
        return "😟 Frustrado";
      default:
        return value;
    }
  };


  const renderFocus = (value: string) => {
    switch (value) {
      case "clear":
        return "Claro 🧠";
      case "confused":
        return "Confuso 🤔";
      case "blocked":
        return "Travado ⛔";
      default:
        return value;
    }
  };

  const renderWeather = (value: string) => {
    switch (value) {
      case "cold":
        return "Frio ❄️";
      case "hot":
        return "Quente ☀️";
      case "cloudy":
        return "Nublado ☁️";
      case "rainy":
        return "Chuvoso 🌧️";
      default:
        return value;
    }
  };

  const columns: ColumnsType<IEmotion> = [
    // { key: "id", dataIndex: "id", title: "ID", width: 80 },
    { key: "date_create",  dataIndex: "date_create",  title: "Data", width: 150 , sorter:(a: any, b: any)=> (a - b)},
    { key: "emotional",    dataIndex: "emotional",    title: "Emocional", width: 120, render: emotional },
    { key: "focus",        dataIndex: "focus",        title: "Foco", width: 100, render: renderFocus },
    { key: "energy",       dataIndex: "energy",       title: "Energia", width: 120, render: renderEnergy },
    { key: "tookMedicine", dataIndex: "tookMedicine", title: "Tomou Remédio", width: 120, render: renderBoolean },
    { key: "read",         dataIndex: "read",         title: "Leu", width: 80, render: renderBoolean },
    { key: "argued",       dataIndex: "argued",       title: "Brigou", width: 80, render: renderBoolean },
    { key: "wentOutside",  dataIndex: "wentOutside",  title: "Saiu", width: 120, render: renderBoolean },
    { key: "dopamineCount",dataIndex: "dopamineCount",title: "Contador Dopamina", width: 130 },
    { key: "weather",      dataIndex: "weather",      title: "Clima", width: 120, render: renderWeather },
    { key: "events",       dataIndex: "events",       title: "Eventos", width: 200, ellipsis: true },
    { key: "action",       dataIndex: "action",       title: "Ação", width: 200, ellipsis: true },
    { key: "anchor",       dataIndex: "anchor",       title: "Âncora", width: 200, ellipsis: true },

    {
      key: "actions",
      title: "Ações",
      width: 100,
      fixed: "right",
      render: (_: any, record: IEmotion) => (
        <TableActions onDelete={() => handleDelete(record.id || "")} onJoinStatus={false} />
      ),
    },
  ];

  return (
    <div>
      <StandardTable
        bordered
        columns={columns}
        dataSource={list.data}
        rowKey="id"
        scroll={{ x: 1800, y: 400 }}
        size="middle"
        pagination={{
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Total de registros: ${total}`,
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
    </div>
  );
};

export default EmotionList;

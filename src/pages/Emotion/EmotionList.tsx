import { PageActions } from "@/components/layout/PageActions";
import { StandardTable } from "@/components/table/StandardTable";
import { TableActions } from "@/components/ui/tableAction";
import { useEmotion } from "@/hooks/useEmotion";
import { IEmotion } from "@/services/EmotionService";
import { message } from "antd";

import { ColumnsType, ColumnType } from "antd/es/table";
import React, { useState } from "react";

const EmotionList = () => {
  const [pageSize, setPageSize] = useState(8);

  const { list, deleter } = useEmotion();

  const handleDelete = (id: string)=>{
    try {
        deleter.mutate(id, { onSuccess: (e)=>{
            message.info(e)
        }})
    } catch (error) {
        message.error(" " + error)
    }
  }

  const columns: ColumnsType<IEmotion> = [
    {
      key: "id",
      dataIndex: "id",
      title: "id",
    },
    {
      key: "emotional",
      dataIndex: "emotional",
      title: "Emotional",
    },
    {
      key: "energy",
      dataIndex: "energy",
      title: "Energy",
    },

    {
      key: "tookMedicine",
      dataIndex: "tookMedicine",
      title: "Took Medicine",
    },
    {
      key: "dopamineCount",
      dataIndex: "dopamineCount",
      title: "Dopamine Count",
    },
    {
      key: "read",
      dataIndex: "read",
      title: "Read",
    },
    {
      key: "argued",
      dataIndex: "argued",
      title: "Argued",
    },
    {
      key: "wentOutside",
      dataIndex: "wentOutside",
      title: "Went Out Side",
    },
    {
      key: "weather",
      dataIndex: "weather",
      title: "Weather",
    },
    {
      key: "focus",
      dataIndex: "focus",
      title: "Focus",
    },
    {
      key: "events",
      dataIndex: "events",
      title: "Events",
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
    },
    {
      key: "anchor",
      dataIndex: "anchor",
      title: "Anchor",
    },
       {
      key: "date_create",
      dataIndex: "date_create",
      title: "Date Created",
    },


    {
        key: 'Action',
        filtered: true,
        render :(_: any, r: IEmotion)=>(
            <>
            <TableActions onDelete={() =>(handleDelete(r.id || ""))} onJoinStatus={false}/> 
            </>
        )
    }
  ];

  return (
    <div>
      <StandardTable
        bordered
        // expandable={{ expandedRowRender: renderDetalhesFalha }}
        // style={{ paddingTop: 4, paddingBottom: 4 }}
        columns={columns}
        dataSource={list.data}
        // loading={isLoading}
        scroll={{ x: 1500, y: 300 }}
        size="small"
        pagination={{
          pageSize: pageSize,
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

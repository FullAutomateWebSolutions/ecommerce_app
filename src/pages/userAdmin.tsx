import { useGetSettings } from '@/hooks/api';
import { FirebaseUserResponse } from '@/types/type';
import { Avatar, List, Button, Space } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const UserAdmin = () => {
  const { data, isLoading } = useGetSettings();

  const users: FirebaseUserResponse[] = Array.isArray(data?.result?.users)
    ? data.result.users
    : [];

  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <List
      itemLayout="horizontal"
      loading={isLoading}
      dataSource={users}
      style={{ padding: isMobile ? '0 8px' : '0 24px' }}
      renderItem={(item: FirebaseUserResponse) => (
        <List.Item
          style={{
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
          }}
          actions={
            isMobile
              ? []
              : [
                  <Button size="small" key="edit">Editar</Button>,
                  <Button size="small" danger key="delete">Excluir</Button>,
                  <label key="disable" style={{ marginLeft: 8 }}>
                    <input type="checkbox" /> Desabilitar
                  </label>
                ]
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.photoURL || ''} size={isMobile ? 48 : 64} />}
            title={
              <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 500 }}>
                {item.email}
              </div>
            }
            description={
              <div style={{ fontSize: isMobile ? 12 : 14 }}>
                <div>Nome: {item.email || 'N/A'}</div>
                <div>ID: {item.uid}</div>
              </div>
            }
          />

          {isMobile && (
            <Space style={{ marginTop: 8 }} wrap>
              <Button size="small">Editar</Button>
              <Button size="small" danger>Excluir</Button>
              <label style={{ fontSize: 12 }}>
                <input type="checkbox" style={{ marginRight: 4 }} /> Desabilitar
              </label>
            </Space>
          )}
        </List.Item>
      )}
    />
  );
};

export default UserAdmin;

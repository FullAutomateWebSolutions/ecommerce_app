import React, { useState } from "react";
import { Form, Select, Input, Button, Radio, Space, InputNumber, Checkbox } from "antd";

const { TextArea } = Input;

interface EmotionalFormValues {
  emotional: "motivated" | "neutral" | "anxious" | "sad" | "angry";
  energy: "high" | "medium" | "low";
  focus: "clear" | "confused" | "blocked";
  events: string;
  action: string;
  anchor: string;
  tookMedicine: boolean;
  dopamineCount: number;
  read: boolean;
  argued: boolean;
  wentOutside: boolean;
  weather: "cold" | "hot" | "cloudy" | "rainy";
}

const EmotionalForm: React.FC = () => {
  const [form] = Form.useForm<EmotionalFormValues>();

  const onFinish = (values: EmotionalFormValues) => {
    console.log("Registro enviado:", values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500, margin: "0 auto" }}
    >
      <Form.Item label="Emocional agora" name="emotional" rules={[{ required: true }]}>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="motivated">😃 Motivado</Radio>
            <Radio value="neutral">😐 Neutro</Radio>
            <Radio value="anxious">😟 Ansioso</Radio>
            <Radio value="sad">😢 Triste</Radio>
            <Radio value="angry">😡 Frustrado</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Energia física" name="energy" rules={[{ required: true }]}>
        <Select placeholder="Escolha">
          <Select.Option value="high">Alta ⚡</Select.Option>
          <Select.Option value="medium">Média 🌤️</Select.Option>
          <Select.Option value="low">Baixa 😴</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Foco mental" name="focus" rules={[{ required: true }]}>
        <Select placeholder="Escolha">
          <Select.Option value="clear">Claro 🧠</Select.Option>
          <Select.Option value="confused">Confuso 🤔</Select.Option>
          <Select.Option value="blocked">Travado ⛔</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="O que aconteceu / me afetou" name="events">
        <TextArea rows={2} placeholder="Ex: chefe sumiu, música triste, conversa..." />
      </Form.Item>

      <Form.Item label="Ação feita" name="action">
        <TextArea rows={2} placeholder="Ex: revisei protótipo, limpei carro, caminhei..." />
      </Form.Item>

      <Form.Item label="Hipótese de âncora" name="anchor">
        <TextArea rows={2} placeholder="Ex: ouvir música, mexer na moto, alongar..." />
      </Form.Item>

      <Form.Item name="tookMedicine" valuePropName="checked">
        <Checkbox>Tomei remédio ✅</Checkbox>
      </Form.Item>

      <Form.Item label="Contador de dopamina forçada" name="dopamineCount">
        <InputNumber min={0} max={20} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="read" valuePropName="checked">
        <Checkbox>Li hoje 📚</Checkbox>
      </Form.Item>

      <Form.Item name="argued" valuePropName="checked">
        <Checkbox>Briguei hoje ⚡</Checkbox>
      </Form.Item>

      <Form.Item name="wentOutside" valuePropName="checked">
        <Checkbox>Saí de casa / atividade fora do trabalho 🌳</Checkbox>
      </Form.Item>

      <Form.Item label="Clima do dia" name="weather">
        <Select placeholder="Escolha">
          <Select.Option value="cold">Frio ❄️</Select.Option>
          <Select.Option value="hot">Quente ☀️</Select.Option>
          <Select.Option value="cloudy">Nublado ☁️</Select.Option>
          <Select.Option value="rainy">Chuvoso 🌧️</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Registrar ✅
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmotionalForm;

import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Spin, Typography } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Props {
  onScanSuccess: (code: string) => void;
}

const BarcodeScanner: React.FC<Props> = ({ onScanSuccess }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true); // Garante que estamos no navegador
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const readerElement = document.getElementById("reader");

    if (!readerElement) {
      console.error("Elemento #reader não encontrado");
      return;
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear().catch(console.error);
      },
      (error) => {
        // silencioso
      }
    );

    setTimeout(() => setIsLoading(false), 800);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [isClient, onScanSuccess]);

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading ? (
        <Spin tip="Inicializando câmera..." size="large" />
      ) : (
        <>
          <div style={{ marginBottom: 10 }}>
            <BarcodeOutlined style={{ fontSize: 32, color: "#1677ff" }} />
            <br />
            <Text strong>Posicione o código de barras dentro da área</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              A leitura será automática
            </Text>
          </div>
        </>
      )}
      <div id="reader" style={{ marginTop: 16 }} />
    </div>
  );
};

export default BarcodeScanner;

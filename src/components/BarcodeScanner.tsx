// src/components/BarcodeScanner.tsx
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface Props {
  onScanSuccess: (code: string) => void;
}

const BarcodeScanner: React.FC<Props> = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader",
  {
    fps: 10,
    qrbox: { width: 300, height: 300 }
  },
  false);

    scanner.render(
      (decodedText, decodedResult) => {
        console.log(decodedResult)
        onScanSuccess(decodedText);
        scanner.clear(); // Para parar o scanner após leitura
      },
      (error) => {
        // silencioso por padrão
        console.log(error)
        
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScanSuccess]);

  return <div id="reader" />;
};

export default BarcodeScanner;


import React, { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";

const LeitorPage = () => {
  const [code, setCode] = useState<string | null>(null);

  const handleScan = (result: string) => {
    setCode(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Leitor de Código</h2>
      {!code && <BarcodeScanner onScanSuccess={handleScan} />}
      {code && (
        <div>
          <p><strong>Código Lido:</strong> {code}</p>
          <button onClick={() => setCode(null)}>Ler Outro</button>
        </div>
      )}
    </div>
  );
};

export default LeitorPage;

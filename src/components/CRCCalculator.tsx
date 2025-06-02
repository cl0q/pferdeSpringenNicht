import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

interface CRCStep {
  step: number;
  description: string;
  dividend: string;
  divisor: string;
  quotient: string;
  remainder: string;
}

const CRCCalculator: React.FC = () => {
  const [data, setData] = useState('11010011');
  const [generator, setGenerator] = useState('100101');
  const [calculationType, setCalculationType] = useState<'generate' | 'validate'>('generate');
  const [receivedFrame, setReceivedFrame] = useState('1101001100000');
  const [steps, setSteps] = useState<CRCStep[]>([]);
  const [result, setResult] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Parity calculation
  const [parityData, setParityData] = useState(['2C', '0E', '5A', '1A']);
  const [parityResult, setParityResult] = useState<string[]>([]);

  const xorOperation = (a: string, b: string): string => {
    let result = '';
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const bitA = a[i] || '0';
      const bitB = b[i] || '0';
      result += bitA === bitB ? '0' : '1';
    }
    return result;
  };

  const calculateCRC = (dataInput: string, generatorInput: string): { steps: CRCStep[], remainder: string } => {
    const generatorLength = generatorInput.length;
    const extendedData = dataInput + '0'.repeat(generatorLength - 1);
    let dividend = extendedData.slice(0, generatorLength);
    let position = generatorLength;
    const calculationSteps: CRCStep[] = [];
    let stepNumber = 1;

    while (position <= extendedData.length) {
      if (dividend[0] === '1') {
        const xorResult = xorOperation(dividend, generatorInput);
        calculationSteps.push({
          step: stepNumber++,
          description: `XOR Operation: ${dividend} ⊕ ${generatorInput}`,
          dividend,
          divisor: generatorInput,
          quotient: '1',
          remainder: xorResult
        });
        dividend = xorResult.slice(1) + (position < extendedData.length ? extendedData[position] : '');
      } else {
        calculationSteps.push({
          step: stepNumber++,
          description: `Bring down next bit (leading 0)`,
          dividend,
          divisor: generatorInput,
          quotient: '0',
          remainder: dividend.slice(1) + (position < extendedData.length ? extendedData[position] : '')
        });
        dividend = dividend.slice(1) + (position < extendedData.length ? extendedData[position] : '');
      }
      position++;
    }

    const finalRemainder = dividend.padStart(generatorLength - 1, '0');
    return { steps: calculationSteps, remainder: finalRemainder };
  };

  const validateCRC = (frame: string, generatorInput: string): { isValid: boolean, steps: CRCStep[], remainder: string } => {
    const { steps: validationSteps, remainder } = calculateCRC(frame, generatorInput);
    const isFrameValid = remainder === '0'.repeat(remainder.length);
    return { isValid: isFrameValid, steps: validationSteps, remainder };
  };

  const handleCalculate = () => {
    if (calculationType === 'generate') {
      const { steps: calcSteps, remainder } = calculateCRC(data, generator);
      setSteps(calcSteps);
      setResult(data + remainder);
      setIsValid(null);
    } else {
      const { isValid: frameValid, steps: validSteps, remainder } = validateCRC(receivedFrame, generator);
      setSteps(validSteps);
      setResult(remainder);
      setIsValid(frameValid);
    }
  };

  const calculateTwoDimensionalParity = () => {
    const hexToBinary = (hex: string): string => {
      return parseInt(hex, 16).toString(2).padStart(7, '0');
    };

    const binaryData = parityData.map(hex => hexToBinary(hex));
    const matrix: number[][] = binaryData.map(binary => 
      binary.split('').map(bit => parseInt(bit))
    );

    // Calculate row parity (even parity)
    const rowParities = matrix.map(row => {
      const sum = row.reduce((acc, bit) => acc + bit, 0);
      return sum % 2;
    });

    // Calculate column parity
    const colParities: number[] = [];
    for (let col = 0; col < 7; col++) {
      const sum = matrix.reduce((acc, row) => acc + row[col], 0);
      colParities.push(sum % 2);
    }

    // Calculate overall parity
    const overallParity = rowParities.reduce((acc, bit) => acc + bit, 0) % 2;

    // Create result with parity bits
    const resultMatrix = matrix.map((row, i) => [...row, rowParities[i]]);
    resultMatrix.push([...colParities, overallParity]);

    // Convert back to hex
    const resultHex = resultMatrix.slice(0, -1).map(row => {
      const binaryStr = row.slice(0, -1).join('') + row[row.length - 1];
      return parseInt(binaryStr, 2).toString(16).toUpperCase().padStart(2, '0');
    });

    setParityResult(resultHex);
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🛡️</span>
          CRC & Paritäts-Rechner
        </h2>
        <p className="text-gray-600 mb-6">
          Berechnen Sie CRC-Prüfsummen und zweidimensionale Parität. 
          Perfekt für Klausuraufgaben zur Fehlererkennung!
        </p>
      </div>

      {/* CRC Calculator */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">CRC-Berechnung</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Berechnung:
            </label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'generate' | 'validate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="generate">CRC generieren</option>
              <option value="validate">CRC validieren</option>
            </select>
          </div>

          {calculationType === 'generate' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nutzdaten:
              </label>
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="11010011"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empfangener Rahmen:
              </label>
              <input
                type="text"
                value={receivedFrame}
                onChange={(e) => setReceivedFrame(e.target.value.replace(/[^01]/g, ''))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1101001100000"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generatorpolynom:
            </label>
            <input
              type="text"
              value={generator}
              onChange={(e) => setGenerator(e.target.value.replace(/[^01]/g, ''))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100101"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Berechnen
            </button>
          </div>
        </div>

        {/* CRC Steps */}
        {steps.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Berechnungsschritte:</h4>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm space-y-2">
                <div>
                  <strong>Eingabe:</strong> {calculationType === 'generate' ? data : receivedFrame}
                </div>
                <div>
                  <strong>Generatorpolynom:</strong> {generator}
                </div>
                {calculationType === 'generate' && (
                  <div>
                    <strong>Erweiterte Daten:</strong> {data + '0'.repeat(generator.length - 1)}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 border-b text-left">Schritt</th>
                    <th className="px-3 py-2 border-b text-left">Beschreibung</th>
                    <th className="px-3 py-2 border-b text-left">Dividend</th>
                    <th className="px-3 py-2 border-b text-left">Operation</th>
                    <th className="px-3 py-2 border-b text-left">Ergebnis</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.slice(0, 10).map((step) => ( // Limit to first 10 steps for readability
                    <tr key={step.step} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border-b font-mono">{step.step}</td>
                      <td className="px-3 py-2 border-b text-xs">{step.description}</td>
                      <td className="px-3 py-2 border-b font-mono">{step.dividend}</td>
                      <td className="px-3 py-2 border-b font-mono">
                        {step.quotient === '1' ? `⊕ ${step.divisor}` : 'shift'}
                      </td>
                      <td className="px-3 py-2 border-b font-mono">{step.remainder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-lg border-2 border-dashed">
              {calculationType === 'generate' ? (
                <div className="bg-green-50 p-4 rounded-lg flex-1">
                  <h4 className="font-semibold text-green-800 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Übertragungsrahmen:
                  </h4>
                  <p className="font-mono text-lg text-green-600 mt-2">{result}</p>
                  <p className="text-sm text-green-600 mt-1">
                    Nutzdaten: {data} + CRC: {result.slice(data.length)}
                  </p>
                </div>
              ) : (
                <div className={`p-4 rounded-lg flex-1 ${isValid ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h4 className={`font-semibold flex items-center ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                    {isValid ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2" />
                    )}
                    Validierungsergebnis:
                  </h4>
                  <p className={`font-mono text-lg mt-2 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                    Rest: {result}
                  </p>
                  <p className={`text-sm mt-1 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {isValid ? '✅ Übertragung korrekt!' : '❌ Übertragungsfehler erkannt!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Parity Calculator */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">Zweidimensionale Parität</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Eingabedaten (Hexadezimal, 7-Bit):</h4>
            <div className="space-y-2">
              {parityData.map((hex, index) => (
                <input
                  key={index}
                  type="text"
                  value={hex}
                  onChange={(e) => {
                    const newData = [...parityData];
                    newData[index] = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase().slice(0, 2);
                    setParityData(newData);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  placeholder="2C"
                />
              ))}
            </div>
            
            <button
              onClick={calculateTwoDimensionalParity}
              className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Parität berechnen
            </button>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Binärmatrix mit Parität:</h4>
            
            {parityData.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-mono text-sm space-y-1">
                  <div className="text-xs text-gray-500 mb-2">
                    Bit: 6 5 4 3 2 1 0 | P
                  </div>
                  {parityData.map((hex, rowIndex) => {
                    const binary = parseInt(hex, 16).toString(2).padStart(7, '0');
                    const bits = binary.split('');
                    const sum = bits.reduce((acc, bit) => acc + parseInt(bit), 0);
                    const parity = sum % 2;
                    
                    return (
                      <div key={rowIndex} className="flex space-x-1">
                        {bits.map((bit, bitIndex) => (
                          <span key={bitIndex} className="w-4 text-center">
                            {bit}
                          </span>
                        ))}
                        <span className="text-blue-600 font-bold">| {parity}</span>
                      </div>
                    );
                  })}
                  
                  {/* Column parity */}
                  <div className="border-t border-gray-300 pt-1 mt-2">
                    <div className="flex space-x-1">
                      {Array(7).fill(0).map((_, colIndex) => {
                        const sum = parityData.reduce((acc, hex) => {
                          const binary = parseInt(hex, 16).toString(2).padStart(7, '0');
                          return acc + parseInt(binary[colIndex]);
                        }, 0);
                        const colParity = sum % 2;
                        return (
                          <span key={colIndex} className="w-4 text-center text-green-600 font-bold">
                            {colParity}
                          </span>
                        );
                      })}
                      <span className="text-red-600 font-bold">| ?</span>
                    </div>
                  </div>
                </div>
                
                {parityResult.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <h5 className="font-semibold text-blue-800">Ergebnis (Hexadezimal):</h5>
                    <p className="font-mono text-lg text-blue-600 mt-1">
                      {parityResult.join(' ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">🎯 Klausur-Beispiele</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setData('11010011');
              setGenerator('100101');
              setCalculationType('generate');
              handleCalculate();
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">CRC Generation</h4>
            <p className="text-sm opacity-90">
              Nutzdaten: 11010011<br/>
              Generator: 100101
            </p>
          </button>
          
          <button
            onClick={() => {
              setReceivedFrame('1101001110100');
              setGenerator('100101');
              setCalculationType('validate');
              handleCalculate();
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">CRC Validation</h4>
            <p className="text-sm opacity-90">
              Rahmen: 1101001110100<br/>
              Generator: 100101
            </p>
          </button>
          
          <button
            onClick={() => {
              setParityData(['2C', '0E', '5A', '1A']);
              calculateTwoDimensionalParity();
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">2D Parität</h4>
            <p className="text-sm opacity-90">
              Daten: 2C 0E 5A 1A<br/>
              Gerade Parität
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRCCalculator;
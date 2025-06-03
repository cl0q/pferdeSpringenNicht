import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface SignalPoint {
  time: number;
  value: number;
  bit?: string;
}

const LineCodeVisualizer: React.FC = () => {
  const [inputBits, setInputBits] = useState('0010111100011010');
  const [encodingType, setEncodingType] = useState<'nrzi' | '4b5b' | '5b6b'>('nrzi');
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // 4B5B Encoding Table
  const encode4B5B: { [key: string]: string } = {
    '0000': '11110',
    '0001': '01001',
    '0010': '10100',
    '0011': '10101',
    '0100': '01010',
    '0101': '01011',
    '0110': '01110',
    '0111': '01111',
    '1000': '10010',
    '1001': '10011',
    '1010': '10110',
    '1011': '10111',
    '1100': '11010',
    '1101': '11011',
    '1110': '11100',
    '1111': '11101'
  };

  // 5B6B Encoding Table (simplified)
  const encode5B6B: { [key: string]: string } = {
    '00000': '000011',
    '00001': '000101',
    '00010': '000110',
    '00011': '001001',
    '00100': '001010',
    '00101': '001100',
    '00110': '001101',
    '00111': '001110',
    '01000': '010001',
    '01001': '010010',
    '01010': '010100',
    '01011': '010111',
    '01100': '011000',
    '01101': '011001',
    '01110': '011100',
    '01111': '011101',
    '10000': '100001',
    '10001': '100010',
    '10010': '100100',
    '10011': '100111',
    '10100': '101000',
    '10101': '101001',
    '10110': '101010',
    '10111': '101100',
    '11000': '110000',
    '11001': '110001',
    '11010': '110010',
    '11011': '110100',
    '11100': '111000',
    '11101': '111001',
    '11110': '111010',
    '11111': '111100'
  };

  const encodeData = () => {
    switch (encodingType) {
      case '4b5b':
        const chunks4 = inputBits.match(/.{1,4}/g) || [];
        return chunks4.map(chunk => {
          const padded = chunk.padEnd(4, '0');
          return encode4B5B[padded] || padded;
        }).join('');
      
      case '5b6b':
        const chunks5 = inputBits.match(/.{1,5}/g) || [];
        return chunks5.map(chunk => {
          const padded = chunk.padEnd(5, '0');
          return encode5B6B[padded] || padded;
        }).join('');
      
      case 'nrzi':
      default:
        return inputBits;
    }
  };

  const generateNRZISignal = (bits: string): SignalPoint[] => {
    const signal: SignalPoint[] = [];
    let currentLevel = 0; // Start mit Low (0)
    
    signal.push({ time: 0, value: currentLevel });
    
    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      
      if (bit === '1') {
        // Toggle bei '1'
        currentLevel = currentLevel === 0 ? 1 : 0;
      }
      // Kein Toggle bei '0'
      
      signal.push({ time: i + 1, value: currentLevel, bit });
    }
    
    return signal;
  };


  const encodedBits = encodeData();
  // Für alle Kodierungstypen NRZI verwenden (4B5B und 5B6B verwenden immer NRZI)
  const signalPoints = generateNRZISignal(encodedBits);

  const startAnimation = () => {
    setShowAnimation(true);
    setAnimationStep(0);
    
    const interval = setInterval(() => {
      setAnimationStep(step => {
        if (step >= encodedBits.length) {
          clearInterval(interval);
          setShowAnimation(false);
          return 0;
        }
        return step + 1;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">📡</span>
          Leitungskodierung Visualizer
        </h2>
        <p className="text-gray-600 mb-6">
          Visualisierung verschiedener Leitungskodierungsverfahren. Ändern Sie die Eingabedaten 
          und den Kodierungstyp um verschiedene Signalverläufe zu sehen.
        </p>
      </div>

      {/* Controls */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">Eingabesteuerung</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eingangsdaten (Bits):
            </label>
            <input
              type="text"
              value={inputBits}
              onChange={(e) => setInputBits(e.target.value.replace(/[^01]/g, ''))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0010111100011010"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kodierungstyp:
            </label>
            <select
              value={encodingType}
              onChange={(e) => setEncodingType(e.target.value as 'nrzi' | '4b5b' | '5b6b')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="nrzi">NRZI</option>
              <option value="4b5b">4B5B + NRZI</option>
              <option value="5b6b">5B6B + NRZI</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={startAnimation}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Animation starten</span>
            </button>
          </div>
        </div>
      </div>

      {/* Encoding Steps */}
      {encodingType !== 'nrzi' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Kodierungsschritte</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">1. Originaldaten:</h4>
              <div className="code-block">{inputBits}</div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">
                2. {encodingType.toUpperCase()} Kodierung:
              </h4>
              <div className="code-block">
                {encodingType === '4b5b' && (
                  <div>
                    {(inputBits.match(/.{1,4}/g) || []).map((chunk, i) => (
                      <span key={i} className="mr-4">
                        {chunk.padEnd(4, '0')} → {encode4B5B[chunk.padEnd(4, '0')] || chunk}
                      </span>
                    ))}
                  </div>
                )}
                {encodingType === '5b6b' && (
                  <div>
                    {(inputBits.match(/.{1,5}/g) || []).map((chunk, i) => (
                      <span key={i} className="mr-4">
                        {chunk.padEnd(5, '0')} → {encode5B6B[chunk.padEnd(5, '0')] || chunk}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700">3. Resultierende Bitfolge:</h4>
              <div className="code-block">{encodedBits}</div>
            </div>
          </div>
        </div>
      )}

      {/* Signal Visualization */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">Signalverlauf</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <svg 
            viewBox={`0 0 ${Math.max(encodedBits.length * 60, 400)} 200`} 
            className="w-full h-64 border border-gray-300 bg-white rounded"
          >
            {/* Grid lines */}
            {Array.from({ length: encodedBits.length + 1 }, (_, i) => (
              <line
                key={i}
                x1={i * 60}
                y1={0}
                x2={i * 60}
                y2={200}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Horizontal lines */}
            <line x1={0} y1={50} x2={encodedBits.length * 60} y2={50} stroke="#e5e7eb" strokeWidth="1" />
            <line x1={0} y1={150} x2={encodedBits.length * 60} y2={150} stroke="#e5e7eb" strokeWidth="1" />
            
            {/* Signal path */}
            <path
              d={signalPoints.reduce((path, point, index) => {
                const x = point.time * 60;
                const y = point.value === 1 ? 50 : 150;
                return index === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
              }, '')}
              stroke="#2563eb"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Bit labels */}
            {encodedBits.split('').map((bit, i) => (
              <g key={i}>
                <text
                  x={i * 60 + 30}
                  y={185}
                  textAnchor="middle"
                  className="text-sm font-mono"
                  fill={showAnimation && i < animationStep ? "#dc2626" : "#374151"}
                >
                  {bit}
                </text>
                
                {/* Animation highlight */}
                {showAnimation && i === animationStep - 1 && (
                  <rect
                    x={i * 60 + 5}
                    y={35}
                    width={50}
                    height={130}
                    fill="rgba(239, 68, 68, 0.2)"
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                )}
              </g>
            ))}
            
            {/* Level labels */}
            <text x={-15} y={55} textAnchor="middle" className="text-sm font-semibold" fill="#374151">High</text>
            <text x={-15} y={155} textAnchor="middle" className="text-sm font-semibold" fill="#374151">Low</text>
          </svg>
          
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div>
              <strong>Kodierung:</strong> {encodingType.toUpperCase()}
              <span className="text-blue-600"> + NRZI</span>
              <div className="text-xs text-gray-500">Pegelwechsel bei "1", kein Wechsel bei "0"</div>
            </div>
            <div>
              <strong>Bits:</strong> {encodedBits.length} | <strong>Effizienz:</strong> {
                encodingType === '4b5b' ? '80%' : 
                encodingType === '5b6b' ? '83%' : '100%'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">🎯 Klausur-Beispiele</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setInputBits('0010111100011010');
              setEncodingType('4b5b');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">Beispiel 1: 4B5B + NRZI</h4>
            <p className="text-sm opacity-90">
              Kodieren Sie: 0010 1111 0001 1010
            </p>
          </button>
          
          <button
            onClick={() => {
              setInputBits('0000101011110000111010011');
              setEncodingType('5b6b');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">Beispiel 2: 5B6B + NRZI</h4>
            <p className="text-sm opacity-90">
              Kodieren Sie: 00001 01011 11000 01110 10011
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineCodeVisualizer;
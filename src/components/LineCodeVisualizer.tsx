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

      {/* Line Code Overview */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">📚 Leitungscodes im Überblick</h3>
        <p className="text-gray-600 mb-6">
          Verschiedene Leitungscodes haben unterschiedliche Eigenschaften für die digitale Signalübertragung.
          Hier sind die wichtigsten Codes aus den Vorlesungen erklärt.
        </p>

        {/* Desired Properties */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-4">🎯 Erwünschte Eigenschaften von Leitungscodes:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-blue-700 mb-2">⚡ DC-Freiheit</h5>
              <p className="text-sm text-blue-600">
                Gleichstromanteil = 0, um Übertragung über AC-gekoppelte Leitungen zu ermöglichen
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-green-700 mb-2">🔄 Selbstsynchronisation</h5>
              <p className="text-sm text-green-600">
                Genügend Pegelwechsel für Taktrückgewinnung beim Empfänger
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-purple-700 mb-2">🛡️ Fehlerkennung</h5>
              <p className="text-sm text-purple-600">
                Eingebaute Mechanismen zur Erkennung von Übertragungsfehlern
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-orange-700 mb-2">📊 Spektrale Effizienz</h5>
              <p className="text-sm text-orange-600">
                Minimale Bandbreite bei hoher Datenrate
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-red-700 mb-2">⚖️ Redundanz</h5>
              <p className="text-sm text-red-600">
                Kontrollierte Redundanz für Fehlerkorrektur ohne Overhead
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-700 mb-2">🔧 Einfachheit</h5>
              <p className="text-sm text-gray-600">
                Geringe Komplexität bei Encoding/Decoding
              </p>
            </div>
          </div>
        </div>

        {/* Line Codes Comparison */}
        <div className="space-y-6">
          <h4 className="font-semibold text-lg">🔍 Leitungscodes im Detail:</h4>
          
          {/* NRZ Codes */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-4 text-xl">Non-Return-to-Zero (NRZ) Familie</h5>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* NRZ-L */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">NRZ</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-blue-800">NRZ-L (Level)</h6>
                    <p className="text-sm text-blue-600">Pegelkodierung</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> '1' = High, '0' = Low</div>
                  <div><strong>DC-Freiheit:</strong> ❌ Nein (bei vielen 1en oder 0en)</div>
                  <div><strong>Selbstsync:</strong> ❌ Probleme bei langen 0- oder 1-Folgen</div>
                  <div><strong>Bandbreite:</strong> 🟢 R/2 Hz (sehr effizient)</div>
                  <div><strong>Verwendung:</strong> Kurze Distanzen, TTL-Logik</div>
                </div>
              </div>

              {/* NRZI */}
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">NRZI</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-green-800">NRZI (Inverted)</h6>
                    <p className="text-sm text-green-600">Wechselkodierung</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> '1' = Wechsel, '0' = kein Wechsel</div>
                  <div><strong>DC-Freiheit:</strong> 🟡 Besser als NRZ-L</div>
                  <div><strong>Selbstsync:</strong> 🟡 Gut bei vielen 1en, Problem bei 0-Folgen</div>
                  <div><strong>Bandbreite:</strong> 🟢 R/2 Hz</div>
                  <div><strong>Verwendung:</strong> USB, 4B5B/5B6B Basis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Manchester Codes */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-4 text-xl">Manchester Familie</h5>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Manchester */}
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MAN</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-blue-800">Manchester</h6>
                    <p className="text-sm text-blue-600">Biphase-L</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> '1' = Low→High, '0' = High→Low</div>
                  <div><strong>DC-Freiheit:</strong> ✅ Perfekt (immer 50% High/Low)</div>
                  <div><strong>Selbstsync:</strong> ✅ Exzellent (Wechsel in jeder Bitzeit)</div>
                  <div><strong>Bandbreite:</strong> 🔴 R Hz (doppelte Bandbreite)</div>
                  <div><strong>Verwendung:</strong> Ethernet 10Base2/5, IEEE 802.3</div>
                </div>
              </div>

              {/* Differential Manchester */}
              <div className="bg-white border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">DMN</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-indigo-800">Differential Manchester</h6>
                    <p className="text-sm text-indigo-600">Biphase-M</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> '1' = kein Wechsel, '0' = Wechsel zu Beginn</div>
                  <div><strong>DC-Freiheit:</strong> ✅ Perfekt</div>
                  <div><strong>Selbstsync:</strong> ✅ Exzellent</div>
                  <div><strong>Bandbreite:</strong> 🔴 R Hz</div>
                  <div><strong>Verwendung:</strong> Token Ring, FDDI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Block Codes */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-4 text-xl">Block Codes (mBnB)</h5>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 4B5B */}
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4B5B</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-green-800">4B5B + NRZI</h6>
                    <p className="text-sm text-green-600">Fast Ethernet</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> 4 Datenbits → 5 Kodebits</div>
                  <div><strong>Effizienz:</strong> 80% (4/5)</div>
                  <div><strong>DC-Freiheit:</strong> 🟡 Über NRZI</div>
                  <div><strong>Selbstsync:</strong> ✅ Max 3 aufeinanderfolgende 0en</div>
                  <div><strong>Fehlerkennung:</strong> ✅ Ungültige 5B-Wörter</div>
                  <div><strong>Verwendung:</strong> 100BASE-TX Ethernet</div>
                </div>
              </div>

              {/* 5B6B */}
              <div className="bg-white border border-teal-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">5B6B</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-teal-800">5B6B + NRZI</h6>
                    <p className="text-sm text-teal-600">FDDI Standard</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> 5 Datenbits → 6 Kodebits</div>
                  <div><strong>Effizienz:</strong> 83.3% (5/6)</div>
                  <div><strong>DC-Freiheit:</strong> 🟡 Über NRZI</div>
                  <div><strong>Selbstsync:</strong> ✅ Begrenzte 0-Folgen</div>
                  <div><strong>Fehlerkennung:</strong> ✅ 32 ungültige Kombinationen</div>
                  <div><strong>Verwendung:</strong> FDDI, ATM</div>
                </div>
              </div>

              {/* 8B10B */}
              <div className="bg-white border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">8B10B</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-emerald-800">8B10B</h6>
                    <p className="text-sm text-emerald-600">Gigabit Ethernet</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><strong>Prinzip:</strong> 8 Datenbits → 10 Kodebits</div>
                  <div><strong>Effizienz:</strong> 80% (8/10)</div>
                  <div><strong>DC-Freiheit:</strong> ✅ Running Disparity Control</div>
                  <div><strong>Selbstsync:</strong> ✅ Max 5 gleiche Bits</div>
                  <div><strong>Fehlerkennung:</strong> ✅ Disparity + ungültige Symbole</div>
                  <div><strong>Verwendung:</strong> Gigabit Ethernet, Fibre Channel</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <h5 className="font-semibold mb-3">📊 Eigenschaften-Vergleich:</h5>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border-b text-left">Code</th>
                  <th className="px-3 py-2 border-b text-left">DC-Freiheit</th>
                  <th className="px-3 py-2 border-b text-left">Selbstsync</th>
                  <th className="px-3 py-2 border-b text-left">Bandbreite</th>
                  <th className="px-3 py-2 border-b text-left">Effizienz</th>
                  <th className="px-3 py-2 border-b text-left">Fehlerkennung</th>
                  <th className="px-3 py-2 border-b text-left">Komplexität</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b font-semibold">NRZ-L</td>
                  <td className="px-3 py-2 border-b">❌ Schlecht</td>
                  <td className="px-3 py-2 border-b">❌ Schlecht</td>
                  <td className="px-3 py-2 border-b">🟢 R/2</td>
                  <td className="px-3 py-2 border-b">🟢 100%</td>
                  <td className="px-3 py-2 border-b">❌ Keine</td>
                  <td className="px-3 py-2 border-b">🟢 Sehr niedrig</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b font-semibold">NRZI</td>
                  <td className="px-3 py-2 border-b">🟡 Mittel</td>
                  <td className="px-3 py-2 border-b">🟡 Mittel</td>
                  <td className="px-3 py-2 border-b">🟢 R/2</td>
                  <td className="px-3 py-2 border-b">🟢 100%</td>
                  <td className="px-3 py-2 border-b">❌ Keine</td>
                  <td className="px-3 py-2 border-b">🟢 Niedrig</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b font-semibold">Manchester</td>
                  <td className="px-3 py-2 border-b">✅ Perfekt</td>
                  <td className="px-3 py-2 border-b">✅ Perfekt</td>
                  <td className="px-3 py-2 border-b">🔴 R</td>
                  <td className="px-3 py-2 border-b">🟡 50%</td>
                  <td className="px-3 py-2 border-b">🟡 Begrenzt</td>
                  <td className="px-3 py-2 border-b">🟡 Mittel</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b font-semibold">4B5B+NRZI</td>
                  <td className="px-3 py-2 border-b">🟢 Gut</td>
                  <td className="px-3 py-2 border-b">✅ Sehr gut</td>
                  <td className="px-3 py-2 border-b">🟡 0.625R</td>
                  <td className="px-3 py-2 border-b">🟢 80%</td>
                  <td className="px-3 py-2 border-b">✅ Gut</td>
                  <td className="px-3 py-2 border-b">🟡 Mittel</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b font-semibold">8B10B</td>
                  <td className="px-3 py-2 border-b">✅ Exzellent</td>
                  <td className="px-3 py-2 border-b">✅ Exzellent</td>
                  <td className="px-3 py-2 border-b">🟡 0.5R</td>
                  <td className="px-3 py-2 border-b">🟢 80%</td>
                  <td className="px-3 py-2 border-b">✅ Exzellent</td>
                  <td className="px-3 py-2 border-b">🔴 Hoch</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Practical Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h6 className="font-semibold text-purple-800 mb-3">🌐 Praktische Anwendungen:</h6>
              <div className="space-y-2 text-sm text-purple-700">
                <div><strong>NRZ/NRZI:</strong> RS-232, USB (Low-Speed)</div>
                <div><strong>Manchester:</strong> 10BASE-T Ethernet, RFID</div>
                <div><strong>4B5B:</strong> 100BASE-TX Fast Ethernet</div>
                <div><strong>8B10B:</strong> Gigabit Ethernet, PCI Express</div>
                <div><strong>64B/66B:</strong> 10 Gigabit Ethernet</div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h6 className="font-semibold text-orange-800 mb-3">⚖️ Design Trade-offs:</h6>
              <div className="space-y-2 text-sm text-orange-700">
                <div><strong>Bandbreite vs. Zuverlässigkeit:</strong> Mehr Redundanz = höhere Bandbreite</div>
                <div><strong>Komplexität vs. Leistung:</strong> Bessere Eigenschaften = mehr Hardware</div>
                <div><strong>Effizienz vs. Robustheit:</strong> Weniger Overhead = mehr Probleme</div>
                <div><strong>Kosten vs. Distanz:</strong> Bessere Codes = teurere Implementierung</div>
              </div>
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
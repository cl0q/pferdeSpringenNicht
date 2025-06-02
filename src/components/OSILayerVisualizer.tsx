import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface OSILayer {
  number: number;
  name: string;
  germanName: string;
  function: string;
  protocols: string[];
  dataUnit: string;
  color: string;
  examples: string[];
}

const OSILayerVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const layers: OSILayer[] = [
    {
      number: 7,
      name: 'Application Layer',
      germanName: 'Anwendungsschicht',
      function: 'Schnittstelle zur Anwendung',
      protocols: ['HTTP', 'SMTP', 'FTP', 'DNS', 'DHCP'],
      dataUnit: 'Data',
      color: 'bg-red-500',
      examples: ['Web Browser', 'E-Mail Client', 'File Transfer']
    },
    {
      number: 6,
      name: 'Presentation Layer',
      germanName: 'Darstellungsschicht',
      function: 'Datenformatierung, Verschlüsselung',
      protocols: ['SSL/TLS', 'JPEG', 'ASCII'],
      dataUnit: 'Data',
      color: 'bg-orange-500',
      examples: ['Encryption', 'Compression', 'Data Translation']
    },
    {
      number: 5,
      name: 'Session Layer',
      germanName: 'Sitzungsschicht',
      function: 'Sitzungsverwaltung',
      protocols: ['NetBIOS', 'NFS', 'SMB'],
      dataUnit: 'Data',
      color: 'bg-yellow-500',
      examples: ['Session Control', 'Dialog Management']
    },
    {
      number: 4,
      name: 'Transport Layer',
      germanName: 'Transportschicht',
      function: 'End-to-End Übertragung',
      protocols: ['TCP', 'UDP'],
      dataUnit: 'Segment',
      color: 'bg-green-500',
      examples: ['Port Numbers', 'Flow Control', 'Error Recovery']
    },
    {
      number: 3,
      name: 'Network Layer',
      germanName: 'Vermittlungsschicht',
      function: 'Routing, logische Adressierung',
      protocols: ['IP', 'ICMP', 'OSPF'],
      dataUnit: 'Packet',
      color: 'bg-blue-500',
      examples: ['IP Addresses', 'Routing Tables', 'Subnetting']
    },
    {
      number: 2,
      name: 'Data Link Layer',
      germanName: 'Sicherungsschicht',
      function: 'Fehlererkennung, MAC-Adressen',
      protocols: ['Ethernet', 'WLAN', 'PPP'],
      dataUnit: 'Frame',
      color: 'bg-indigo-500',
      examples: ['MAC Addresses', 'CRC', 'ARP']
    },
    {
      number: 1,
      name: 'Physical Layer',
      germanName: 'Bitübertragungsschicht',
      function: 'Bitübertragung, Leitungskodierung',
      protocols: ['NRZI', '4B5B', '5B6B'],
      dataUnit: 'Bit',
      color: 'bg-purple-500',
      examples: ['Cables', 'Signals', 'Line Coding']
    }
  ];

  const startDataFlow = () => {
    setShowAnimation(true);
    
    // Reset after animation completes
    setTimeout(() => {
      setShowAnimation(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🏗️</span>
          OSI-Referenzmodell
        </h2>
        <p className="text-gray-600 mb-6">
          Das OSI-Modell strukturiert Netzwerkkommunikation in 7 Schichten. 
          Klicken Sie auf eine Schicht für Details oder starten Sie die Datenfluss-Animation.
        </p>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={startDataFlow}
            disabled={showAnimation}
            className={`px-6 py-2 rounded-lg transition-colors ${
              showAnimation 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {showAnimation ? '📡 Simulation läuft...' : '📡 Datenfluss simulieren'}
          </button>
        </div>

        {/* Data Flow Visualization */}
        {showAnimation && (
          <div className="section-card mb-6">
            <h3 className="text-lg font-semibold mb-4 text-green-700">
              🚀 Datenpaket-Simulation aktiv!
            </h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4 mb-3">
                <div className="animate-pulse bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">
                  DATA PACKET
                </div>
                <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 animate-pulse"></div>
                </div>
                <span className="text-sm text-green-700 font-medium">
                  Layer {Math.floor((Date.now() % 3000) / 400) + 1} Processing...
                </span>
              </div>
              <p className="text-sm text-green-600">
                Das Datenpaket wird gerade durch alle OSI-Schichten verarbeitet. 
                Beachten Sie die grünen Highlights an den Layern!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OSI Stack Visualization */}
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">OSI-Schichten</h3>
          <div className="space-y-2">
            {layers.map((layer) => (
              <div
                key={layer.number}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-500 ${
                  selectedLayer === layer.number
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                } ${showAnimation ? `animate-bounce border-green-500 bg-green-100 shadow-xl` : ''}`}
                onClick={() => setSelectedLayer(selectedLayer === layer.number ? null : layer.number)}
                style={{
                  animationDelay: showAnimation ? `${(7 - layer.number) * 0.4}s` : '0s',
                  animationDuration: showAnimation ? '0.8s' : '0s'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${layer.color} text-white rounded-full flex items-center justify-center font-bold`}>
                      {layer.number}
                    </div>
                    <div>
                      <div className="font-semibold">{layer.name}</div>
                      <div className="text-sm text-gray-600">{layer.germanName}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{layer.dataUnit}</span>
                    {selectedLayer === layer.number ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {selectedLayer === layer.number && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700">Funktion:</h4>
                      <p className="text-sm text-gray-600">{layer.function}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700">Protokolle:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {layer.protocols.map((protocol) => (
                          <span
                            key={protocol}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700">Beispiele:</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                        {layer.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TCP/IP Mapping */}
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">TCP/IP Modell Zuordnung</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-blue-800">Application Layer</h4>
              <p className="text-sm text-blue-600">OSI Layer 5-7 (Session, Presentation, Application)</p>
              <div className="text-xs text-blue-500 mt-1">HTTP, SMTP, FTP, DNS</div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-800">Transport Layer</h4>
              <p className="text-sm text-green-600">OSI Layer 4 (Transport)</p>
              <div className="text-xs text-green-500 mt-1">TCP, UDP</div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h4 className="font-semibold text-yellow-800">Internet Layer</h4>
              <p className="text-sm text-yellow-600">OSI Layer 3 (Network)</p>
              <div className="text-xs text-yellow-500 mt-1">IP, ICMP</div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
              <h4 className="font-semibold text-purple-800">Network Access</h4>
              <p className="text-sm text-purple-600">OSI Layer 1-2 (Physical, Data Link)</p>
              <div className="text-xs text-purple-500 mt-1">Ethernet, WLAN, Leitungskodierung</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">💡 Merkhilfe:</h4>
            <div className="space-y-1 text-sm">
              <div><strong>Deutsch:</strong> "Alle Deutschen Studenten Trinken Verschiedene Sorten Bier"</div>
              <div><strong>English:</strong> "Please Do Not Throw Sausage Pizza Away"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSILayerVisualizer;
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

      {/* Communication Types (Addressing) - Full Width */}
      <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Adressierungsarten & Kommunikationsmodelle</h3>
          <p className="text-gray-600 mb-6">
            Verschiedene Arten der Netzwerkkommunikation - von 1:1 bis 1:viele Verbindungen.
          </p>

          {/* Top Row - Full Width Cards */}
          <div className="space-y-8">
            {/* Unicast & Broadcast Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Unicast */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 text-2xl">Unicast</h4>
                    <p className="text-blue-600 text-base">Punkt-zu-Punkt Kommunikation</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-blue-800 text-base">Definition:</strong>
                      <p className="text-blue-700">Ein Sender kommuniziert mit genau einem Empfänger</p>
                    </div>
                    <div>
                      <strong className="text-blue-800 text-base">IPv4 Bereich:</strong>
                      <p className="text-blue-700 font-mono bg-blue-200 px-2 py-1 rounded text-sm">1.0.0.0 - 223.255.255.255</p>
                      <p className="text-blue-600 text-sm">(Klasse A, B, C)</p>
                    </div>
                    <div>
                      <strong className="text-blue-800 text-base">Beispiele:</strong>
                      <p className="text-blue-700">HTTP-Request, SSH-Verbindung, FTP-Transfer</p>
                    </div>
                  </div>

                  {/* Unicast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#3B82F6" stroke="#1E40AF" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Sender</text>
                      
                      <circle cx="260" cy="60" r="25" fill="#10B981" stroke="#047857" strokeWidth="3"/>
                      <text x="260" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Empfänger</text>
                      
                      <path d="M 90 60 L 230 60" stroke="#3B82F6" strokeWidth="4" markerEnd="url(#blueArrow)" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite"/>
                      </path>
                      <text x="160" y="45" textAnchor="middle" className="text-sm font-bold text-blue-600">1:1 Verbindung</text>
                      
                      <defs>
                        <marker id="blueArrow" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                          <polygon points="0 0, 12 4, 0 8" fill="#3B82F6"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Broadcast */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:∀</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 text-2xl">Broadcast</h4>
                    <p className="text-red-600 text-base">An alle im Netzwerk</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-red-800 text-base">Definition:</strong>
                      <p className="text-red-700">Ein Sender kommuniziert mit allen Geräten im Subnetz</p>
                    </div>
                    <div>
                      <strong className="text-red-800 text-base">IPv4 Adresse:</strong>
                      <p className="text-red-700 font-mono bg-red-200 px-2 py-1 rounded text-sm">x.x.x.255 (Limited)</p>
                      <p className="text-red-700 font-mono bg-red-200 px-2 py-1 rounded text-sm mt-1">255.255.255.255 (Directed)</p>
                    </div>
                    <div>
                      <strong className="text-red-800 text-base">Beispiele:</strong>
                      <p className="text-red-700">ARP-Requests, DHCP-Discover, WOL-Pakete</p>
                    </div>
                  </div>

                  {/* Broadcast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-red-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#EF4444" stroke="#DC2626" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Sender</text>
                      
                      <circle cx="220" cy="30" r="18" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                      <text x="220" y="36" textAnchor="middle" className="text-xs font-bold fill-white">PC1</text>
                      
                      <circle cx="260" cy="60" r="18" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                      <text x="260" y="66" textAnchor="middle" className="text-xs font-bold fill-white">PC2</text>
                      
                      <circle cx="220" cy="90" r="18" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                      <text x="220" y="96" textAnchor="middle" className="text-xs font-bold fill-white">PC3</text>
                      
                      <path d="M 90 50 L 195 25" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrow)"/>
                      <path d="M 90 60 L 235 60" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrow)"/>
                      <path d="M 90 70 L 195 85" stroke="#EF4444" strokeWidth="3" markerEnd="url(#redArrow)"/>
                      
                      <text x="160" y="15" textAnchor="middle" className="text-sm font-bold text-red-600">an ALLE gleichzeitig</text>
                      
                      <defs>
                        <marker id="redArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Multicast & Anycast Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Multicast */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:n</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 text-2xl">Multicast</h4>
                    <p className="text-green-600 text-base">An eine Gruppe</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-green-800 text-base">Definition:</strong>
                      <p className="text-green-700">Ein Sender kommuniziert mit einer definierten Gruppe</p>
                    </div>
                    <div>
                      <strong className="text-green-800 text-base">IPv4 Bereich:</strong>
                      <p className="text-green-700 font-mono bg-green-200 px-2 py-1 rounded text-sm">224.0.0.0 - 239.255.255.255</p>
                      <p className="text-green-600 text-sm">(Klasse D)</p>
                    </div>
                    <div>
                      <strong className="text-green-800 text-base">Beispiele:</strong>
                      <p className="text-green-700">Video-Streaming, OSPF-Updates, PIM-Protokoll</p>
                    </div>
                  </div>

                  {/* Multicast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-green-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#10B981" stroke="#047857" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Sender</text>
                      
                      <circle cx="200" cy="30" r="18" fill="#3B82F6" stroke="#1E40AF" strokeWidth="3"/>
                      <text x="200" y="36" textAnchor="middle" className="text-xs font-bold fill-white">Sub</text>
                      
                      <circle cx="240" cy="60" r="18" fill="#3B82F6" stroke="#1E40AF" strokeWidth="3"/>
                      <text x="240" y="66" textAnchor="middle" className="text-xs font-bold fill-white">Sub</text>
                      
                      <circle cx="200" cy="90" r="18" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2"/>
                      <text x="200" y="96" textAnchor="middle" className="text-xs font-bold fill-white">No</text>
                      
                      <circle cx="280" cy="40" r="18" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2"/>
                      <text x="280" y="46" textAnchor="middle" className="text-xs font-bold fill-white">No</text>
                      
                      <path d="M 90 50 L 175 25" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrow)"/>
                      <path d="M 90 60 L 215 60" stroke="#10B981" strokeWidth="3" markerEnd="url(#greenArrow)"/>
                      <path d="M 90 70 L 175 85" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      <path d="M 90 50 L 255 35" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      
                      <text x="160" y="15" textAnchor="middle" className="text-sm font-bold text-green-600">nur Subscriber</text>
                      
                      <defs>
                        <marker id="greenArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Anycast */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">1:?</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-800 text-2xl">Anycast</h4>
                    <p className="text-purple-600 text-base">An den nächsten Server</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <strong className="text-purple-800 text-base">Definition:</strong>
                      <p className="text-purple-700">Mehrere Server mit gleicher IP, nächster wird ausgewählt</p>
                    </div>
                    <div>
                      <strong className="text-purple-800 text-base">Implementierung:</strong>
                      <p className="text-purple-700 font-mono bg-purple-200 px-2 py-1 rounded text-sm">IPv6 nativ</p>
                      <p className="text-purple-700 font-mono bg-purple-200 px-2 py-1 rounded text-sm mt-1">IPv4 über BGP-Routing</p>
                    </div>
                    <div>
                      <strong className="text-purple-800 text-base">Beispiele:</strong>
                      <p className="text-purple-700">DNS Root-Server, CDN-Knoten, IPv6 Router</p>
                    </div>
                  </div>

                  {/* Anycast Visualization */}
                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200 shadow-inner">
                    <svg width="100%" height="120" viewBox="0 0 320 120" className="mx-auto">
                      <circle cx="60" cy="60" r="25" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="3"/>
                      <text x="60" y="67" textAnchor="middle" className="text-sm font-bold fill-white">Client</text>
                      
                      <circle cx="200" cy="30" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                      <text x="200" y="36" textAnchor="middle" className="text-xs font-bold fill-white">NYC</text>
                      
                      <circle cx="240" cy="60" r="18" fill="#10B981" stroke="#047857" strokeWidth="4"/>
                      <text x="240" y="66" textAnchor="middle" className="text-xs font-bold fill-white">LON</text>
                      
                      <circle cx="280" cy="90" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                      <text x="280" y="96" textAnchor="middle" className="text-xs font-bold fill-white">TOK</text>
                      
                      <path d="M 90 60 L 215 60" stroke="#8B5CF6" strokeWidth="4" markerEnd="url(#purpleArrow)"/>
                      <path d="M 90 50 L 175 25" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      <path d="M 90 70 L 255 85" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5"/>
                      
                      <text x="160" y="45" textAnchor="middle" className="text-sm font-bold text-purple-600">nächster Server</text>
                      <text x="160" y="105" textAnchor="middle" className="text-xs text-purple-500">basierend auf Latenz</text>
                      
                      <defs>
                        <marker id="purpleArrow" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-8 overflow-x-auto">
            <h4 className="font-semibold mb-4">📊 Vergleichstabelle:</h4>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Typ</th>
                  <th className="px-4 py-2 border-b text-left">Verhältnis</th>
                  <th className="px-4 py-2 border-b text-left">IPv4 Bereich</th>
                  <th className="px-4 py-2 border-b text-left">Effizienz</th>
                  <th className="px-4 py-2 border-b text-left">Anwendung</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-blue-600">Unicast</td>
                  <td className="px-4 py-2 border-b">1:1</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">1.0.0.0 - 223.255.255.255</td>
                  <td className="px-4 py-2 border-b">🟢 Hoch</td>
                  <td className="px-4 py-2 border-b">Standard-Kommunikation</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-red-600">Broadcast</td>
                  <td className="px-4 py-2 border-b">1:alle</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">x.x.x.255, 255.255.255.255</td>
                  <td className="px-4 py-2 border-b">🔴 Niedrig</td>
                  <td className="px-4 py-2 border-b">ARP, DHCP, Service Discovery</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-green-600">Multicast</td>
                  <td className="px-4 py-2 border-b">1:n</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">224.0.0.0 - 239.255.255.255</td>
                  <td className="px-4 py-2 border-b">🟡 Mittel</td>
                  <td className="px-4 py-2 border-b">Streaming, Routing-Updates</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-semibold text-purple-600">Anycast</td>
                  <td className="px-4 py-2 border-b">1:nächster</td>
                  <td className="px-4 py-2 border-b font-mono text-xs">Normale IP + BGP Routing</td>
                  <td className="px-4 py-2 border-b">🟢 Hoch</td>
                  <td className="px-4 py-2 border-b">CDN, DNS, Load Balancing</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Practical Examples */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">🌐 Internet-Beispiele:</h5>
              <div className="space-y-2 text-sm text-blue-700">
                <div><strong>Unicast:</strong> Webseitenaufruf (HTTP/HTTPS)</div>
                <div><strong>Multicast:</strong> IPTV, Video-Konferenzen</div>
                <div><strong>Anycast:</strong> Google DNS (8.8.8.8), Cloudflare</div>
                <div><strong>Broadcast:</strong> Wake-on-LAN im lokalen Netz</div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h5 className="font-semibold text-orange-800 mb-2">🏢 Enterprise-Szenarien:</h5>
              <div className="space-y-2 text-sm text-orange-700">
                <div><strong>Unicast:</strong> E-Mail, File-Transfer, Remote-Desktop</div>
                <div><strong>Multicast:</strong> Software-Updates, Live-Übertragungen</div>
                <div><strong>Anycast:</strong> Load-Balancer, Geo-DNS</div>
                <div><strong>Broadcast:</strong> DHCP-Requests, NetBIOS-Namen</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default OSILayerVisualizer;
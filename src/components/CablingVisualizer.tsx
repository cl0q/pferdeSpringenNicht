import React, { useState } from 'react';
import { Cable, Building, Network, Monitor } from 'lucide-react';

interface CableType {
  name: string;
  fullName: string;
  maxDistance: string;
  bandwidth: string;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  color: string;
}

interface TopologyType {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
  example: string;
  icon: string;
}

const CablingVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cables' | 'topology' | 'structured' | 'examples'>('cables');
  const [selectedCable, setSelectedCable] = useState<string>('twisted-pair');

  const cableTypes: CableType[] = [
    {
      name: "Twisted-Pair",
      fullName: "Twisted-Pair Kabel (UTP/STP)",
      maxDistance: "100m (Ethernet)",
      bandwidth: "bis 10 Gbps",
      advantages: [
        "Kostengünstig",
        "Einfache Installation", 
        "Standard für LANs",
        "Gute EMI-Resistenz"
      ],
      disadvantages: [
        "Begrenzte Distanz",
        "Anfällig für Störungen",
        "Begrenzte Bandbreite"
      ],
      useCases: [
        "LAN-Verkabelung",
        "Ethernet-Verbindungen",
        "Telefonanlagen",
        "Büronetzwerke"
      ],
      color: "bg-blue-500"
    },
    {
      name: "Lichtwellenleiter",
      fullName: "Lichtwellenleiter (LWL/Fiber)",
      maxDistance: "40km+ (Single Mode)",
      bandwidth: "bis 100+ Gbps",
      advantages: [
        "Sehr hohe Bandbreite",
        "Große Distanzen",
        "EMI-immun",
        "Sichere Übertragung"
      ],
      disadvantages: [
        "Teuer",
        "Aufwändige Installation",
        "Spezielle Werkzeuge nötig",
        "Fragil"
      ],
      useCases: [
        "WAN-Verbindungen",
        "Backbone-Netze",
        "Rechenzentren",
        "Hochgeschwindigkeits-Links"
      ],
      color: "bg-green-500"
    },
    {
      name: "Koaxialkabel",
      fullName: "Koaxialkabel (Coax)",
      maxDistance: "500m (10Base2)",
      bandwidth: "bis 1 Gbps",
      advantages: [
        "Gute Schirmung",
        "Hohe Bandbreite",
        "Störungsresistent",
        "Bewährte Technologie"
      ],
      disadvantages: [
        "Teurer als Twisted-Pair",
        "Schwerer",
        "Collision Domain Probleme",
        "Legacy-Technologie"
      ],
      useCases: [
        "Kabel-TV",
        "Legacy-Netzwerke",
        "Antennenanschlüsse",
        "Hochfrequenz-Übertragung"
      ],
      color: "bg-orange-500"
    }
  ];

  const topologyTypes: TopologyType[] = [
    {
      name: "Stern (Star)",
      description: "Alle Geräte sind zentral mit einem Hub/Switch verbunden",
      advantages: [
        "Einfache Fehlerdiagnose",
        "Ausfall eines Geräts betrifft nicht andere",
        "Leichte Erweiterung",
        "Zentrale Verwaltung"
      ],
      disadvantages: [
        "Single Point of Failure (zentraler Knoten)",
        "Mehr Kabel benötigt",
        "Zentrale Komponente muss leistungsfähig sein"
      ],
      example: "Moderne Ethernet-Netzwerke mit Switch",
      icon: "⭐"
    },
    {
      name: "Bus",
      description: "Alle Geräte sind an ein gemeinsames Übertragungsmedium angeschlossen",
      advantages: [
        "Wenig Kabel benötigt",
        "Kostengünstig",
        "Einfache Verkabelung"
      ],
      disadvantages: [
        "Kollisionen möglich",
        "Schwere Fehlerdiagnose",
        "Kabelbruch betrifft alle",
        "Performance sinkt mit mehr Geräten"
      ],
      example: "Altes Ethernet (10Base2/10Base5)",
      icon: "🚌"
    },
    {
      name: "Ring",
      description: "Geräte sind in einem geschlossenen Ring verbunden",
      advantages: [
        "Deterministischer Zugriff",
        "Hohe Performance bei Last",
        "Redundanz möglich"
      ],
      disadvantages: [
        "Ausfall eines Geräts kann Ring unterbrechen",
        "Schwierige Konfiguration",
        "Latenz durch Token-Passing"
      ],
      example: "Token Ring, FDDI",
      icon: "💍"
    },
    {
      name: "Vollvermascht (Mesh)",
      description: "Jedes Gerät ist mit jedem anderen direkt verbunden",
      advantages: [
        "Maximale Redundanz",
        "Optimale Performance",
        "Keine Single Points of Failure",
        "Direkte Pfade"
      ],
      disadvantages: [
        "Sehr teuer (n*(n-1)/2 Verbindungen)",
        "Komplex zu verwalten",
        "Skalierbarkeit begrenzt"
      ],
      example: "Kleine kritische Netzwerke, WAN-Backbone",
      icon: "🕸️"
    },
    {
      name: "Baum (Tree)",
      description: "Hierarchische Struktur ohne Schleifen",
      advantages: [
        "Skalierbar",
        "Strukturiert und organisiert",
        "Einfache Adressierung",
        "Kostengünstig"
      ],
      disadvantages: [
        "Root-Knoten ist kritisch",
        "Längere Pfade möglich",
        "Keine Redundanz"
      ],
      example: "Campus-Netzwerke, ISP-Hierarchien",
      icon: "🌳"
    }
  ];

  const currentCable = cableTypes.find(c => c.name.toLowerCase().replace(/[^a-z]/g, '-') === selectedCable);

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🔌</span>
          Verkabelung & Netzwerk-Topologien
        </h2>
        <p className="text-gray-600 mb-6">
          Verstehen Sie Übertragungsmedien und Netzwerk-Topologien. 
          Basierend auf Übungsaufgaben zur strukturierten Verkabelung.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'cables', label: 'Kabeltypen', icon: Cable },
            { id: 'topology', label: 'Topologien', icon: Network },
            { id: 'structured', label: 'Strukturierte Verkabelung', icon: Building },
            { id: 'examples', label: 'Praxis-Beispiele', icon: Monitor }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cable Types Tab */}
      {activeTab === 'cables' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">Übertragungsmedien im Vergleich</h3>
            
            {/* Cable Selection */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cableTypes.map((cable) => (
                <button
                  key={cable.name}
                  onClick={() => setSelectedCable(cable.name.toLowerCase().replace(/[^a-z]/g, '-'))}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedCable === cable.name.toLowerCase().replace(/[^a-z]/g, '-')
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {cable.name}
                </button>
              ))}
            </div>

            {/* Cable Details */}
            {currentCable && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-6 h-6 ${currentCable.color} rounded`}></div>
                    <h4 className="text-xl font-semibold">{currentCable.fullName}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-gray-700">Max. Distanz:</div>
                      <div className="text-lg font-semibold text-blue-600">{currentCable.maxDistance}</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-gray-700">Bandbreite:</div>
                      <div className="text-lg font-semibold text-green-600">{currentCable.bandwidth}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">✅ Vorteile:</h5>
                      <ul className="space-y-1">
                        {currentCable.advantages.map((adv, i) => (
                          <li key={i} className="text-sm text-green-600 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-red-700 mb-2">❌ Nachteile:</h5>
                      <ul className="space-y-1">
                        {currentCable.disadvantages.map((dis, i) => (
                          <li key={i} className="text-sm text-red-600 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {dis}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">🔧 Einsatzgebiete:</h5>
                      <ul className="space-y-1">
                        {currentCable.useCases.map((use, i) => (
                          <li key={i} className="text-sm text-blue-600 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cable Visualization */}
                <div className="bg-white border rounded-lg p-6">
                  <h5 className="font-semibold mb-4">Kabel-Aufbau: {currentCable.name}</h5>
                  
                  {currentCable.name === 'Twisted-Pair' && (
                    <div className="space-y-4">
                      <svg width="400" height="120" className="border rounded">
                        <defs>
                          <pattern id="twistPattern" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0,20 Q10,0 20,20 Q10,40 0,20" stroke="#3B82F6" strokeWidth="3" fill="none"/>
                            <path d="M0,20 Q10,40 20,20 Q10,0 0,20" stroke="#10B981" strokeWidth="3" fill="none"/>
                          </pattern>
                        </defs>
                        <rect x="20" y="20" width="360" height="80" fill="#6B7280" rx="5"/>
                        <rect x="30" y="30" width="340" height="60" fill="url(#twistPattern)"/>
                        <text x="200" y="110" textAnchor="middle" className="text-sm font-medium">8 verdrillte Adern (4 Paare)</text>
                      </svg>
                      <div className="text-sm text-gray-600">
                        <p><strong>Aufbau:</strong> 8 Kupferadern in 4 verdrillten Paaren, oft mit PVC-Mantel</p>
                        <p><strong>Standards:</strong> Cat5e (1 Gbps), Cat6 (10 Gbps), Cat6a (10 Gbps bei 100m)</p>
                      </div>
                    </div>
                  )}

                  {currentCable.name === 'Lichtwellenleiter' && (
                    <div className="space-y-4">
                      <svg width="400" height="100" className="border rounded">
                        <rect x="20" y="35" width="360" height="30" fill="#FFD700" rx="15"/>
                        <rect x="25" y="40" width="350" height="20" fill="#FF6B35" rx="10"/>
                        <circle cx="200" cy="50" r="8" fill="#10B981"/>
                        <text x="200" y="80" textAnchor="middle" className="text-sm font-medium">Glasfaser-Kern</text>
                        <text x="100" y="95" textAnchor="middle" className="text-xs">Cladding</text>
                        <text x="300" y="95" textAnchor="middle" className="text-xs">Schutzmantel</text>
                      </svg>
                      <div className="text-sm text-gray-600">
                        <p><strong>Single-Mode:</strong> 9μm Kerndurchmesser, große Distanzen</p>
                        <p><strong>Multi-Mode:</strong> 50/62,5μm Kerndurchmesser, kürzere Distanzen</p>
                      </div>
                    </div>
                  )}

                  {currentCable.name === 'Koaxialkabel' && (
                    <div className="space-y-4">
                      <svg width="400" height="100" className="border rounded">
                        <rect x="20" y="30" width="360" height="40" fill="#6B7280" rx="20"/>
                        <rect x="30" y="35" width="340" height="30" fill="#E5E7EB" rx="15"/>
                        <rect x="40" y="40" width="320" height="20" fill="#FDE047" rx="10"/>
                        <rect x="195" y="45" width="10" height="10" fill="#DC2626"/>
                        <text x="200" y="85" textAnchor="middle" className="text-sm font-medium">Innenleiter (Kupfer)</text>
                        <text x="100" y="95" textAnchor="middle" className="text-xs">Dielektrikum</text>
                        <text x="300" y="95" textAnchor="middle" className="text-xs">Schirmung + Mantel</text>
                      </svg>
                      <div className="text-sm text-gray-600">
                        <p><strong>Aufbau:</strong> Zentraler Kupferleiter, Isolierung, Schirmung, Außenmantel</p>
                        <p><strong>Impedanz:</strong> 50Ω (Netzwerke), 75Ω (Kabel-TV)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Network Topology Tab */}
      {activeTab === 'topology' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Netzwerk-Topologien</h3>
          <p className="text-gray-600 mb-6">
            Die physische und logische Anordnung von Netzwerkkomponenten beeinflusst Performance, 
            Kosten und Ausfallsicherheit.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topologyTypes.map((topology, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{topology.icon}</span>
                  <h4 className="text-lg font-semibold">{topology.name}</h4>
                </div>
                
                <p className="text-gray-600 mb-4">{topology.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-700 mb-1">Vorteile:</h5>
                    <ul className="text-sm space-y-1">
                      {topology.advantages.map((adv, j) => (
                        <li key={j} className="text-green-600 flex items-start">
                          <span className="text-green-500 mr-2">+</span>
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-red-700 mb-1">Nachteile:</h5>
                    <ul className="text-sm space-y-1">
                      {topology.disadvantages.map((dis, j) => (
                        <li key={j} className="text-red-600 flex items-start">
                          <span className="text-red-500 mr-2">-</span>
                          {dis}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded">
                    <h5 className="font-medium text-blue-700 mb-1">Beispiel:</h5>
                    <p className="text-sm text-blue-600">{topology.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Topology Visualization */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Topologie-Vergleich (Anzahl Verbindungen bei n Knoten):</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Topologie</th>
                    <th className="border border-gray-300 px-3 py-2">Verbindungen</th>
                    <th className="border border-gray-300 px-3 py-2">Bei 10 Knoten</th>
                    <th className="border border-gray-300 px-3 py-2">Skalierbarkeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">Stern</td>
                    <td className="border border-gray-300 px-3 py-2">n-1</td>
                    <td className="border border-gray-300 px-3 py-2">9</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-600">Sehr gut</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">Bus</td>
                    <td className="border border-gray-300 px-3 py-2">1</td>
                    <td className="border border-gray-300 px-3 py-2">1</td>
                    <td className="border border-gray-300 px-3 py-2 text-yellow-600">Begrenzt</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">Ring</td>
                    <td className="border border-gray-300 px-3 py-2">n</td>
                    <td className="border border-gray-300 px-3 py-2">10</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-600">Gut</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">Vollvermascht</td>
                    <td className="border border-gray-300 px-3 py-2">n*(n-1)/2</td>
                    <td className="border border-gray-300 px-3 py-2">45</td>
                    <td className="border border-gray-300 px-3 py-2 text-red-600">Schlecht</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Structured Cabling Tab */}
      {activeTab === 'structured' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Strukturierte Verkabelung</h3>
          <p className="text-gray-600 mb-6">
            Moderne Gebäude verwenden strukturierte Verkabelung für eine organisierte, 
            skalierbare Netzwerk-Infrastruktur.
          </p>

          {/* Structured Cabling Diagram */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold mb-4">Klassische Struktur der strukturierten Verkabelung:</h4>
            
            <svg width="600" height="400" className="border border-gray-300 rounded bg-white">
              {/* Campus Backbone */}
              <rect x="50" y="50" width="120" height="60" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" rx="5"/>
              <text x="110" y="75" textAnchor="middle" className="text-sm font-bold fill-white">Campus</text>
              <text x="110" y="90" textAnchor="middle" className="text-sm fill-white">Backbone</text>

              {/* Building Backbone */}
              <rect x="250" y="50" width="120" height="60" fill="#10B981" stroke="#047857" strokeWidth="2" rx="5"/>
              <text x="310" y="75" textAnchor="middle" className="text-sm font-bold fill-white">Building</text>
              <text x="310" y="90" textAnchor="middle" className="text-sm fill-white">Backbone</text>

              {/* Floor Distributors */}
              <rect x="450" y="30" width="100" height="40" fill="#F59E0B" stroke="#D97706" strokeWidth="2" rx="5"/>
              <text x="500" y="52" textAnchor="middle" className="text-sm font-bold fill-white">Floor 3</text>
              
              <rect x="450" y="80" width="100" height="40" fill="#F59E0B" stroke="#D97706" strokeWidth="2" rx="5"/>
              <text x="500" y="102" textAnchor="middle" className="text-sm font-bold fill-white">Floor 2</text>
              
              <rect x="450" y="130" width="100" height="40" fill="#F59E0B" stroke="#D97706" strokeWidth="2" rx="5"/>
              <text x="500" y="152" textAnchor="middle" className="text-sm font-bold fill-white">Floor 1</text>

              {/* Horizontal Cabling */}
              <rect x="450" y="200" width="100" height="60" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2" rx="5"/>
              <text x="500" y="220" textAnchor="middle" className="text-sm font-bold fill-white">Horizontal</text>
              <text x="500" y="235" textAnchor="middle" className="text-sm fill-white">Cabling</text>
              <text x="500" y="250" textAnchor="middle" className="text-sm fill-white">(≤ 90m)</text>

              {/* Work Areas */}
              <rect x="450" y="290" width="40" height="30" fill="#EF4444" stroke="#DC2626" strokeWidth="2" rx="3"/>
              <text x="470" y="308" textAnchor="middle" className="text-xs fill-white">PC</text>
              
              <rect x="510" y="290" width="40" height="30" fill="#EF4444" stroke="#DC2626" strokeWidth="2" rx="3"/>
              <text x="530" y="308" textAnchor="middle" className="text-xs fill-white">PC</text>

              {/* Connection Lines */}
              <line x1="170" y1="80" x2="250" y2="80" stroke="#000" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              <line x1="370" y1="50" x2="450" y2="50" stroke="#000" strokeWidth="2"/>
              <line x1="370" y1="80" x2="450" y2="100" stroke="#000" strokeWidth="2"/>
              <line x1="370" y1="100" x2="450" y2="150" stroke="#000" strokeWidth="2"/>
              <line x1="500" y1="170" x2="500" y2="200" stroke="#000" strokeWidth="2"/>
              <line x1="470" y1="260" x2="470" y2="290" stroke="#000" strokeWidth="2"/>
              <line x1="530" y1="260" x2="530" y2="290" stroke="#000" strokeWidth="2"/>

              {/* Cable Type Labels */}
              <text x="210" y="95" textAnchor="middle" className="text-xs font-medium">LWL</text>
              <text x="410" y="70" textAnchor="middle" className="text-xs font-medium">LWL</text>
              <text x="470" y="280" textAnchor="middle" className="text-xs font-medium">UTP</text>

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#000"/>
                </marker>
              </defs>
            </svg>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-100 p-3 rounded">
                <h5 className="font-semibold text-blue-800">Campus Backbone</h5>
                <p className="text-blue-700">Verbindet Gebäude untereinander</p>
                <p className="text-xs text-blue-600">LWL, hohe Bandbreite</p>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <h5 className="font-semibold text-green-800">Building Backbone</h5>
                <p className="text-green-700">Verbindet Stockwerke im Gebäude</p>
                <p className="text-xs text-green-600">LWL oder Cat6+</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <h5 className="font-semibold text-yellow-800">Floor Distributor</h5>
                <p className="text-yellow-700">Verteilerraum pro Stockwerk</p>
                <p className="text-xs text-yellow-600">Switches, Patch-Panels</p>
              </div>
              <div className="bg-purple-100 p-3 rounded">
                <h5 className="font-semibold text-purple-800">Horizontal Cabling</h5>
                <p className="text-purple-700">Verbindung zu Arbeitsplätzen</p>
                <p className="text-xs text-purple-600">≤ 90m, Cat5e/Cat6</p>
              </div>
              <div className="bg-red-100 p-3 rounded">
                <h5 className="font-semibold text-red-800">Work Area</h5>
                <p className="text-red-700">Endgeräte-Anschlüsse</p>
                <p className="text-xs text-red-600">RJ45-Dosen</p>
              </div>
            </div>
          </div>

          {/* Standards and Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">📏 Distanz-Regeln:</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• <strong>Horizontal Cabling:</strong> max. 90m</li>
                <li>• <strong>Patch-Kabel:</strong> max. 10m (Work Area + Equipment)</li>
                <li>• <strong>Gesamt End-to-End:</strong> max. 100m</li>
                <li>• <strong>LWL Backbone:</strong> je nach Typ (2km - 40km+)</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">🔧 Komponenten:</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• <strong>Patch-Panels:</strong> Zentrale Konnektivität</li>
                <li>• <strong>RJ45-Dosen:</strong> Arbeitsplatz-Anschlüsse</li>
                <li>• <strong>Cross-Connect:</strong> Flexible Verbindungen</li>
                <li>• <strong>Cable Management:</strong> Organisation</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">Praxis-Beispiele</h3>
            
            {/* Collision Domain Example */}
            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold text-yellow-800 mb-4">🚗 Collision Domains:</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2">Hub (Legacy):</h5>
                  <div className="bg-white p-4 border rounded">
                    <svg width="300" height="150">
                      <circle cx="150" cy="75" r="30" fill="#EF4444" stroke="#000" strokeWidth="2"/>
                      <text x="150" y="80" textAnchor="middle" className="text-sm font-bold">HUB</text>
                      
                      <circle cx="50" cy="30" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="50" y="35" textAnchor="middle" className="text-xs fill-white">PC1</text>
                      
                      <circle cx="250" cy="30" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="250" y="35" textAnchor="middle" className="text-xs fill-white">PC2</text>
                      
                      <circle cx="50" cy="120" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="50" y="125" textAnchor="middle" className="text-xs fill-white">PC3</text>
                      
                      <circle cx="250" cy="120" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="250" y="125" textAnchor="middle" className="text-xs fill-white">PC4</text>
                      
                      <line x1="65" y1="35" x2="130" y2="60" stroke="#000" strokeWidth="2"/>
                      <line x1="235" y1="35" x2="170" y2="60" stroke="#000" strokeWidth="2"/>
                      <line x1="65" y1="115" x2="130" y2="90" stroke="#000" strokeWidth="2"/>
                      <line x1="235" y1="115" x2="170" y2="90" stroke="#000" strokeWidth="2"/>
                      
                      <ellipse cx="150" cy="75" rx="120" ry="60" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="5,5"/>
                    </svg>
                    <p className="text-sm text-red-600 mt-2">
                      <strong>1 Collision Domain</strong> - Alle Geräte teilen sich die Bandbreite
                    </p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Switch (Modern):</h5>
                  <div className="bg-white p-4 border rounded">
                    <svg width="300" height="150">
                      <rect x="120" y="60" width="60" height="30" fill="#10B981" stroke="#000" strokeWidth="2" rx="5"/>
                      <text x="150" y="78" textAnchor="middle" className="text-sm font-bold fill-white">Switch</text>
                      
                      <circle cx="50" cy="30" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="50" y="35" textAnchor="middle" className="text-xs fill-white">PC1</text>
                      
                      <circle cx="250" cy="30" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="250" y="35" textAnchor="middle" className="text-xs fill-white">PC2</text>
                      
                      <circle cx="50" cy="120" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="50" y="125" textAnchor="middle" className="text-xs fill-white">PC3</text>
                      
                      <circle cx="250" cy="120" r="15" fill="#3B82F6" stroke="#000"/>
                      <text x="250" y="125" textAnchor="middle" className="text-xs fill-white">PC4</text>
                      
                      <line x1="65" y1="35" x2="125" y2="65" stroke="#000" strokeWidth="2"/>
                      <line x1="235" y1="35" x2="175" y2="65" stroke="#000" strokeWidth="2"/>
                      <line x1="65" y1="115" x2="125" y2="85" stroke="#000" strokeWidth="2"/>
                      <line x1="235" y1="115" x2="175" y2="85" stroke="#000" strokeWidth="2"/>
                      
                      <circle cx="87" cy="50" r="25" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                      <circle cx="213" cy="50" r="25" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                      <circle cx="87" cy="100" r="25" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                      <circle cx="213" cy="100" r="25" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                    </svg>
                    <p className="text-sm text-green-600 mt-2">
                      <strong>4 Collision Domains</strong> - Jeder Port ist eine separate Collision Domain
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Components */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">🔧 Passive Netzwerk-Komponenten:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 border rounded">
                  <h5 className="font-semibold text-blue-800 mb-2">Repeater</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Verstärkt Signale (Layer 1)</p>
                    <p>• Keine MAC-Adressen</p>
                    <p>• Erweitert Distanz</p>
                    <p>• 1 Collision Domain</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 border rounded">
                  <h5 className="font-semibold text-orange-800 mb-2">Hub</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Multi-Port Repeater</p>
                    <p>• Shared Medium (CSMA/CD)</p>
                    <p>• Half-Duplex</p>
                    <p>• 1 Collision Domain</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 border rounded">
                  <h5 className="font-semibold text-green-800 mb-2">Switch</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Learning Bridge</p>
                    <p>• MAC-Address Table</p>
                    <p>• Full-Duplex</p>
                    <p>• 1 CD pro Port</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CablingVisualizer;
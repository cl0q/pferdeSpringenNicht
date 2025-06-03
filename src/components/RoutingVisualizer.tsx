import React, { useState } from 'react';
import { Route, ArrowRight, Play, RotateCcw } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface DijkstraStep {
  current: string;
  distances: { [key: string]: number };
  previous: { [key: string]: string | null };
  visited: Set<string>;
  step: number;
}

interface RoutingTableEntry {
  destination: string;
  nextHop: string;
  distance: number;
  interface: string;
}

const RoutingVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dijkstra' | 'forwarding' | 'examples'>('dijkstra');
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExample, setSelectedExample] = useState('example1');

  // Network topology examples from exercises
  const networkExamples = {
    example1: {
      name: "Aufgabe 3.1 - Universitätsnetzwerk",
      nodes: [
        { id: 'A', label: 'Router A\n(Start)', x: 100, y: 150 },
        { id: 'B', label: 'Router B', x: 250, y: 100 },
        { id: 'C', label: 'Router C', x: 400, y: 150 },
        { id: 'D', label: 'Router D', x: 250, y: 200 },
        { id: 'E', label: 'Router E', x: 400, y: 250 }
      ],
      edges: [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'A', to: 'D', weight: 2 },
        { from: 'B', to: 'C', weight: 3 },
        { from: 'B', to: 'D', weight: 1 },
        { from: 'C', to: 'E', weight: 2 },
        { from: 'D', to: 'E', weight: 5 }
      ]
    },
    example2: {
      name: "Aufgabe 3.2 - Campus-Netzwerk",
      nodes: [
        { id: 'A', label: 'Router A\n(Start)', x: 100, y: 150 },
        { id: 'B', label: 'Router B', x: 200, y: 80 },
        { id: 'C', label: 'Router C', x: 300, y: 120 },
        { id: 'D', label: 'Router D', x: 200, y: 220 },
        { id: 'E', label: 'Router E', x: 350, y: 200 },
        { id: 'F', label: 'Router F', x: 450, y: 150 }
      ],
      edges: [
        { from: 'A', to: 'B', weight: 2 },
        { from: 'A', to: 'D', weight: 6 },
        { from: 'B', to: 'C', weight: 3 },
        { from: 'B', to: 'D', weight: 2 },
        { from: 'C', to: 'E', weight: 1 },
        { from: 'C', to: 'F', weight: 4 },
        { from: 'D', to: 'E', weight: 4 },
        { from: 'E', to: 'F', weight: 2 }
      ]
    }
  };

  const currentNetwork = networkExamples[selectedExample as keyof typeof networkExamples];
  
  // Dijkstra algorithm implementation
  const runDijkstra = (nodes: Node[], edges: Edge[], start: string): DijkstraStep[] => {
    const steps: DijkstraStep[] = [];
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const visited = new Set<string>();
    
    // Initialize
    nodes.forEach(node => {
      distances[node.id] = node.id === start ? 0 : Infinity;
      previous[node.id] = null;
    });
    
    steps.push({
      current: start,
      distances: { ...distances },
      previous: { ...previous },
      visited: new Set(),
      step: 0
    });
    
    while (visited.size < nodes.length) {
      // Find unvisited node with minimum distance
      let current = '';
      let minDistance = Infinity;
      
      for (const nodeId of Object.keys(distances)) {
        if (!visited.has(nodeId) && distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          current = nodeId;
        }
      }
      
      if (current === '') break;
      
      visited.add(current);
      
      // Update distances to neighbors
      const neighbors = edges.filter(edge => 
        edge.from === current || edge.to === current
      );
      
      neighbors.forEach(edge => {
        const neighbor = edge.from === current ? edge.to : edge.from;
        if (!visited.has(neighbor)) {
          const newDistance = distances[current] + edge.weight;
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = current;
          }
        }
      });
      
      steps.push({
        current,
        distances: { ...distances },
        previous: { ...previous },
        visited: new Set(visited),
        step: steps.length
      });
    }
    
    return steps;
  };

  const [dijkstraSteps, setDijkstraSteps] = useState<DijkstraStep[]>([]);

  const startDijkstra = () => {
    const steps = runDijkstra(currentNetwork.nodes, currentNetwork.edges, 'A');
    setDijkstraSteps(steps);
    setCurrentStep(0);
    setIsRunning(true);
  };

  const nextStep = () => {
    if (currentStep < dijkstraSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setDijkstraSteps([]);
  };

  // Build routing table from final step
  const buildRoutingTable = (finalStep: DijkstraStep): RoutingTableEntry[] => {
    const table: RoutingTableEntry[] = [];
    
    Object.keys(finalStep.distances).forEach(dest => {
      if (dest !== 'A' && finalStep.distances[dest] !== Infinity) {
        // Find next hop by following path backwards
        let current = dest;
        let nextHop = dest;
        
        while (finalStep.previous[current] && finalStep.previous[current] !== 'A') {
          current = finalStep.previous[current]!;
          nextHop = current;
        }
        
        if (finalStep.previous[current] === 'A') {
          nextHop = current;
        }
        
        table.push({
          destination: dest,
          nextHop: nextHop,
          distance: finalStep.distances[dest],
          interface: `eth${nextHop.charCodeAt(0) - 65}`
        });
      }
    });
    
    return table.sort((a, b) => a.destination.localeCompare(b.destination));
  };

  // Forwarding decision examples
  const forwardingExamples = [
    {
      title: "Beispiel 1: Subnetz-Routing",
      scenario: "Sender: 201.20.222.13/255.255.255.240, Empfänger: 201.20.222.17/255.255.255.240",
      senderSubnet: "201.20.222.0",
      receiverSubnet: "201.20.222.16", 
      decision: "Paket verlässt das Subnetz",
      explanation: "Sender ist in Subnetz 201.20.222.0/28, Empfänger in 201.20.222.16/28 → Router erforderlich"
    },
    {
      title: "Beispiel 2: Gleiches Subnetz",
      scenario: "Sender: 132.152.83.254/255.255.252.0, Empfänger: 132.152.81.2/255.255.252.0",
      senderSubnet: "132.152.80.0",
      receiverSubnet: "132.152.80.0",
      decision: "Paket bleibt im Subnetz",
      explanation: "Beide Geräte im gleichen Subnetz 132.152.80.0/22 → Direkter Layer-2 Switch"
    }
  ];

  const currentStepData = dijkstraSteps[currentStep];

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🗺️</span>
          Routing & Forwarding
        </h2>
        <p className="text-gray-600 mb-6">
          Verstehen Sie, wie Router Pfade finden (Routing) und Pakete weiterleiten (Forwarding). 
          Basierend auf Übungsaufgaben 3.1 und 3.2.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'dijkstra', label: 'Dijkstra-Algorithmus', icon: Route },
            { id: 'forwarding', label: 'Forwarding-Entscheidungen', icon: ArrowRight },
            { id: 'examples', label: 'Routing-Protokolle', icon: Play }
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

      {/* Dijkstra Algorithm Tab */}
      {activeTab === 'dijkstra' && (
        <div className="space-y-6">
          <div className="section-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Dijkstra-Algorithmus Simulation</h3>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedExample}
                  onChange={(e) => {
                    setSelectedExample(e.target.value);
                    resetSimulation();
                  }}
                  className="border border-gray-300 rounded px-3 py-1"
                >
                  <option value="example1">Aufgabe 3.1</option>
                  <option value="example2">Aufgabe 3.2</option>
                </select>
                <button
                  onClick={startDijkstra}
                  disabled={isRunning}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                  <Play className="h-4 w-4 inline mr-2" />
                  Start
                </button>
                <button
                  onClick={resetSimulation}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  <RotateCcw className="h-4 w-4 inline mr-2" />
                  Reset
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{currentNetwork.name}</p>

            {/* Network Visualization */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <svg width="550" height="300" className="border border-gray-200 rounded">
                {/* Edges */}
                {currentNetwork.edges.map((edge, i) => {
                  const fromNode = currentNetwork.nodes.find(n => n.id === edge.from)!;
                  const toNode = currentNetwork.nodes.find(n => n.id === edge.to)!;
                  
                  return (
                    <g key={i}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#6B7280"
                        strokeWidth="2"
                      />
                      <text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 5}
                        textAnchor="middle"
                        className="text-sm font-semibold fill-blue-600"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  );
                })}
                
                {/* Nodes */}
                {currentNetwork.nodes.map((node) => {
                  const isVisited = currentStepData?.visited.has(node.id);
                  const isCurrent = currentStepData?.current === node.id;
                  const distance = currentStepData?.distances[node.id];
                  
                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="25"
                        fill={isCurrent ? '#EF4444' : isVisited ? '#10B981' : '#3B82F6'}
                        stroke="#1F2937"
                        strokeWidth="2"
                      />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        className="text-sm font-bold fill-white"
                      >
                        {node.id}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 45}
                        textAnchor="middle"
                        className="text-xs font-semibold"
                      >
                        {node.label.split('\n')[0]}
                      </text>
                      {distance !== undefined && distance !== Infinity && (
                        <text
                          x={node.x}
                          y={node.y - 35}
                          textAnchor="middle"
                          className="text-sm font-bold fill-red-600"
                        >
                          d={distance}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
              
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span>Unbesucht</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Aktuell</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Besucht</span>
                </div>
              </div>
            </div>

            {/* Step Controls and Information */}
            {isRunning && dijkstraSteps.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                  >
                    ← Zurück
                  </button>
                  <span className="text-sm font-medium">
                    Schritt {currentStep + 1} von {dijkstraSteps.length}
                  </span>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === dijkstraSteps.length - 1}
                    className="bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                  >
                    Weiter →
                  </button>
                </div>

                {/* Current Step Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Schritt {currentStep + 1}: 
                    {currentStep === 0 ? ' Initialisierung' : ` Verarbeite Knoten ${currentStepData?.current}`}
                  </h4>
                  
                  {/* Distance Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-2 py-1">Knoten</th>
                          {currentNetwork.nodes.map(node => (
                            <th key={node.id} className="border border-gray-300 px-2 py-1">
                              {node.id}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 font-medium">Distanz</td>
                          {currentNetwork.nodes.map(node => (
                            <td 
                              key={node.id} 
                              className={`border border-gray-300 px-2 py-1 text-center ${
                                currentStepData?.current === node.id ? 'bg-red-100' : 
                                currentStepData?.visited.has(node.id) ? 'bg-green-100' : ''
                              }`}
                            >
                              {currentStepData?.distances[node.id] === Infinity ? '∞' : currentStepData?.distances[node.id]}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 font-medium">Vorgänger</td>
                          {currentNetwork.nodes.map(node => (
                            <td key={node.id} className="border border-gray-300 px-2 py-1 text-center">
                              {currentStepData?.previous[node.id] || '-'}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Final Routing Table */}
                {currentStep === dijkstraSteps.length - 1 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">📋 Resultierende Routing-Tabelle für Router A:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-300 px-3 py-2">Ziel</th>
                            <th className="border border-gray-300 px-3 py-2">Next Hop</th>
                            <th className="border border-gray-300 px-3 py-2">Distanz</th>
                            <th className="border border-gray-300 px-3 py-2">Interface</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buildRoutingTable(currentStepData).map((entry, i) => (
                            <tr key={i}>
                              <td className="border border-gray-300 px-3 py-2">{entry.destination}</td>
                              <td className="border border-gray-300 px-3 py-2">{entry.nextHop}</td>
                              <td className="border border-gray-300 px-3 py-2">{entry.distance}</td>
                              <td className="border border-gray-300 px-3 py-2">{entry.interface}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Forwarding Decisions Tab */}
      {activeTab === 'forwarding' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Forwarding-Entscheidungen</h3>
          <p className="text-gray-600 mb-6">
            Wie entscheidet ein Router, ob ein Paket das Subnetz verlassen muss?
          </p>

          <div className="space-y-6">
            {forwardingExamples.map((example, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">{example.title}</h4>
                
                <div className="bg-gray-50 p-4 rounded mb-4">
                  <div className="font-mono text-sm mb-2">{example.scenario}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-medium text-blue-800">Sender-Subnetz:</div>
                    <div className="font-mono text-sm">{example.senderSubnet}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-medium text-purple-800">Empfänger-Subnetz:</div>
                    <div className="font-mono text-sm">{example.receiverSubnet}</div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  example.decision.includes('verlässt') ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                } border`}>
                  <div className="font-semibold mb-2">
                    🎯 Entscheidung: {example.decision}
                  </div>
                  <div className="text-sm">{example.explanation}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Forwarding Algorithm */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">🔄 Forwarding-Algorithmus:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Extrahiere Ziel-IP aus IP-Header</li>
              <li>Durchsuche Routing-Tabelle nach längstem Präfix-Match</li>
              <li>Ermittle Next-Hop und Ausgangs-Interface</li>
              <li>Wenn lokales Subnetz → Layer 2 Switching</li>
              <li>Wenn externes Subnetz → Weiterleitung an Next-Hop Router</li>
              <li>Dekrementiere TTL und aktualisiere Checksumme</li>
              <li>Sende Paket über bestimmtes Interface</li>
            </ol>
          </div>
        </div>
      )}

      {/* Routing Protocols Tab */}
      {activeTab === 'examples' && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Routing-Protokolle</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">🏠 Intra-AS Routing (IGP)</h4>
              
              <div className="border border-green-300 bg-green-50 p-4 rounded">
                <h5 className="font-semibold text-green-800">OSPF (Open Shortest Path First)</h5>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Link-State Protokoll</li>
                  <li>• Dijkstra-Algorithmus</li>
                  <li>• Schnelle Konvergenz</li>
                  <li>• Hierarchische Bereiche</li>
                </ul>
              </div>

              <div className="border border-blue-300 bg-blue-50 p-4 rounded">
                <h5 className="font-semibold text-blue-800">RIP (Routing Information Protocol)</h5>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Distance-Vector Protokoll</li>
                  <li>• Bellman-Ford Algorithmus</li>
                  <li>• Max. 15 Hops</li>
                  <li>• Einfach, aber limitiert</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">🌐 Inter-AS Routing (EGP)</h4>
              
              <div className="border border-purple-300 bg-purple-50 p-4 rounded">
                <h5 className="font-semibold text-purple-800">BGP (Border Gateway Protocol)</h5>
                <ul className="text-sm text-purple-700 mt-2 space-y-1">
                  <li>• Path-Vector Protokoll</li>
                  <li>• Policy-basiert</li>
                  <li>• Internet Backbone</li>
                  <li>• AS-Pfad Informationen</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Vergleich der Routing-Protokolle:</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Protokoll</th>
                    <th className="border border-gray-300 px-3 py-2">Typ</th>
                    <th className="border border-gray-300 px-3 py-2">Algorithmus</th>
                    <th className="border border-gray-300 px-3 py-2">Einsatzgebiet</th>
                    <th className="border border-gray-300 px-3 py-2">Konvergenz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">RIP</td>
                    <td className="border border-gray-300 px-3 py-2">Distance Vector</td>
                    <td className="border border-gray-300 px-3 py-2">Bellman-Ford</td>
                    <td className="border border-gray-300 px-3 py-2">Kleine Netzwerke</td>
                    <td className="border border-gray-300 px-3 py-2">Langsam</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">OSPF</td>
                    <td className="border border-gray-300 px-3 py-2">Link State</td>
                    <td className="border border-gray-300 px-3 py-2">Dijkstra</td>
                    <td className="border border-gray-300 px-3 py-2">Große LANs</td>
                    <td className="border border-gray-300 px-3 py-2">Schnell</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-medium">BGP</td>
                    <td className="border border-gray-300 px-3 py-2">Path Vector</td>
                    <td className="border border-gray-300 px-3 py-2">Policy-based</td>
                    <td className="border border-gray-300 px-3 py-2">Internet</td>
                    <td className="border border-gray-300 px-3 py-2">Stabil</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutingVisualizer;
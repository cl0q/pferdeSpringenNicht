import React, { useState } from 'react';
import { Wifi, Settings, Shield, Play, RotateCcw, Users } from 'lucide-react';

interface VLANConfig {
  id: number;
  name: string;
  color: string;
  ports: number[];
  description: string;
}

interface Port {
  id: number;
  type: 'access' | 'trunk';
  vlanId?: number;
  allowedVlans?: number[];
  status: 'active' | 'inactive';
}

const VLANVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basics' | 'configuration' | 'tagging' | 'spanning-tree'>('basics');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [packetSource, setPacketSource] = useState(1);

  // VLAN Configuration
  const [vlans] = useState<VLANConfig[]>([
    { id: 10, name: 'Sales', color: 'bg-blue-500', ports: [1, 2, 3], description: 'Verkaufsabteilung' },
    { id: 20, name: 'Engineering', color: 'bg-green-500', ports: [4, 5, 6], description: 'Entwicklungsabteilung' },
    { id: 30, name: 'HR', color: 'bg-purple-500', ports: [7, 8], description: 'Personalabteilung' },
    { id: 99, name: 'Management', color: 'bg-red-500', ports: [], description: 'Managementebene' }
  ]);

  const [ports, setPorts] = useState<Port[]>([
    { id: 1, type: 'access', vlanId: 10, status: 'active' },
    { id: 2, type: 'access', vlanId: 10, status: 'active' },
    { id: 3, type: 'access', vlanId: 10, status: 'active' },
    { id: 4, type: 'access', vlanId: 20, status: 'active' },
    { id: 5, type: 'access', vlanId: 20, status: 'active' },
    { id: 6, type: 'access', vlanId: 20, status: 'active' },
    { id: 7, type: 'access', vlanId: 30, status: 'active' },
    { id: 8, type: 'access', vlanId: 30, status: 'active' },
    { id: 24, type: 'trunk', allowedVlans: [10, 20, 30, 99], status: 'active' }
  ]);

  const startPacketSimulation = () => {
    setSimulationRunning(true);
    setTimeout(() => setSimulationRunning(false), 3000);
  };

  const resetConfiguration = () => {
    setPorts([
      { id: 1, type: 'access', vlanId: 10, status: 'active' },
      { id: 2, type: 'access', vlanId: 10, status: 'active' },
      { id: 3, type: 'access', vlanId: 10, status: 'active' },
      { id: 4, type: 'access', vlanId: 20, status: 'active' },
      { id: 5, type: 'access', vlanId: 20, status: 'active' },
      { id: 6, type: 'access', vlanId: 20, status: 'active' },
      { id: 7, type: 'access', vlanId: 30, status: 'active' },
      { id: 8, type: 'access', vlanId: 30, status: 'active' },
      { id: 24, type: 'trunk', allowedVlans: [10, 20, 30, 99], status: 'active' }
    ]);
  };

  const getVlanForPort = (portId: number) => {
    const port = ports.find(p => p.id === portId);
    if (!port) return null;
    
    if (port.type === 'access') {
      return vlans.find(v => v.id === port.vlanId);
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🏷️</span>
          VLAN & Layer-2 Switching
        </h2>
        <p className="text-gray-600 mb-6">
          Verstehen Sie Virtual Local Area Networks (VLANs), 802.1Q-Tagging, 
          Trunk/Access Ports und Spanning Tree Protocol. Interaktive Simulation von VLAN-Konfigurationen.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'basics', label: 'VLAN Grundlagen', icon: Wifi },
            { id: 'configuration', label: 'Switch Konfiguration', icon: Settings },
            { id: 'tagging', label: '802.1Q Tagging', icon: Shield },
            { id: 'spanning-tree', label: 'Spanning Tree', icon: Users }
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

      {/* VLAN Basics Tab */}
      {activeTab === 'basics' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">Was sind VLANs?</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 Definition:</h4>
                  <p className="text-blue-700 text-sm">
                    VLANs teilen ein physisches Netzwerk in mehrere logische Segmente auf. 
                    Geräte im gleichen VLAN können kommunizieren, als wären sie an einem eigenen Switch.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Vorteile:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• <strong>Sicherheit:</strong> Netzwerksegmentierung</li>
                    <li>• <strong>Performance:</strong> Kleinere Broadcast-Domains</li>
                    <li>• <strong>Flexibilität:</strong> Logische statt physische Trennung</li>
                    <li>• <strong>Kostenersparnis:</strong> Weniger Hardware nötig</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🏢 Typische VLAN-Struktur:</h4>
                <div className="space-y-3">
                  {vlans.slice(0, 3).map((vlan) => (
                    <div key={vlan.id} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${vlan.color} rounded`}></div>
                      <span className="font-mono text-sm">VLAN {vlan.id}</span>
                      <span className="font-medium">{vlan.name}</span>
                      <span className="text-xs text-gray-600">({vlan.description})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VLAN Isolation Demonstration */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">🔒 VLAN-Isolation Demonstration:</h4>
              
              <svg width="600" height="300" className="border border-gray-200 rounded bg-white">
                {/* Switch */}
                <rect x="250" y="130" width="100" height="40" fill="#4B5563" stroke="#1F2937" strokeWidth="2" rx="5"/>
                <text x="300" y="152" textAnchor="middle" className="text-sm font-bold fill-white">Switch</text>
                
                {/* VLAN 10 Devices */}
                <circle cx="100" cy="80" r="25" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
                <text x="100" y="85" textAnchor="middle" className="text-xs font-bold fill-white">PC1</text>
                <text x="100" y="115" textAnchor="middle" className="text-xs">VLAN 10</text>
                
                <circle cx="100" cy="220" r="25" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
                <text x="100" y="225" textAnchor="middle" className="text-xs font-bold fill-white">PC2</text>
                <text x="100" y="255" textAnchor="middle" className="text-xs">VLAN 10</text>
                
                {/* VLAN 20 Devices */}
                <circle cx="500" cy="80" r="25" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                <text x="500" y="85" textAnchor="middle" className="text-xs font-bold fill-white">PC3</text>
                <text x="500" y="115" textAnchor="middle" className="text-xs">VLAN 20</text>
                
                <circle cx="500" cy="220" r="25" fill="#10B981" stroke="#047857" strokeWidth="2"/>
                <text x="500" y="225" textAnchor="middle" className="text-xs font-bold fill-white">PC4</text>
                <text x="500" y="255" textAnchor="middle" className="text-xs">VLAN 20</text>
                
                {/* Connections */}
                <line x1="125" y1="90" x2="250" y2="140" stroke="#3B82F6" strokeWidth="3"/>
                <line x1="125" y1="210" x2="250" y2="160" stroke="#3B82F6" strokeWidth="3"/>
                <line x1="475" y1="90" x2="350" y2="140" stroke="#10B981" strokeWidth="3"/>
                <line x1="475" y1="210" x2="350" y2="160" stroke="#10B981" strokeWidth="3"/>
                
                {/* Communication arrows */}
                <path d="M 80 150 Q 90 150 100 140" stroke="#3B82F6" strokeWidth="2" fill="none" markerEnd="url(#blueArrow)"/>
                <path d="M 520 150 Q 510 150 500 140" stroke="#10B981" strokeWidth="2" fill="none" markerEnd="url(#greenArrow)"/>
                
                {/* Blocked communication */}
                <line x1="400" y1="150" x2="200" y2="150" stroke="#EF4444" strokeWidth="3" strokeDasharray="10,5"/>
                <text x="300" y="145" textAnchor="middle" className="text-sm font-bold fill-red-600">BLOCKED</text>
                
                <defs>
                  <marker id="blueArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6"/>
                  </marker>
                  <marker id="greenArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10B981"/>
                  </marker>
                </defs>
              </svg>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-100 p-3 rounded">
                  <div className="font-semibold text-blue-800">VLAN 10 (Sales):</div>
                  <div className="text-blue-700">PC1 ↔ PC2 kommunizieren frei</div>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <div className="font-semibold text-green-800">VLAN 20 (Engineering):</div>
                  <div className="text-green-700">PC3 ↔ PC4 kommunizieren frei</div>
                </div>
              </div>
              <div className="mt-2 bg-red-100 p-3 rounded text-sm">
                <div className="font-semibold text-red-800">VLAN-übergreifend:</div>
                <div className="text-red-700">PC1/PC2 ↔ PC3/PC4 ist BLOCKIERT (Router erforderlich)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Switch Configuration Tab */}
      {activeTab === 'configuration' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">Interaktive Switch-Konfiguration</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={startPacketSimulation}
                disabled={simulationRunning}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                <Play className="h-4 w-4 inline mr-2" />
                Paket-Simulation
              </button>
              <button
                onClick={resetConfiguration}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                <RotateCcw className="h-4 w-4 inline mr-2" />
                Reset
              </button>
              <div className="flex items-center space-x-2">
                <label className="text-sm">Source Port:</label>
                <select
                  value={packetSource}
                  onChange={(e) => setPacketSource(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {ports.filter(p => p.type === 'access').map(p => (
                    <option key={p.id} value={p.id}>Port {p.id}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Switch Visualization */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-4">24-Port Switch Konfiguration:</h4>
              
              <div className="grid grid-cols-12 gap-2 mb-4">
                {Array.from({ length: 24 }, (_, i) => {
                  const portNum = i + 1;
                  const port = ports.find(p => p.id === portNum);
                  const vlan = port ? getVlanForPort(portNum) : null;
                  const isSource = simulationRunning && packetSource === portNum;
                  const isInSameVlan = simulationRunning && port && getVlanForPort(packetSource)?.id === port.vlanId;
                  
                  return (
                    <div
                      key={portNum}
                      className={`relative h-12 border-2 rounded flex items-center justify-center text-xs font-bold ${
                        isSource ? 'border-yellow-500 bg-yellow-200 animate-pulse' :
                        isInSameVlan ? 'border-green-500 bg-green-200' :
                        port ? 
                          (vlan ? `border-gray-400 ${vlan.color.replace('bg-', 'bg-opacity-20 bg-')} text-white` : 'border-gray-400 bg-gray-200') :
                          'border-gray-300 bg-gray-100'
                      }`}
                    >
                      <span className="relative z-10">{portNum}</span>
                      {port?.type === 'trunk' && (
                        <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                      {port && (
                        <div className="absolute bottom-0 left-0 right-0 text-[8px] text-center">
                          {port.type === 'access' ? `V${port.vlanId}` : 'T'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-200 border border-yellow-500 rounded"></div>
                  <span>Source Port</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-200 border border-green-500 rounded"></div>
                  <span>Same VLAN</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Trunk Port</span>
                </div>
              </div>
            </div>

            {/* Port Configuration Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 border-b text-left">Port</th>
                    <th className="px-3 py-2 border-b text-left">Type</th>
                    <th className="px-3 py-2 border-b text-left">VLAN</th>
                    <th className="px-3 py-2 border-b text-left">Status</th>
                    <th className="px-3 py-2 border-b text-left">Beschreibung</th>
                  </tr>
                </thead>
                <tbody>
                  {ports.map((port) => {
                    const vlan = getVlanForPort(port.id);
                    return (
                      <tr key={port.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 border-b font-mono">{port.id}</td>
                        <td className="px-3 py-2 border-b">
                          <span className={`px-2 py-1 rounded text-xs ${
                            port.type === 'trunk' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {port.type}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-b">
                          {port.type === 'access' ? (
                            <span className="font-mono">{port.vlanId}</span>
                          ) : (
                            <span className="text-xs">{port.allowedVlans?.join(', ')}</span>
                          )}
                        </td>
                        <td className="px-3 py-2 border-b">
                          <span className={`px-2 py-1 rounded text-xs ${
                            port.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {port.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 border-b text-xs">
                          {port.type === 'access' && vlan ? vlan.name : 
                           port.type === 'trunk' ? 'Uplink zu anderem Switch' : 'Nicht konfiguriert'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 802.1Q Tagging Tab */}
      {activeTab === 'tagging' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">IEEE 802.1Q VLAN-Tagging</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🏷️ Was ist VLAN-Tagging?</h4>
                  <p className="text-blue-700 text-sm mb-2">
                    802.1Q fügt einen 4-Byte VLAN-Tag in den Ethernet-Frame ein, 
                    um VLAN-Zugehörigkeit zu kennzeichnen.
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• <strong>TPID:</strong> Tag Protocol Identifier (0x8100)</li>
                    <li>• <strong>PCP:</strong> Priority Code Point (3 Bits)</li>
                    <li>• <strong>DEI:</strong> Drop Eligible Indicator (1 Bit)</li>
                    <li>• <strong>VID:</strong> VLAN Identifier (12 Bits = 1-4094)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🔌 Port-Typen:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <strong>Access Port:</strong>
                      <span className="text-green-700">Untagged, gehört zu einem VLAN</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <strong>Trunk Port:</strong>
                      <span className="text-green-700">Tagged, trägt mehrere VLANs</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📦 Ethernet Frame mit 802.1Q Tag:</h4>
                <div className="space-y-2 font-mono text-xs">
                  <div className="grid grid-cols-6 gap-1">
                    <div className="bg-gray-300 p-2 text-center">Preamble</div>
                    <div className="bg-gray-300 p-2 text-center">SFD</div>
                    <div className="bg-blue-300 p-2 text-center">Dest MAC</div>
                    <div className="bg-blue-300 p-2 text-center">Src MAC</div>
                    <div className="bg-yellow-300 p-2 text-center">802.1Q Tag</div>
                    <div className="bg-green-300 p-2 text-center">Type/Len</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-purple-300 p-2 text-center">Data</div>
                    <div className="bg-orange-300 p-2 text-center">FCS</div>
                    <div className="bg-gray-300 p-2 text-center">IFG</div>
                  </div>
                </div>
                
                <div className="mt-4 bg-yellow-100 p-3 rounded">
                  <h5 className="font-semibold text-yellow-800 mb-2">802.1Q Tag Aufbau (4 Bytes):</h5>
                  <div className="grid grid-cols-4 gap-1 font-mono text-xs">
                    <div className="bg-yellow-200 p-2 text-center">
                      <div className="font-bold">TPID</div>
                      <div>0x8100</div>
                      <div>(2 Bytes)</div>
                    </div>
                    <div className="bg-yellow-200 p-2 text-center">
                      <div className="font-bold">PCP</div>
                      <div>Priority</div>
                      <div>(3 Bits)</div>
                    </div>
                    <div className="bg-yellow-200 p-2 text-center">
                      <div className="font-bold">DEI</div>
                      <div>Drop</div>
                      <div>(1 Bit)</div>
                    </div>
                    <div className="bg-yellow-200 p-2 text-center">
                      <div className="font-bold">VID</div>
                      <div>VLAN ID</div>
                      <div>(12 Bits)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagging Process Visualization */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">🔄 VLAN Tagging Process:</h4>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      PC1
                    </div>
                    <div className="text-xs mt-1">VLAN 10</div>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="bg-green-200 border border-green-500 px-3 py-1 rounded text-sm">
                        Untagged Frame
                      </div>
                      <span>→</span>
                    </div>
                    <div className="text-xs text-center text-gray-600">Access Port (VLAN 10)</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-12 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      Switch
                    </div>
                    <div className="text-xs mt-1">Tag hinzufügen</div>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span>→</span>
                      <div className="bg-yellow-200 border border-yellow-500 px-3 py-1 rounded text-sm">
                        Tagged Frame (VID: 10)
                      </div>
                      <span>→</span>
                    </div>
                    <div className="text-xs text-center text-gray-600">Trunk Port (802.1Q)</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-12 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      Switch 2
                    </div>
                    <div className="text-xs mt-1">Tag entfernen</div>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span>→</span>
                      <div className="bg-green-200 border border-green-500 px-3 py-1 rounded text-sm">
                        Untagged Frame
                      </div>
                    </div>
                    <div className="text-xs text-center text-gray-600">Access Port (VLAN 10)</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      PC2
                    </div>
                    <div className="text-xs mt-1">VLAN 10</div>
                  </div>
                </div>
              </div>
            </div>

            {/* VLAN Range Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">Standard VLANs</h5>
                <div className="text-sm text-blue-700">
                  <div><strong>Range:</strong> 1-1005</div>
                  <div><strong>Default:</strong> VLAN 1</div>
                  <div><strong>Verwendung:</strong> Normale Daten</div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-800 mb-2">Extended VLANs</h5>
                <div className="text-sm text-purple-700">
                  <div><strong>Range:</strong> 1006-4094</div>
                  <div><strong>Speicherung:</strong> Nur lokal</div>
                  <div><strong>Verwendung:</strong> Provider/Service</div>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2">Reservierte VLANs</h5>
                <div className="text-sm text-red-700">
                  <div><strong>VLAN 0:</strong> Priority Tagging</div>
                  <div><strong>VLAN 4095:</strong> Reserviert</div>
                  <div><strong>1002-1005:</strong> Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spanning Tree Tab */}
      {activeTab === 'spanning-tree' && (
        <div className="space-y-6">
          <div className="section-card">
            <h3 className="text-xl font-semibold mb-4">Spanning Tree Protocol (STP)</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Problem: Layer-2 Schleifen</h4>
                  <p className="text-red-700 text-sm mb-2">
                    Ohne STP führen redundante Verbindungen zu:
                  </p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• <strong>Broadcast Storms:</strong> Endlosschleifen</li>
                    <li>• <strong>MAC Instabilität:</strong> Flapping zwischen Ports</li>
                    <li>• <strong>Doppelte Frames:</strong> Mehrfache Zustellung</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Lösung: Spanning Tree</h4>
                  <p className="text-green-700 text-sm mb-2">
                    STP erstellt einen schleifenfreien Baum durch:
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• <strong>Root Bridge:</strong> Zentrale Referenz wählen</li>
                    <li>• <strong>Root Ports:</strong> Beste Pfade bestimmen</li>
                    <li>• <strong>Port Blocking:</strong> Schleifen blockieren</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🌳 STP Port States:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded"></div>
                    <strong>Blocking:</strong>
                    <span>Nur BPDUs empfangen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <strong>Listening:</strong>
                    <span>BPDUs senden/empfangen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <strong>Learning:</strong>
                    <span>MAC-Adressen lernen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <strong>Forwarding:</strong>
                    <span>Vollständige Funktion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <strong>Disabled:</strong>
                    <span>Port administrativ down</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STP Network Topology */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">🏗️ STP Topology Beispiel:</h4>
              
              <svg width="600" height="400" className="border border-gray-200 rounded bg-white">
                {/* Switches */}
                <rect x="50" y="50" width="80" height="40" fill="#10B981" stroke="#047857" strokeWidth="3" rx="5"/>
                <text x="90" y="72" textAnchor="middle" className="text-sm font-bold fill-white">SW-A</text>
                <text x="90" y="40" textAnchor="middle" className="text-xs font-bold">Root Bridge</text>
                <text x="90" y="105" textAnchor="middle" className="text-xs">Priority: 4096</text>
                
                <rect x="450" y="50" width="80" height="40" fill="#6B7280" stroke="#374151" strokeWidth="2" rx="5"/>
                <text x="490" y="72" textAnchor="middle" className="text-sm font-bold fill-white">SW-B</text>
                <text x="490" y="105" textAnchor="middle" className="text-xs">Priority: 32768</text>
                
                <rect x="50" y="300" width="80" height="40" fill="#6B7280" stroke="#374151" strokeWidth="2" rx="5"/>
                <text x="90" y="322" textAnchor="middle" className="text-sm font-bold fill-white">SW-C</text>
                <text x="90" y="355" textAnchor="middle" className="text-xs">Priority: 32768</text>
                
                <rect x="450" y="300" width="80" height="40" fill="#6B7280" stroke="#374151" strokeWidth="2" rx="5"/>
                <text x="490" y="322" textAnchor="middle" className="text-sm font-bold fill-white">SW-D</text>
                <text x="490" y="355" textAnchor="middle" className="text-xs">Priority: 32768</text>
                
                {/* Active Links (Green) */}
                <line x1="130" y1="60" x2="450" y2="60" stroke="#10B981" strokeWidth="4"/>
                <text x="290" y="55" textAnchor="middle" className="text-xs font-bold text-green-700">Cost: 4</text>
                <text x="290" y="45" textAnchor="middle" className="text-xs text-green-700">Root Port (SW-B)</text>
                
                <line x1="70" y1="90" x2="70" y2="300" stroke="#10B981" strokeWidth="4"/>
                <text x="45" y="195" textAnchor="middle" className="text-xs font-bold text-green-700 transform -rotate-90">Cost: 19</text>
                <text x="25" y="195" textAnchor="middle" className="text-xs text-green-700 transform -rotate-90">Root Port</text>
                
                <line x1="470" y1="90" x2="470" y2="300" stroke="#10B981" strokeWidth="4"/>
                <text x="445" y="195" textAnchor="middle" className="text-xs font-bold text-green-700 transform -rotate-90">Cost: 19</text>
                <text x="495" y="195" textAnchor="middle" className="text-xs text-green-700 transform -rotate-90">Designated</text>
                
                {/* Blocked Link (Red) */}
                <line x1="130" y1="320" x2="450" y2="320" stroke="#EF4444" strokeWidth="4" strokeDasharray="10,5"/>
                <text x="290" y="315" textAnchor="middle" className="text-xs font-bold text-red-700">BLOCKED</text>
                <text x="290" y="335" textAnchor="middle" className="text-xs text-red-700">Alternate Port</text>
                
                {/* Cost labels */}
                <text x="200" y="340" textAnchor="middle" className="text-xs text-red-600">Cost: 19</text>
                <text x="380" y="340" textAnchor="middle" className="text-xs text-red-600">Cost: 19</text>
              </svg>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-100 p-3 rounded">
                  <div className="font-semibold text-green-800">Root Bridge (SW-A):</div>
                  <div className="text-green-700">Niedrigste Priority (4096)</div>
                  <div className="text-green-700">Alle Ports sind Designated</div>
                </div>
                <div className="bg-blue-100 p-3 rounded">
                  <div className="font-semibold text-blue-800">Root Ports:</div>
                  <div className="text-blue-700">Bester Pfad zur Root Bridge</div>
                  <div className="text-blue-700">SW-B, SW-C, SW-D haben je einen</div>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <div className="font-semibold text-red-800">Blocked Port:</div>
                  <div className="text-red-700">Verhindert Schleife</div>
                  <div className="text-red-700">SW-C zu SW-D blockiert</div>
                </div>
              </div>
            </div>

            {/* STP Algorithm */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">🔄 STP Algorithmus:</h4>
              <ol className="text-blue-700 text-sm space-y-2">
                <li><strong>1. Root Bridge Election:</strong> Switch mit niedrigster Bridge-ID wird Root</li>
                <li><strong>2. Root Port Selection:</strong> Jeder Switch wählt Port mit niedrigsten Kosten zur Root</li>
                <li><strong>3. Designated Port Selection:</strong> Pro Segment einen Designated Port bestimmen</li>
                <li><strong>4. Port Blocking:</strong> Alle anderen Ports werden blockiert</li>
                <li><strong>5. Convergence:</strong> Topologie stabilisiert sich (30-50 Sekunden)</li>
              </ol>
              
              <div className="mt-3 p-3 bg-blue-100 rounded">
                <div className="font-semibold text-blue-800 mb-1">Bridge-ID Aufbau:</div>
                <div className="font-mono text-sm text-blue-700">
                  [Priority: 2 Bytes] + [MAC Address: 6 Bytes] = 8 Bytes
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Beispiel: 32768.0012.3456.789A (Priority.MAC)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">🎯 Klausur-Beispiele</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setActiveTab('configuration');
              setPacketSource(1);
              startPacketSimulation();
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">VLAN Isolation</h4>
            <p className="text-sm opacity-90">
              Simuliere Paket von Port 1 (VLAN 10)<br/>
              Welche Ports erhalten das Paket?
            </p>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('tagging');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">802.1Q Tagging</h4>
            <p className="text-sm opacity-90">
              Verstehe VLAN-Tags im Ethernet-Frame<br/>
              TPID, PCP, DEI, VID Felder
            </p>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('spanning-tree');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">Spanning Tree</h4>
            <p className="text-sm opacity-90">
              Root Bridge Election<br/>
              Port States und Blocking
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VLANVisualizer;
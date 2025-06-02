import React, { useState, useEffect } from 'react';
import { Calculator, Network, RefreshCw } from 'lucide-react';

interface SubnetInfo {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  hostCount: number;
  subnetMask: string;
  cidr: number;
}

const SubnettingCalculator: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('192.168.1.100');
  const [cidr, setCidr] = useState(24);
  const [subnetCount, setSubnetCount] = useState(4);
  const [calculationType, setCalculationType] = useState<'analysis' | 'subnetting'>('analysis');
  const [result, setResult] = useState<SubnetInfo | null>(null);
  const [subnets, setSubnets] = useState<SubnetInfo[]>([]);

  const ipToNumber = (ip: string): number => {
    const parts = ip.split('.').map(Number);
    return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
  };

  const numberToIp = (num: number): string => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };

  const calculateSubnetInfo = (ip: string, cidrValue: number): SubnetInfo => {
    const ipNum = ipToNumber(ip);
    const hostBits = 32 - cidrValue;
    const subnetMask = (0xFFFFFFFF << hostBits) >>> 0;
    const networkNum = ipNum & subnetMask;
    const broadcastNum = networkNum | (0xFFFFFFFF >>> cidrValue);
    
    return {
      networkAddress: numberToIp(networkNum),
      broadcastAddress: numberToIp(broadcastNum),
      firstHost: numberToIp(networkNum + 1),
      lastHost: numberToIp(broadcastNum - 1),
      hostCount: (1 << hostBits) - 2,
      subnetMask: numberToIp(subnetMask),
      cidr: cidrValue
    };
  };

  const calculateSubnets = (baseIp: string, baseCidr: number, count: number): SubnetInfo[] => {
    const bitsNeeded = Math.ceil(Math.log2(count));
    const newCidr = baseCidr + bitsNeeded;
    const subnetSize = 1 << (32 - newCidr);
    
    const baseNum = ipToNumber(baseIp);
    const networkNum = baseNum & ((0xFFFFFFFF << (32 - baseCidr)) >>> 0);
    
    const results: SubnetInfo[] = [];
    
    for (let i = 0; i < count; i++) {
      const subnetNetworkNum = networkNum + (i * subnetSize);
      const subnetIp = numberToIp(subnetNetworkNum);
      results.push(calculateSubnetInfo(subnetIp, newCidr));
    }
    
    return results;
  };

  useEffect(() => {
    if (calculationType === 'analysis') {
      setResult(calculateSubnetInfo(ipAddress, cidr));
    } else {
      const subnetting = calculateSubnets(ipAddress, cidr, subnetCount);
      setSubnets(subnetting);
    }
  }, [ipAddress, cidr, subnetCount, calculationType]);

  const renderBinaryMask = (cidr: number) => {
    const binary = Array(32).fill(0);
    for (let i = 0; i < cidr; i++) {
      binary[i] = 1;
    }
    
    return (
      <div className="font-mono text-sm">
        {Array(4).fill(0).map((_, octet) => (
          <span key={octet} className="mr-2">
            {binary.slice(octet * 8, (octet + 1) * 8).map((bit, i) => (
              <span key={i} className={bit === 1 ? 'text-blue-600 font-bold' : 'text-gray-400'}>
                {bit}
              </span>
            ))}
          </span>
        ))}
      </div>
    );
  };

  const renderIPBinary = (ip: string, highlightNetwork: boolean = false, cidr: number = 24) => {
    const parts = ip.split('.').map(Number);
    const binary = parts.map(part => part.toString(2).padStart(8, '0'));
    
    return (
      <div className="font-mono text-sm">
        {binary.map((octet, octetIndex) => (
          <span key={octetIndex} className="mr-2">
            {octet.split('').map((bit, bitIndex) => {
              const totalBitIndex = octetIndex * 8 + bitIndex;
              const isNetworkBit = highlightNetwork && totalBitIndex < cidr;
              
              return (
                <span 
                  key={bitIndex} 
                  className={isNetworkBit ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-600'}
                >
                  {bit}
                </span>
              );
            })}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🔢</span>
          IPv4 Subnetting Calculator
        </h2>
        <p className="text-gray-600 mb-6">
          Berechnen Sie Netzwerk-Details oder führen Sie Subnetting durch. 
          Perfekt für die Klausurvorbereitung!
        </p>
      </div>

      {/* Controls */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">Eingabe</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP-Adresse:
            </label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="192.168.1.100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CIDR /{cidr}:
            </label>
            <input
              type="range"
              min="8"
              max="30"
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Berechnung:
            </label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'analysis' | 'subnetting')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="analysis">Netzwerk analysieren</option>
              <option value="subnetting">Subnetting</option>
            </select>
          </div>
          
          {calculationType === 'subnetting' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anzahl Subnetze:
              </label>
              <input
                type="number"
                min="2"
                max="256"
                value={subnetCount}
                onChange={(e) => setSubnetCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Binary Visualization */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">Binärdarstellung</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">IP-Adresse ({ipAddress}):</h4>
            {renderIPBinary(ipAddress, true, cidr)}
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Subnetzmaske (/{cidr}):</h4>
            {renderBinaryMask(cidr)}
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="text-blue-600 font-semibold">■</span> Netzwerk-Bits ({cidr} Bits) | 
            <span className="text-gray-400 ml-2">■</span> Host-Bits ({32 - cidr} Bits)
          </div>
        </div>
      </div>

      {/* Results */}
      {calculationType === 'analysis' && result && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Netzwerk-Analyse</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Netzwerkadresse</h4>
                <p className="text-2xl font-mono text-blue-600">{result.networkAddress}/{result.cidr}</p>
                <div className="text-sm text-blue-600 mt-1">
                  {renderIPBinary(result.networkAddress, true, cidr)}
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800">Broadcast-Adresse</h4>
                <p className="text-2xl font-mono text-red-600">{result.broadcastAddress}</p>
                <div className="text-sm text-red-600 mt-1">
                  {renderIPBinary(result.broadcastAddress)}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Host-Bereich</h4>
                <p className="font-mono text-green-600">
                  {result.firstHost} - {result.lastHost}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {result.hostCount.toLocaleString()} verfügbare Host-Adressen
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800">Subnetzmaske</h4>
                <p className="font-mono text-gray-600">{result.subnetMask}</p>
                <p className="text-sm text-gray-600 mt-1">CIDR: /{result.cidr}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {calculationType === 'subnetting' && subnets.length > 0 && (
        <div className="section-card">
          <h3 className="text-xl font-semibold mb-4">Subnetting-Ergebnis</h3>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Berechnung:</h4>
            <div className="text-sm text-blue-600 space-y-1">
              <p>Benötigte Subnet-Bits: {Math.ceil(Math.log2(subnetCount))} (für {subnetCount} Subnetze)</p>
              <p>Neue Subnetzmaske: /{cidr + Math.ceil(Math.log2(subnetCount))}</p>
              <p>Hosts pro Subnet: {subnets[0]?.hostCount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Subnet #</th>
                  <th className="px-4 py-2 border-b text-left">Netzwerk</th>
                  <th className="px-4 py-2 border-b text-left">Host-Bereich</th>
                  <th className="px-4 py-2 border-b text-left">Broadcast</th>
                  <th className="px-4 py-2 border-b text-left">Hosts</th>
                </tr>
              </thead>
              <tbody>
                {subnets.map((subnet, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b font-semibold">#{index + 1}</td>
                    <td className="px-4 py-2 border-b font-mono text-blue-600">
                      {subnet.networkAddress}/{subnet.cidr}
                    </td>
                    <td className="px-4 py-2 border-b font-mono text-green-600">
                      {subnet.firstHost} - {subnet.lastHost}
                    </td>
                    <td className="px-4 py-2 border-b font-mono text-red-600">
                      {subnet.broadcastAddress}
                    </td>
                    <td className="px-4 py-2 border-b text-gray-600">
                      {subnet.hostCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="section-card">
        <h3 className="text-xl font-semibold mb-4">🎯 Klausur-Beispiele</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setIpAddress('10.0.129.224');
              setCidr(20);
              setCalculationType('analysis');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">Beispiel 1</h4>
            <p className="text-sm opacity-90">
              Netz-/Broadcast für: 10.0.129.224/20
            </p>
          </button>
          
          <button
            onClick={() => {
              setIpAddress('192.168.168.0');
              setCidr(24);
              setSubnetCount(4);
              setCalculationType('subnetting');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">Beispiel 2</h4>
            <p className="text-sm opacity-90">
              192.168.168.0/24 in 4 Subnetze teilen
            </p>
          </button>
          
          <button
            onClick={() => {
              setIpAddress('132.152.83.254');
              setCidr(22);
              setCalculationType('analysis');
            }}
            className="exercise-card text-left"
          >
            <h4 className="font-semibold mb-2">Beispiel 3</h4>
            <p className="text-sm opacity-90">
              Subnet-Prüfung: 132.152.83.254/22
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubnettingCalculator;
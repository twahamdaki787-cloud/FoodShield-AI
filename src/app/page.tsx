"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  CloudRain,
  ShieldAlert,
  Users,
  MapPin,
  Activity,
  CheckCircle2,
  Info,
  ChevronRight,
  Database,
  Send
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Mock Data ya Mikoa ya Tanzania na Risk Levels
const tanzaniaRegions = [
  { id: "dodoma", name: "Dodoma", risk: "HIGH", score: 85, rainfall: "-35%", yieldImpact: "-40%", status: "Ukame Mkubwa" },
  { id: "singida", name: "Singida", risk: "HIGH", score: 78, rainfall: "-28%", yieldImpact: "-32%", status: "Mvua Chini ya Wastani" },
  { id: "shinyanga", name: "Shinyanga", risk: "HIGH", score: 74, rainfall: "-25%", yieldImpact: "-28%", status: "Kuharibika kwa Mazao" },
  { id: "simiyu", name: "Simiyu", risk: "MEDIUM", score: 58, rainfall: "-12%", yieldImpact: "-15%", status: "Tahadhari ya Mvua" },
  { id: "tabora", name: "Tabora", risk: "MEDIUM", score: 52, rainfall: "-10%", yieldImpact: "-12%", status: "Wastani wa Mvua" },
  { id: "arusha", name: "Arusha", risk: "MEDIUM", score: 48, rainfall: "-8%", yieldImpact: "-10%", status: "Mabadiliko ya Hali ya Hewa" },
  { id: "mbeya", name: "Mbeya", risk: "LOW", score: 22, rainfall: "+15%", yieldImpact: "+10%", status: "Salama / Mazao Tele" },
  { id: "ruvuma", name: "Ruvuma", risk: "LOW", score: 18, rainfall: "+20%", yieldImpact: "+18%", status: "Hali Nzuri ya Mvua" },
  { id: "iringa", name: "Iringa", risk: "LOW", score: 15, rainfall: "+12%", yieldImpact: "+14%", status: "Uzalishaji Mzuri" },
];

const climateData = [
  { month: "Jan", rainfall: 120, riskIndex: 20 },
  { month: "Feb", rainfall: 95, riskIndex: 25 },
  { month: "Mar", rainfall: 60, riskIndex: 45 },
  { month: "Apr", rainfall: 40, riskIndex: 65 },
  { month: "May", rainfall: 20, riskIndex: 80 },
  { month: "Jun", rainfall: 10, riskIndex: 85 },
];

export default function FoodShieldDashboard() {
  const [selectedRegion, setSelectedRegion] = useState(tanzaniaRegions[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "simulation" | "recommendations">("overview");
  const [simulationInput, setSimulationInput] = useState({ rainfallDrop: 30, tempIncrease: 2 });
  const [simulatedRisk, setSimulatedRisk] = useState<number | null>(null);

  const handleSimulate = () => {
    const calculated = Math.min(100, Math.round((simulationInput.rainfallDrop * 1.8) + (simulationInput.tempIncrease * 12)));
    setSimulatedRisk(calculated);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "HIGH":
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> HIGH RISK</span>;
      case "MEDIUM":
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-semibold flex items-center gap-1"><Info className="w-3 h-3" /> MEDIUM RISK</span>;
      default:
        return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> LOW RISK</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
              FoodShield <span className="text-emerald-400 font-mono text-sm bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">AI</span>
            </h1>
            <p className="text-xs text-slate-400">Tanzania Early Warning & Food Security AI System</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700 w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === "overview" ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("simulation")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === "simulation" ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"}`}
          >
            AI Simulator
          </button>
          <button
            onClick={() => setActiveTab("recommendations")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeTab === "recommendations" ? "bg-emerald-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"}`}
          >
            Action Plans
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900/30 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-emerald-300">"Usisubiri njaa itokee ndipo uchukue hatua; tumia AI kuitabiri mapema."</h2>
            <p className="text-xs text-slate-400 mt-1">Mfumo wa AI unaochanganua hali ya hewa, ukame na mazao kutoa tahadhari kabla ya majanga.</p>
          </div>
          <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1.5 shrink-0">
            <Database className="w-3.5 h-3.5 text-emerald-400" /> Data: CHIRPS & Open-Meteo
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-start text-slate-400">
              <span className="text-xs font-medium">Mikoa Hatarini</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">3</span>
              <span className="text-[10px] text-red-400 font-medium">+1 Mwezi Uliopita</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Dodoma, Singida, Shinyanga</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-start text-slate-400">
              <span className="text-xs font-medium">Upungufu wa Mvua</span>
              <CloudRain className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">-22.5%</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Kanda ya Kati</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-start text-slate-400">
              <span className="text-xs font-medium">Tahadhari Zilizo Tolewa</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">14</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Early Warnings</p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex justify-between items-start text-slate-400">
              <span className="text-xs font-medium">Wakulima SMS/USSD</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">45,200</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Simu za kawaida</p>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-200 flex items-center gap-2 text-sm md:text-base">
                    <MapPin className="w-4 h-4 text-emerald-400" /> GIS Risk Map — Tanzania Regions
                  </h3>
                  <p className="text-xs text-slate-400">Gusa mkoa kupata uchambuzi wa AI</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {tanzaniaRegions.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg)}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      selectedRegion.id === reg.id
                        ? "border-emerald-500 bg-emerald-950/40 shadow"
                        : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-xs text-slate-200">{reg.name}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          reg.risk === "HIGH" ? "bg-red-500" : reg.risk === "MEDIUM" ? "bg-yellow-500" : "bg-emerald-500"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-mono">Score: {reg.score}/100</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400 mb-2">Mvua vs Risk Index Trend</h4>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={climateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                      <Line type="monotone" dataKey="rainfall" name="Mvua" stroke="#38bdf8" strokeWidth={2} />
                      <Line type="monotone" dataKey="riskIndex" name="Risk" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Selected Region Details */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Mkoa Uliochaguliwa</span>
                    <h3 className="text-xl font-bold text-white">{selectedRegion.name}</h3>
                  </div>
                  {getRiskBadge(selectedRegion.risk)}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">Risk Score</div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-extrabold text-white">{selectedRegion.score}/100</span>
                      <span className="text-xs text-red-400">{selectedRegion.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Mvua</span>
                      <p className="text-sm font-bold text-yellow-400">{selectedRegion.rainfall}</p>
                    </div>
                    <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400">Uzalishaji</span>
                      <p className="text-sm font-bold text-red-400">{selectedRegion.yieldImpact}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> AI Recommendation
                    </h4>
                    <p className="text-xs text-slate-300">
                      {selectedRegion.risk === "HIGH"
                        ? "Panda mbegu zinazovumilia ukame (Mtama, Uwele). Serikali iandae hifadhi ya chakula mapema."
                        : selectedRegion.risk === "MEDIUM"
                        ? "Hamasisha kuvuna maji ya mvua na kilimo cha mseto."
                        : "Hali nzuri. Nunua ziada ya mazao kwa Hifadhi ya Taifa (NFRA)."}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Tahadhari ya SMS imetumwa kwa Wakulima wa ${selectedRegion.name}!`)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Tuma Tahadhari (SMS/USSD)
              </button>
            </div>
          </div>
        )}

        {/* Simulator Tab */}
        {activeTab === "simulation" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-lg font-bold text-white">AI Risk Predictor Simulator</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 flex justify-between">
                  <span>Upungufu wa Mvua (%)</span>
                  <span className="text-emerald-400 font-bold">{simulationInput.rainfallDrop}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={simulationInput.rainfallDrop}
                  onChange={(e) => setSimulationInput({ ...simulationInput, rainfallDrop: Number(e.target.value) })}
                  className="w-full mt-2 accent-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 flex justify-between">
                  <span>Ongezeko la Joto (°C)</span>
                  <span className="text-emerald-400 font-bold">+{simulationInput.tempIncrease}°C</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={simulationInput.tempIncrease}
                  onChange={(e) => setSimulationInput({ ...simulationInput, tempIncrease: Number(e.target.value) })}
                  className="w-full mt-2 accent-emerald-500"
                />
              </div>

              <button
                onClick={handleSimulate}
                className="w-full py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs"
              >
                Kamilisha Prediction
              </button>

              {simulatedRisk !== null && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-center">
                  <span className="text-xs text-slate-400">Predicted Risk Score</span>
                  <div className="text-3xl font-extrabold text-red-400 my-1">{simulatedRisk} / 100</div>
                  <p className="text-xs text-slate-300">
                    {simulatedRisk > 60 ? "⚠️ Hatari Kubwa ya Ukame na Njaa!" : "✅ Hali ipo Chini ya Udhibiti."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-white text-sm">🏛️ Mapendekezo kwa Serikali na NGOs</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" /> Elekeza tani 500 za mbegu za muda mfupi Dodoma na Singida.</li>
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" /> Nunua ziada ya chakula Mbeya na Ruvuma kwa ajili ya Hifadhi ya Taifa.</li>
              </ul>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-white text-sm">👨‍🌾 Mapendekezo kwa Wakulima (SMS/USSD)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" /> Panda Mtama, Mhogo na Uwele maeneo yenye mvua chache.</li>
                <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" /> Anza kuandaa mashamba mapema kuvuna maji ya mvua za kwanza.</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

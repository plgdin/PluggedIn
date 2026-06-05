import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  MotionValue,
  useMotionValue,
  animate
} from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { 
  Brain,
  Database,
  Layers,
  Monitor,
  Users,
  Mic,
  Activity,
  ArrowRight,
  Cuboid,
  Clock,
  Radio,
  Cpu as ChipIcon,
  Terminal,
  Copy,
  Check
} from "lucide-react";
import InteractiveCanvasGrid from "../components/InteractiveCanvasGrid";

// --- ASSET IMPORT ---
import elsaDeviceImage from "../assets/Untitled@1-1536x730.png";

// --- TELEMETRY GRAPHICS (TECHNICAL MINI-WIDGETS) ---

// 1. ESP32-S3 Voice wave pulsing
const SoundwaveVisualizer: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 h-6 px-2 bg-black/60 border border-[#E7BB55]/15 rounded font-mono text-[8px] text-[#E7BB55]">
      <Mic className="w-3.5 h-3.5 animate-pulse" />
      <span className="opacity-60 mr-1.5">\"Help me\"</span>
      <div className="flex gap-0.5 items-center h-full">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] bg-[#E7BB55] rounded-full"
            animate={{ height: [4, 16, 4] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.12,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

// 2. 60s Warning Escalation countdown visualizer
const CountdownVisualizer: React.FC = () => {
  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex items-center gap-1 font-mono text-[9px] text-[#E7BB55]">
        <Clock className="w-3.5 h-3.5" />
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          [ESCALATION_WARN]
        </motion.span>
      </div>
      <div className="flex-1 h-2 bg-zinc-900 border border-zinc-800 rounded overflow-hidden relative">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-red-600"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
      </div>
      <span className="font-mono text-[8px] text-zinc-500">60s</span>
    </div>
  );
};

// 3. ESP32-C3 mmWave Radar circular sweeps
const RadarVisualizer: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8 rounded-full border border-[#E7BB55]/20 flex items-center justify-center bg-black/40 overflow-hidden">
        {/* Radar Sweep Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E7BB55]/20 to-transparent"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        />
        {/* target ping */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] absolute"
          style={{ top: "30%", left: "40%" }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
        <Radio className="w-3 h-3 text-[#E7BB55] z-10" />
      </div>
      <div className="font-mono text-[8px] text-zinc-400 space-y-0.5">
        <div>LD2420 mmWave Radar</div>
        <div className="text-zinc-600">[RF_LINK: CONNECTED]</div>
      </div>
    </div>
  );
};

// --- TECHNICAL DATA STRINGS FOR COPYING ---
const s3Code = `// elsa_s3_hub.ino -- ESP32-S3 Central Hub Voice Controller
#include <WiFi.h>
#include <ESP32_OfflineVoice.h>
#include <RF_Receiver.h>

#define TRIGGER_BUTTON_PIN 4
#define EMERGENCY_SMS_API "https://api.pluggedin.safety/elsa/alert"

ESP32_VoiceSpotter voiceSpotter;
RFReceiver rfReceiver;

volatile bool alertTriggered = false;
volatile bool cancelRequested = false;
unsigned long triggerTime = 0;

void IRAM_ATTR handleButtonInterrupt() {
  alertTriggered = true;
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIGGER_BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(TRIGGER_BUTTON_PIN, handleButtonInterrupt, FALLING);
  
  // Initialize local neural network voice engine
  voiceSpotter.begin();
  voiceSpotter.addKeyword("Help me", 0.82);
  voiceSpotter.addKeyword("Cancel", 0.85);
  
  rfReceiver.begin(433); // 433MHz local RF receiver link
  WiFi.begin("Residential_Secure", "WPA3_PASS");
}

void loop() {
  String keyword = voiceSpotter.listen();
  if (keyword == "Help me") {
    alertTriggered = true;
    triggerTime = millis();
  } else if (keyword == "Cancel" && alertTriggered) {
    cancelRequested = true;
  }
  
  if (rfReceiver.available()) {
    RFPayload payload = rfReceiver.read();
    if (payload.event == RF_EVENT_FALL_DETECTED) {
      alertTriggered = true;
      triggerTime = millis();
    }
  }
  
  // 60-Second local Caretaker buffer sequence
  if (alertTriggered) {
    unsigned long elapsed = millis() - triggerTime;
    if (cancelRequested) {
      alertTriggered = false;
      cancelRequested = false;
    } else if (elapsed > 60000) {
      sendEmergencyPayload(); // WI-FI / GSM cloud escalation
      alertTriggered = false;
    }
  }
}`;

const c3Code = `// elsa_c3_radar.ino -- ESP32-C3 mmWave radar fall detection module
#include <LD2420_Radar.h>
#include <RF_Transmitter.h>

#define VIBRATION_SENSOR_PIN 2
#define RF_TX_PIN 10

LD2420Radar radar;
RFTransmitter rfTx;

volatile bool highImpactDetected = false;

void IRAM_ATTR handleVibration() {
  highImpactDetected = true;
}

void setup() {
  Serial.begin(115200);
  pinMode(VIBRATION_SENSOR_PIN, INPUT_PULLUP);
  attachInterrupt(VIBRATION_SENSOR_PIN, handleVibration, RISING);
  
  // UART connection to LD2420 24GHz mmWave radar
  Serial1.begin(256000, SERIAL_8N1, 4, 5);
  radar.begin(Serial1);
  
  rfTx.begin(RF_TX_PIN, 433); // 433MHz local RF transmitter
}

void loop() {
  radar.update();
  
  // Differentiate soft movements from hard impact events
  if (highImpactDetected) {
    delay(1500); // Wait for fall movement settling
    
    // mmWave verifies static target presence below height threshold
    if (radar.hasPresence() && radar.getTargetDistance() < 0.5) {
      RFPayload packet;
      packet.event = RF_EVENT_FALL_DETECTED;
      packet.batteryLevel = getBatteryVoltage();
      
      rfTx.send(packet); // Send warning payload to S3 Hub
    }
    highImpactDetected = false;
  }
}`;

const rfCode = `// rf_protocol.h -- Shared telemetry payload struct definitions
#ifndef RF_PROTOCOL_H
#define RF_PROTOCOL_H

enum RFEventType {
  RF_EVENT_HEARTBEAT = 0x00,
  RF_EVENT_BUTTON_PRESS = 0x01,
  RF_EVENT_FALL_DETECTED = 0x02,
  RF_EVENT_LOW_BATTERY = 0x03
};

struct __attribute__((packed)) RFPayload {
  uint8_t event;          // Maps to RFEventType enum
  float batteryLevel;     // Battery voltage (e.g. 3.78V)
  uint32_t messageId;     // Monotonically increasing counter
  uint8_t checksum;       // CRC8 byte checksum for data integrity
};

// Structured medical payload forwarded to Cloud Escalation APIs
struct MedicalPayload {
  char flatNumber[8] = "D-402";
  char coordinates[32] = "12.9716 N, 77.5946 E";
  char primaryContact[15] = "+919876543210";
  char medicalHistory[128] = "Type II Diabetes, Penicillin Allergy, Heart Bypass History (2023)";
};

#endif // RF_PROTOCOL_H`;


// --- 3D RADAR SCANNING VECTOR CANVAS ---
const RadarPointCloudCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    interface Point3D {
      x: number;
      y: number;
      z: number;
      jointIndex: number;
    }

    const joints = [
      { id: "head", x: 0, y: -75, z: 0 },
      { id: "neck", x: 0, y: -60, z: 0 },
      { id: "spine", x: 0, y: -30, z: 0 },
      { id: "pelvis", x: 0, y: 10, z: 0 },
      { id: "l_shoulder", x: -22, y: -50, z: 0 },
      { id: "l_elbow", x: -35, y: -30, z: -10 },
      { id: "l_hand", x: -45, y: -10, z: -15 },
      { id: "r_shoulder", x: 22, y: -50, z: 0 },
      { id: "r_elbow", x: 35, y: -30, z: 10 },
      { id: "r_hand", x: 45, y: -10, z: 15 },
      { id: "l_hip", x: -12, y: 15, z: 0 },
      { id: "l_knee", x: -16, y: 55, z: 5 },
      { id: "l_foot", x: -18, y: 90, z: 0 },
      { id: "r_hip", x: 12, y: 15, z: 0 },
      { id: "r_knee", x: 16, y: 55, z: -5 },
      { id: "r_foot", x: 18, y: 90, z: 0 },
    ];

    const baseParticles: Point3D[] = [];
    const particlesPerJoint = 9;
    
    joints.forEach((joint, jIdx) => {
      for (let i = 0; i < particlesPerJoint; i++) {
        const ox = (Math.random() - 0.5) * 16;
        const oy = (Math.random() - 0.5) * 16;
        const oz = (Math.random() - 0.5) * 16;
        baseParticles.push({
          x: joint.x + ox,
          y: joint.y + oy,
          z: joint.z + oz,
          jointIndex: jIdx,
        });
      }
    });

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, w, h);

      const timeMs = Date.now();
      const loopTime = (timeMs % 10000) / 1000;
      
      let state: "standing" | "falling" | "fallen" | "resetting" = "standing";
      let phaseProgress = 0;

      if (loopTime < 4) {
        state = "standing";
        phaseProgress = loopTime / 4;
      } else if (loopTime < 5.2) {
        state = "falling";
        phaseProgress = (loopTime - 4) / 1.2;
      } else if (loopTime < 9) {
        state = "fallen";
        phaseProgress = (loopTime - 5.2) / 3.8;
      } else {
        state = "resetting";
        phaseProgress = (loopTime - 9) / 1;
      }

      const yaw = timeMs * 0.0006;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);

      const pitch = 0.35;
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);

      const centerX = w * 0.5;
      const centerY = h * 0.5;

      const sweepAngle = (timeMs * 0.0018) % (Math.PI * 2);
      const maxRadius = Math.min(w, h) * 0.45;
      
      ctx.strokeStyle = "rgba(231, 187, 85, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.stroke();

      for (let r = 0.2; r <= 1; r += 0.2) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(231, 187, 85, ${0.03 + (1 - r) * 0.07})`;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(sweepAngle) * maxRadius, centerY + Math.sin(sweepAngle) * maxRadius);
      ctx.strokeStyle = "rgba(231, 187, 85, 0.15)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, sweepAngle - 0.4, sweepAngle, false);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      sweepGrad.addColorStop(0, "rgba(231, 187, 85, 0.05)");
      sweepGrad.addColorStop(1, "rgba(231, 187, 85, 0)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      const projectedPoints = baseParticles.map((bp) => {
        let px = bp.x;
        let py = bp.y;
        let pz = bp.z;

        if (state === "standing") {
          const breathing = Math.sin(timeMs * 0.003) * 2.5;
          if (bp.jointIndex === 2 || bp.jointIndex === 1) {
            pz += breathing;
            px += breathing * 0.5;
          }
        } else if (state === "falling") {
          const t = phaseProgress;
          const tiltAngle = t * 1.57;
          const cosT = Math.cos(tiltAngle);
          const sinT = Math.sin(tiltAngle);
          const tempY = bp.y * cosT - bp.z * sinT;
          const tempZ = bp.y * sinT + bp.z * cosT;
          py = tempY + (t * 70);
          pz = tempZ;
          const jitter = (1 - t) * t * 15;
          px += (Math.random() - 0.5) * jitter;
          py += (Math.random() - 0.5) * jitter;
          pz += (Math.random() - 0.5) * jitter;
        } else if (state === "fallen") {
          const tempY = bp.z;
          const tempZ = bp.y;
          const breathing = Math.sin(timeMs * 0.0015) * 1.2;
          py = tempY * 0.6 + 65 + (bp.jointIndex === 2 ? breathing : 0);
          pz = tempZ * 0.95;
        } else if (state === "resetting") {
          const t = phaseProgress;
          const tiltAngle = (1 - t) * 1.57;
          const cosT = Math.cos(tiltAngle);
          const sinT = Math.sin(tiltAngle);
          const tempY = bp.y * cosT - bp.z * sinT;
          const tempZ = bp.y * sinT + bp.z * cosT;
          py = tempY + ((1 - t) * 70);
          pz = tempZ;
        }

        const rx = px * cosYaw - pz * sinYaw;
        const rz = px * sinYaw + pz * cosYaw;
        const finalY = py * cosPitch - rz * sinPitch;
        const finalZ = py * sinPitch + rz * cosPitch;

        const distance = 300;
        const scale = distance / (distance + finalZ);
        const screenX = centerX + rx * scale * 2.2;
        const screenY = centerY + finalY * scale * 2.2;

        return { x: screenX, y: screenY, z: finalZ, jointIdx: bp.jointIndex };
      });

      ctx.lineWidth = 0.55;
      ctx.strokeStyle = "rgba(231, 187, 85, 0.09)";
      for (let i = 0; i < projectedPoints.length; i++) {
        const pt1 = projectedPoints[i];
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const pt2 = projectedPoints[j];
          const isSameJoint = pt1.jointIdx === pt2.jointIdx;
          const isNeighborJoint = Math.abs(pt1.jointIdx - pt2.jointIdx) === 1;
          
          if (isSameJoint || (isNeighborJoint && Math.random() < 0.25)) {
            const dx = pt1.x - pt2.x;
            const dy = pt1.y - pt2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 45) {
              ctx.beginPath();
              ctx.moveTo(pt1.x, pt1.y);
              ctx.lineTo(pt2.x, pt2.y);
              ctx.stroke();
            }
          }
        }
      }

      projectedPoints.forEach((pt) => {
        const depthAlpha = Math.max(0.2, Math.min(1.0, 1 - pt.z / 300));
        ctx.beginPath();
        ctx.fillStyle = `rgba(231, 187, 85, ${depthAlpha * 0.75})`;
        ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(231, 187, 85, 0.75)";
      ctx.fillText(`RADAR NODE: ESP32-C3`, 25, 35);
      ctx.fillText(`FREQUENCY: 24.15 GHz (mmWave)`, 25, 50);
      ctx.fillText(`TARGET STATE: ${state.toUpperCase()}`, 25, 65);
      
      const rate = state === "falling" ? "92 Hz" : "20 Hz";
      ctx.fillText(`SAMPLE RATE : ${rate}`, 25, 80);

      const graphX = 25;
      const graphY = h - 60;
      const graphW = 120;
      const graphH = 35;

      ctx.strokeStyle = "rgba(231, 187, 85, 0.25)";
      ctx.strokeRect(graphX, graphY, graphW, graphH);
      ctx.fillStyle = "rgba(231, 187, 85, 0.05)";
      ctx.fillRect(graphX, graphY, graphW, graphH);

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#E7BB55";
      for (let gx = 0; gx < graphW; gx++) {
        let gy = 0;
        if (state === "standing") {
          gy = Math.sin((timeMs * 0.01) + gx * 0.15) * 3 + (Math.sin(gx * 0.05) * 1.5);
        } else if (state === "falling") {
          gy = Math.sin((timeMs * 0.06) + gx * 0.45) * 12 * Math.exp(-gx * 0.015);
        } else if (state === "fallen") {
          gy = (Math.random() - 0.5) * 1.5;
        } else {
          gy = Math.sin((timeMs * 0.01) + gx * 0.1) * 4;
        }
        
        const px = graphX + gx;
        const py = graphY + (graphH * 0.5) + gy;
        
        if (gx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.fillText(`ACCEL PROFILE (G-FORCE)`, graphX, graphY - 6);

      if (state === "falling") {
        ctx.fillStyle = "rgba(239, 68, 68, 0.85)";
        ctx.fillRect(w - 180, 25, 150, 22);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px monospace";
        ctx.fillText(`!! FALL EVENT DETECTED !!`, w - 165, 39);
      } else {
        ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
        ctx.fillRect(w - 180, 25, 150, 22);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px monospace";
        ctx.fillText(`SYSTEM MONITORING: OK`, w - 165, 39);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
};


// --- HIGH TECH DEVELOPER CODE TERMINAL ---
const DeveloperConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"s3" | "c3" | "rf">("s3");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let codeText = "";
    if (activeTab === "s3") codeText = s3Code;
    else if (activeTab === "c3") codeText = c3Code;
    else codeText = rfCode;

    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const s3CodeJSX = (
    <code className="block font-mono text-xs text-zinc-300 leading-relaxed">
      <div><span className="text-zinc-500">// elsa_s3_hub.ino -- ESP32-S3 Central Hub Voice Controller</span></div>
      <div><span className="text-amber-500">#include</span> <span className="text-emerald-500">&lt;WiFi.h&gt;</span></div>
      <div><span className="text-amber-500">#include</span> <span className="text-emerald-500">&lt;ESP32_OfflineVoice.h&gt;</span></div>
      <div><span className="text-amber-500">#include</span> <span className="text-emerald-500">&lt;RF_Receiver.h&gt;</span></div>
      <div className="h-3"></div>
      <div><span className="text-amber-500">#define</span> <span className="text-sky-400">TRIGGER_BUTTON_PIN</span> <span className="text-orange-400">4</span></div>
      <div><span className="text-amber-500">#define</span> <span className="text-sky-400">EMERGENCY_SMS_API</span> <span className="text-emerald-500">"https://api.pluggedin.safety/elsa/alert"</span></div>
      <div className="h-3"></div>
      <div><span className="text-sky-400">ESP32_VoiceSpotter</span> voiceSpotter;</div>
      <div><span className="text-sky-400">RFReceiver</span> rfReceiver;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">volatile bool</span> alertTriggered = <span className="text-orange-400">false</span>;</div>
      <div><span className="text-purple-400">volatile bool</span> cancelRequested = <span className="text-orange-400">false</span>;</div>
      <div><span className="text-purple-400">unsigned long</span> triggerTime = <span className="text-orange-400">0</span>;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">void</span> <span className="text-teal-400">IRAM_ATTR</span> <span className="text-blue-400">handleButtonInterrupt</span>() &#123;</div>
      <div>  alertTriggered = <span className="text-orange-400">true</span>;</div>
      <div>&#125;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">void</span> <span className="text-blue-400">setup</span>() &#123;</div>
      <div>  <span className="text-sky-400">Serial</span>.<span className="text-blue-400">begin</span>(<span className="text-orange-400">115200</span>);</div>
      <div>  <span className="text-blue-400">pinMode</span>(<span className="text-sky-400">TRIGGER_BUTTON_PIN</span>, <span className="text-teal-400">INPUT_PULLUP</span>);</div>
      <div>  <span className="text-blue-400">attachInterrupt</span>(<span className="text-sky-400">TRIGGER_BUTTON_PIN</span>, handleButtonInterrupt, <span className="text-teal-400">FALLING</span>);</div>
      <div>  </div>
      <div>  <span className="text-zinc-500">  // Initialize local neural network voice engine</span></div>
      <div>  voiceSpotter.<span className="text-blue-400">begin</span>();</div>
      <div>  voiceSpotter.<span className="text-blue-400">addKeyword</span>(<span className="text-emerald-500">"Help me"</span>, <span className="text-orange-400">0.82</span>);</div>
      <div>  voiceSpotter.<span className="text-blue-400">addKeyword</span>(<span className="text-emerald-500">"Cancel"</span>, <span className="text-orange-400">0.85</span>);</div>
      <div>  </div>
      <div>  rfReceiver.<span className="text-blue-400">begin</span>(<span className="text-orange-400">433</span>); <span className="text-zinc-500">// 433MHz local RF receiver link</span></div>
      <div>  <span className="text-sky-400">WiFi</span>.<span className="text-blue-400">begin</span>(<span className="text-emerald-500">"Residential_Secure"</span>, <span className="text-emerald-500">"WPA3_PASS"</span>);</div>
      <div>&#125;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">void</span> <span className="text-blue-400">loop</span>() &#123;</div>
      <div>  <span className="text-sky-400">String</span> keyword = voiceSpotter.<span className="text-blue-400">listen</span>();</div>
      <div>  <span className="text-purple-400">if</span> (keyword == <span className="text-emerald-500">"Help me"</span>) &#123;</div>
      <div>    alertTriggered = <span className="text-orange-400">true</span>;</div>
      <div>    triggerTime = <span className="text-blue-400">millis</span>();</div>
      <div>  &#125; <span className="text-purple-400">else if</span> (keyword == <span className="text-emerald-500">"Cancel"</span> &amp;&amp; alertTriggered) &#123;</div>
      <div>    cancelRequested = <span className="text-orange-400">true</span>;</div>
      <div>  &#125;</div>
      <div>  </div>
      <div>  <span className="text-purple-400">if</span> (rfReceiver.<span className="text-blue-400">available</span>()) &#123;</div>
      <div>    <span className="text-sky-400">RFPayload</span> payload = rfReceiver.<span className="text-blue-400">read</span>();</div>
      <div>    <span className="text-purple-400">if</span> (payload.event == <span className="text-teal-400">RF_EVENT_FALL_DETECTED</span>) &#123;</div>
      <div>      alertTriggered = <span className="text-orange-400">true</span>;</div>
      <div>      triggerTime = <span className="text-blue-400">millis</span>();</div>
      <div>    &#125;</div>
      <div>  &#125;</div>
      <div>  </div>
      <div>  <span className="text-zinc-500">  // 60-Second local Caretaker buffer sequence</span></div>
      <div>  <span className="text-purple-400">if</span> (alertTriggered) &#123;</div>
      <div>    <span className="text-purple-400">unsigned long</span> elapsed = <span className="text-blue-400">millis</span>() - triggerTime;</div>
      <div>    <span className="text-purple-400">if</span> (cancelRequested) &#123;</div>
      <div>      alertTriggered = <span className="text-orange-400">false</span>;</div>
      <div>      cancelRequested = <span className="text-orange-400">false</span>;</div>
      <div>    &#125; <span className="text-purple-400">else if</span> (elapsed &gt; <span className="text-orange-400">60000</span>) &#123;</div>
      <div>      <span className="text-blue-400">sendEmergencyPayload</span>(); <span className="text-zinc-500">// Cloud escalation</span></div>
      <div>      alertTriggered = <span className="text-orange-400">false</span>;</div>
      <div>    &#125;</div>
      <div>  &#125;</div>
      <div>&#125;</div>
    </code>
  );

  const c3CodeJSX = (
    <code className="block font-mono text-xs text-zinc-300 leading-relaxed">
      <div><span className="text-zinc-500">// elsa_c3_radar.ino -- ESP32-C3 mmWave radar fall detection module</span></div>
      <div><span className="text-amber-500">#include</span> <span className="text-emerald-500">&lt;LD2420_Radar.h&gt;</span></div>
      <div><span className="text-amber-500">#include</span> <span className="text-emerald-500">&lt;RF_Transmitter.h&gt;</span></div>
      <div className="h-3"></div>
      <div><span className="text-amber-500">#define</span> <span className="text-sky-400">VIBRATION_SENSOR_PIN</span> <span className="text-orange-400">2</span></div>
      <div><span className="text-amber-500">#define</span> <span className="text-sky-400">RF_TX_PIN</span> <span className="text-orange-400">10</span></div>
      <div className="h-3"></div>
      <div><span className="text-sky-400">LD2420Radar</span> radar;</div>
      <div><span className="text-sky-400">RFTransmitter</span> rfTx;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">volatile bool</span> highImpactDetected = <span className="text-orange-400">false</span>;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">void</span> <span className="text-teal-400">IRAM_ATTR</span> <span className="text-blue-400">handleVibration</span>() &#123;</div>
      <div>  highImpactDetected = <span className="text-orange-400">true</span>;</div>
      <div>&#125;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">void</span> <span className="text-blue-400">setup</span>() &#123;</div>
      <div>  <span className="text-sky-400">Serial</span>.<span className="text-blue-400">begin</span>(<span className="text-orange-400">115200</span>);</div>
      <div>  <span className="text-blue-400">pinMode</span>(<span className="text-sky-400">VIBRATION_SENSOR_PIN</span>, <span className="text-teal-400">INPUT_PULLUP</span>);</div>
      <div>  <span className="text-blue-400">attachInterrupt</span>(<span className="text-sky-400">VIBRATION_SENSOR_PIN</span>, handleVibration, <span className="text-teal-400">RISING</span>);</div>
      <div>  </div>
      <div>  <span className="text-zinc-500">  // UART connection to LD2420 24GHz mmWave radar</span></div>
      <div>  <span className="text-sky-400">Serial1</span>.<span className="text-blue-400">begin</span>(<span className="text-orange-400">256000</span>, <span className="text-teal-400">SERIAL_8N1</span>, <span className="text-orange-400">4</span>, <span className="text-orange-400">5</span>);</div>
      <div>  radar.<span className="text-blue-400">begin</span>(<span className="text-sky-400">Serial1</span>);</div>
      <div>  </div>
      <div>  rfTx.<span className="text-blue-400">begin</span>(<span className="text-sky-400">RF_TX_PIN</span>, <span className="text-orange-400">433</span>); <span className="text-zinc-500">// 433MHz RF link</span></div>
      <div>&#125;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">void</span> <span className="text-blue-400">loop</span>() &#123;</div>
      <div>  radar.<span className="text-blue-400">update</span>();</div>
      <div>  </div>
      <div>  <span className="text-zinc-500">  // Differentiate soft movements from hard impact events</span></div>
      <div>  <span className="text-purple-400">if</span> (highImpactDetected) &#123;</div>
      <div>    <span className="text-blue-400">delay</span>(<span className="text-orange-400">1500</span>); <span className="text-zinc-500">// Wait for fall movement settling</span></div>
      <div>    </div>
      <div>    <span className="text-zinc-500">    // mmWave verifies static target presence below height threshold</span></div>
      <div>    <span className="text-purple-400">if</span> (radar.<span className="text-blue-400">hasPresence</span>() &amp;&amp; radar.<span className="text-blue-400">getTargetDistance</span>() &lt; <span className="text-orange-400">0.5</span>) &#123;</div>
      <div>      <span className="text-sky-400">RFPayload</span> packet;</div>
      <div>      packet.event = <span className="text-teal-400">RF_EVENT_FALL_DETECTED</span>;</div>
      <div>      packet.batteryLevel = <span className="text-blue-400">getBatteryVoltage</span>();</div>
      <div>      </div>
      <div>      rfTx.<span className="text-blue-400">send</span>(packet); <span className="text-zinc-500">// Send warning payload to S3 Hub</span></div>
      <div>    &#125;</div>
      <div>    highImpactDetected = <span className="text-orange-400">false</span>;</div>
      <div>  &#125;</div>
      <div>&#125;</div>
    </code>
  );

  const rfCodeJSX = (
    <code className="block font-mono text-xs text-zinc-300 leading-relaxed">
      <div><span className="text-zinc-500">// rf_protocol.h -- Shared telemetry payload struct definitions</span></div>
      <div><span className="text-amber-500">#ifndef</span> <span className="text-sky-400">RF_PROTOCOL_H</span></div>
      <div><span className="text-amber-500">#define</span> <span className="text-sky-400">RF_PROTOCOL_H</span></div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">enum</span> <span className="text-sky-400">RFEventType</span> &#123;</div>
      <div>  <span className="text-teal-400">RF_EVENT_HEARTBEAT</span> = <span className="text-orange-400">0x00</span>,</div>
      <div>  <span className="text-teal-400">RF_EVENT_BUTTON_PRESS</span> = <span className="text-orange-400">0x01</span>,</div>
      <div>  <span className="text-teal-400">RF_EVENT_FALL_DETECTED</span> = <span className="text-orange-400">0x02</span>,</div>
      <div>  <span className="text-teal-400">RF_EVENT_LOW_BATTERY</span> = <span className="text-orange-400">0x03</span></div>
      <div>&#125;;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">struct</span> <span className="text-teal-400">__attribute__</span>((packed)) <span className="text-sky-400">RFPayload</span> &#123;</div>
      <div>  <span className="text-purple-400">uint8_t</span> event;          <span className="text-zinc-500">// Maps to RFEventType enum</span></div>
      <div>  <span className="text-purple-400">float</span> batteryLevel;     <span className="text-zinc-500">// Battery voltage (e.g. 3.78V)</span></div>
      <div>  <span className="text-purple-400">uint32_t</span> messageId;     <span className="text-zinc-500">// Message ID tracker</span></div>
      <div>  <span className="text-purple-400">uint8_t</span> checksum;       <span className="text-zinc-500">// CRC8 byte checksum</span></div>
      <div>&#125;;</div>
      <div className="h-3"></div>
      <div><span className="text-purple-400">struct</span> <span className="text-sky-400">MedicalPayload</span> &#123;</div>
      <div>  <span className="text-purple-400">char</span> flatNumber[<span className="text-orange-400">8</span>] = <span className="text-emerald-500">"D-402"</span>;</div>
      <div>  <span className="text-purple-400">char</span> coordinates[<span className="text-orange-400">32</span>] = <span className="text-emerald-500">"12.9716 N, 77.5946 E"</span>;</div>
      <div>  <span className="text-purple-400">char</span> primaryContact[<span className="text-orange-400">15</span>] = <span className="text-emerald-500">"+919876543210"</span>;</div>
      <div>  <span className="text-purple-400">char</span> medicalHistory[<span className="text-orange-400">128</span>] = <span className="text-emerald-500">"Type II Diabetes, Penicillin Allergy, Heart Bypass History (2023)"</span>;</div>
      <div>&#125;;</div>
      <div className="h-3"></div>
      <div><span className="text-amber-500">#endif</span> <span className="text-zinc-500">// RF_PROTOCOL_H</span></div>
    </code>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#050507]/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl relative"
    >
      {/* Top Menu Bar */}
      <div className="bg-[#0b0b0e] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-[#E7BB55]" />
          <span className="font-mono text-xs text-zinc-400">Firmware Blueprint Compiler v1.2.0</span>
        </div>
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#08080a] border-b border-zinc-800 flex items-center justify-between px-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("s3")}
            className={`px-4 py-3 font-mono text-[11px] border-r border-zinc-800 transition-colors uppercase tracking-wider ${
              activeTab === "s3"
                ? "bg-[#050507] text-[#E7BB55] border-t-2 border-t-[#E7BB55]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            elsa_s3_hub.ino
          </button>
          <button
            onClick={() => setActiveTab("c3")}
            className={`px-4 py-3 font-mono text-[11px] border-r border-zinc-800 transition-colors uppercase tracking-wider ${
              activeTab === "c3"
                ? "bg-[#050507] text-[#E7BB55] border-t-2 border-t-[#E7BB55]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            elsa_c3_radar.ino
          </button>
          <button
            onClick={() => setActiveTab("rf")}
            className={`px-4 py-3 font-mono text-[11px] border-r border-zinc-800 transition-colors uppercase tracking-wider ${
              activeTab === "rf"
                ? "bg-[#050507] text-[#E7BB55] border-t-2 border-t-[#E7BB55]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            rf_protocol.h
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="mr-2 px-3 py-1.5 bg-[#E7BB55]/10 border border-[#E7BB55]/30 hover:bg-[#E7BB55] hover:text-black rounded transition-all duration-300 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#E7BB55]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-6 bg-[#050507] overflow-x-auto max-h-[420px] overflow-y-auto custom-scrollbar">
        {activeTab === "s3" && s3CodeJSX}
        {activeTab === "c3" && c3CodeJSX}
        {activeTab === "rf" && rfCodeJSX}
      </div>
    </motion.div>
  );
};


const ELSA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track global mouse coordinates for background spotlight
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);

    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#020203";

    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  // --- ANIMATION TIMELINE ---
  // Shifts device right and scales dynamically to yield room for descriptive stages
  const deviceScale = useTransform(smoothProgress, 
    [0, 0.1, 0.3, 0.34, 0.48, 0.52, 0.9, 1], 
    [1, 0.6, 0.6, 0.45, 0.45, 0.35, 0.35, 1.4] 
  );

  const deviceRotate = useTransform(smoothProgress,
    [0, 0.1, 0.3],
    [0, -12, 0] 
  );

  const deviceX = useTransform(smoothProgress,
    [0, 0.15, 0.30, 0.48, 0.52, 0.9, 1],
    ["0%", "35%", "35%", "35%", "0%", "0%", "0%"]
  );

  const deviceY = useTransform(smoothProgress,
    [0, 0.1, 0.35, 1],
    ["14vh", "14vh", "0vh", "0vh"]
  );

  // --- TITLE TEXT HOVER REVEAL & SCROLL FADEOUT ---
  const hoverOpacity = useMotionValue(0);
  const scrollTextOpacity = useTransform(smoothProgress, [0, 0.12, 0.15], [1, 1, 0]);
  const textOpacity = useTransform([scrollTextOpacity, hoverOpacity], ([s, h]) => (s as number) * (h as number));
  const headerTextGlobalOpacity = useTransform(smoothProgress, [0.12, 0.15], [1, 0]);

  const [titleRevealed, setTitleRevealed] = useState(false);

  const handleDeviceHover = () => {
    setTitleRevealed(true);
    animate(hoverOpacity, 1, { duration: 0.8, ease: "easeOut" });
  };

  const textTopX = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "-30%", "0%"]);
  const textTopY = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "-120%", "-300%"]);
  
  const textBottomX = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "30%", "0%"]);
  const textBottomY = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "120%", "-300%"]);

  // --- "WHAT IS ELSA" ---
  const infoOpacity = useTransform(smoothProgress, [0.18, 0.20, 0.28, 0.30], [0, 1, 1, 0]);
  const infoX = useTransform(smoothProgress, [0.18, 0.20], ["-50%", "0%"]);

  // --- "TECHNICAL ARCHITECTURE DIAGNOSTICS" ---
  const techDiagOpacity = useTransform(smoothProgress, [0.30, 0.32, 0.46, 0.48], [0, 1, 1, 0]);
  const techDiagX = useTransform(smoothProgress, [0.30, 0.32], ["-60px", "0px"]);

  // --- FEATURES HEADER ---
  const featuresHeaderOpacity = useTransform(smoothProgress, [0.50, 0.53, 0.9, 0.95], [0, 1, 1, 0]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.02], [1, 0]);

  // --- INTRO INSPECT BUTTON ---
  const introButtonOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const introButtonPointerEvents = useTransform(smoothProgress, (v) => v > 0.08 ? 'none' : 'auto');

  // --- END CTA BUTTONS ---
  const buttonsOpacity = useTransform(smoothProgress, [0.94, 0.98], [0, 1]);
  const buttonsYPos = useTransform(smoothProgress, [0.94, 0.98], [20, 0]);
  const buttonsDisplay = useTransform(smoothProgress, (v) => v < 0.9 ? "none" : "flex");

  // --- FEATURE DATA ---
  const features = [
    {
      title: "Context-Aware",
      description: "Clicks vs long-presses.",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      title: "Data-Enriched",
      description: "Sends key medical details.",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Tiered Escalation",
      description: "Caretakers then Emergency.",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Centralized Hub",
      description: "Live dashboard status.",
      icon: <Monitor className="h-5 w-5" />,
    },
    {
      title: "Easy Setup",
      description: "Instant deployability.",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Voice Triggers",
      description: "Hands-free activation.",
      icon: <Mic className="h-5 w-5" />,
    },
    {
      title: "Fall Detection",
      description: "Auto-detects falls.",
      icon: <Activity className="h-5 w-5" />,
    },
  ];

  return (
    <AnimatedPage>
      <Helmet>
        <title>E.L.S.A | Plugged In</title>
        <meta name="description" content="Emergency Link for Smart Alert." />
      </Helmet>

      {/* OUTER CONTAINER */}
      <div 
        ref={containerRef} 
        style={{
          background: 'radial-gradient(circle 800px at var(--global-mouse-x, 50%) var(--global-mouse-y, 50%), rgba(231, 187, 85, 0.04) 0%, rgba(2, 2, 3, 1) 75%, #020203 100%)'
        }}
        className="relative text-white overflow-x-hidden" 
      >
        {/* SHOWCASE SCROLL WRAPPER */}
        <div ref={showcaseRef} className="relative h-[300vh]">
        {/* Full-Screen Interactive Connected Particle Matrix Grid */}
        <InteractiveCanvasGrid />

        {/* Decorative Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5505_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5505_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        
        {/* STICKY STAGE */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* --- STAGE 1: INTRO TEXT --- */}
          <motion.div 
            className="absolute top-[14%] z-0 flex flex-col items-center justify-center pointer-events-none w-full px-4"
            style={{ opacity: headerTextGlobalOpacity }}
            initial={{ y: 40, scale: 0.97 }}
            animate={titleRevealed ? { y: 0, scale: 1 } : { y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 85, damping: 14 }}
          >
             <motion.h1 
               style={{ x: textTopX, y: textTopY, opacity: textOpacity }}
               className="font-display text-[#E7BB55] text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-center"
             >
               Emergency Link
             </motion.h1>
 
             <motion.h1 
                style={{ x: textBottomX, y: textBottomY, opacity: textOpacity }}
                className="font-display text-white text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wide mt-2 text-center"
             >
               For Smart Alert
             </motion.h1>
          </motion.div>

          {/* --- INTRO CTA BUTTON --- */}
          <motion.div
            style={{ 
              opacity: introButtonOpacity,
              pointerEvents: introButtonPointerEvents 
            }}
            className="absolute z-30 bottom-[14%] right-[8%] flex flex-col items-center md:items-end gap-3 text-center md:text-right"
          >
            <h1 className="font-display text-[#E7BB55] text-6xl font-black tracking-widest mb-1">
              E.L.S.A
            </h1>

            <Button 
              variant="secondary" 
              size="default" 
              className="shadow-[0_0_20px_rgba(231,187,85,0.15)] border border-[#E7BB55]/30 bg-black text-[#E7BB55] hover:bg-[#E7BB55] hover:text-black hover:scale-105 transition-all duration-300 rounded-full gap-2 pl-4 pr-5 font-display font-bold uppercase tracking-wider text-xs"
              asChild
            >
              <Link to="/product-inspect">
                <Cuboid className="h-4 w-4 stroke-2" />
                <span>Touch to Inspect</span>
              </Link>
            </Button>
          </motion.div>


          {/* --- THE DEVICE --- */}
          <motion.div
            onMouseEnter={handleDeviceHover}
            className="relative z-10 w-[90vw] md:w-[60vw] max-w-[1000px] aspect-video group cursor-pointer" 
            style={{
              scale: deviceScale,
              x: deviceX,
              y: deviceY,
              rotate: deviceRotate, 
            }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            {/* Ambient scanning aura */}
            <div className="absolute inset-0 bg-[#E7BB55]/5 filter blur-[60px] rounded-full pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            
            <img 
              src={elsaDeviceImage} 
              alt="ELSA Device" 
              className="w-full h-full object-contain relative z-10"
            />

            {/* Futuristic target corner elements around the device view */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#E7BB55]/30 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#E7BB55]/30 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#E7BB55]/30 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#E7BB55]/30 pointer-events-none z-20" />

            {/* Glowing scanning laser line */}
            <div className="absolute inset-x-4 top-0 bottom-0 bg-[linear-gradient(to_bottom,rgba(231,187,85,0)_40%,rgba(231,187,85,0.25)_50%,rgba(231,187,85,0)_60%)] bg-[size:100%_200%] pointer-events-none z-20 animate-laser-sweep" style={{ animationDuration: '4s' }} />
          </motion.div>


          {/* --- STAGE 2: CONTENT (What is ELSA) --- */}
          <motion.div 
            style={{ opacity: infoOpacity, x: infoX }}
            className="absolute left-[5%] md:left-[10%] top-[20%] md:top-1/4 max-w-2xl z-20 pointer-events-none"
          >
            <h2 className="font-display text-white text-4xl md:text-7xl font-extrabold mb-6 md:mb-8 leading-tight">
              What is <br/> <span className="text-[#E7BB55]">E.L.S.A?</span>
            </h2>
            <p className="text-zinc-300 text-base md:text-xl leading-relaxed font-modern bg-black/60 border border-zinc-800 backdrop-blur-md p-5 rounded-xl md:bg-transparent md:border-none md:backdrop-blur-none md:p-0">
              One of the core innovations we're developing is ELSA - Emergency Link for Smart Alert, a context-aware emergency response system.
            </p>
            {/* Box below description */}
            <div className="bg-black/75 border border-[#E7BB55]/15 rounded-lg p-5 md:p-6 backdrop-blur-md mt-6">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-modern font-medium">
                With a single or double press of a discreet button, users can trigger alerts to medical services or law enforcement, depending on the situation. ELSA's intelligent design ensures minimal false alarms, fast communication, and seamless integration with smart environments—making it a life-saving layer of security in modern homes.
              </p>
            </div>
          </motion.div>


          {/* --- STAGE 2.5: SYSTEM ARCHITECTURE & DIAGNOSTICS (NEW) --- */}
          <motion.div
            style={{ opacity: techDiagOpacity, x: techDiagX }}
            className="absolute left-[5%] md:left-[8%] top-[14%] bottom-[14%] w-[90vw] md:w-[45vw] z-20 flex flex-col justify-center gap-4 pointer-events-none overflow-y-auto"
          >
            <h2 className="font-display text-white text-2xl md:text-3xl font-black uppercase tracking-widest border-b border-[#E7BB55]/20 pb-2 mb-2 flex items-center gap-2">
              <ChipIcon className="w-5 h-5 text-[#E7BB55]" />
              TECHNICAL <span className="text-[#E7BB55]">ARCHITECTURE</span>
            </h2>

            {/* Subsystem 1: Master Control */}
            <div className="bg-[#050507]/90 border-l-2 border-[#E7BB55] border-y border-r border-[#E7BB55]/15 rounded-lg p-4 backdrop-blur-md flex flex-col justify-between gap-3 shadow-[0_0_15px_rgba(231,187,85,0.02)]">
              <div>
                <h3 className="font-display text-white text-xs font-bold uppercase tracking-wider flex justify-between items-center mb-1">
                  <span>01 // Master MCU Controller</span>
                  <span className="text-[#E7BB55] text-[9px] font-mono">[ESP32-S3 CORE]</span>
                </h3>
                <p className="font-modern text-[11px] text-zinc-400 leading-normal">
                  Powered by an ESP32-S3 microcontroller. Triggers alerts by button press, pre-registered smart sensor links, or voice recognition. A resident can say <strong className="text-white font-semibold">"Help me"</strong> to alert neighbors, hospitals, and police. Yelling <strong className="text-white font-semibold">"Cancel"</strong> instantly stops the sequence if triggered by mistake.
                </p>
              </div>
              <div className="mt-1">
                <SoundwaveVisualizer />
              </div>
            </div>

            {/* Subsystem 2: Escalation Engine */}
            <div className="bg-[#050507]/90 border-l-2 border-[#E7BB55] border-y border-r border-[#E7BB55]/15 rounded-lg p-4 backdrop-blur-md flex flex-col justify-between gap-3 shadow-[0_0_15px_rgba(231,187,85,0.02)]">
              <div>
                <h3 className="font-display text-white text-xs font-bold uppercase tracking-wider flex justify-between items-center mb-1">
                  <span>02 // COMMUNITY ESCALATION PIPELINE</span>
                  <span className="text-[#E7BB55] text-[9px] font-mono">[60S FALSE_ALARM_DELAY]</span>
                </h3>
                <p className="font-modern text-[11px] text-zinc-400 leading-normal">
                  Alerts notify the local security guard or caretaker immediately, giving them a <strong className="text-white font-semibold">60-second window</strong> to cancel. If uncancelled, the system escalates by sending automated voice calls and SMS alerts to external responders containing flat details, exact location coordinates, and medical history.
                </p>
              </div>
              <div className="mt-1">
                <CountdownVisualizer />
              </div>
            </div>

            {/* Subsystem 3: Fall Detection Node */}
            <div className="bg-[#050507]/90 border-l-2 border-[#E7BB55] border-y border-r border-[#E7BB55]/15 rounded-lg p-4 backdrop-blur-md flex flex-col justify-between gap-3 shadow-[0_0_15px_rgba(231,187,85,0.02)]">
              <div>
                <h3 className="font-display text-white text-xs font-bold uppercase tracking-wider flex justify-between items-center mb-1">
                  <span>03 // MM-WAVE RADAR AUXILIARY UNIT</span>
                  <span className="text-[#E7BB55] text-[9px] font-mono">[ESP32-C3 RADAR]</span>
                </h3>
                <p className="font-modern text-[11px] text-zinc-400 leading-normal">
                  Includes a secondary fall-detection module built on an ESP32-C3 microcontroller. Integrates an <strong className="text-white font-semibold">LD2420 mmWave radar sensor</strong> and vibration sensor to auto-detect sudden falls, communicating with the main node via secure RF transmission so help is called even if the resident is incapacitated.
                </p>
              </div>
              <div className="mt-1">
                <RadarVisualizer />
              </div>
            </div>
          </motion.div>


          {/* --- STAGE 3: HEADER --- */}
          <motion.div 
            style={{ opacity: featuresHeaderOpacity }}
            className="absolute top-[12%] w-full z-20 text-center pointer-events-none"
          >
            <h2 className="font-display text-white text-4xl md:text-6xl font-black uppercase tracking-widest">
              Features of <span className="text-[#E7BB55]">E.L.S.A</span>
            </h2>
          </motion.div>


          {/* --- STAGE 4: ROTATING FEATURES --- */}
          {features.map((feature, index) => {
             const totalItems = features.length;
             const angleStep = 360 / totalItems;
             const targetAngleBase = 270; // Top
             
             // Calculate final slot
             const finalAngle = targetAngleBase + (index * angleStep);

             return (
               <FeatureOrb
                 key={index}
                 feature={feature}
                 index={index}
                 scrollProgress={smoothProgress}
                 finalAngle={finalAngle}
                 stayVisibleUntil={0.95} 
               />
             );
          })}

          {/* --- STAGE 5: CTA BUTTONS (END OF PAGE) --- */}
          <motion.div 
            style={{ 
              opacity: buttonsOpacity, 
              y: buttonsYPos,
              display: buttonsDisplay
            }}
            className="absolute bottom-[10%] md:bottom-[15%] z-50 flex-col sm:flex-row gap-4 justify-center w-full px-4"
          >
              <Button 
                size="lg" 
                className="text-sm font-display font-bold uppercase tracking-wider bg-[#E7BB55] text-black hover:bg-black hover:text-[#E7BB55] hover:border hover:border-[#E7BB55]/40 px-8 transition-transform duration-300 ease-in-out hover:scale-105 rounded shadow-[0_0_20px_rgba(231,187,85,0.2)]" 
                asChild
              >
                <Link to="/product-inspect"> 
                  Inspect the Product <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="text-sm font-display font-bold uppercase tracking-wider bg-transparent border-[#E7BB55] text-[#E7BB55] hover:bg-[#E7BB55]/10 px-8 transition-transform duration-300 ease-in-out hover:scale-105 rounded" 
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
          </motion.div>


          {/* --- SCROLL INDICATOR --- */}
          <motion.div 
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50 pointer-events-none"
          >
            <span className="font-display text-[#E7BB55] text-xs font-bold tracking-[0.2em] uppercase opacity-80 animate-pulse">
              Scroll to Discover
            </span>
            <div className="w-[30px] h-[50px] border-2 border-[#E7BB55]/40 rounded-full flex justify-center p-2 opacity-85">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[#E7BB55] rounded-full"
              />
            </div>
          </motion.div>

        </div>

        </div>{/* END SHOWCASE SCROLL WRAPPER */}


        {/* ================================================================ */}
        {/* ======= TECHNICAL DEEP-DIVE SECTION (BELOW STICKY SHOWCASE) ===== */}
        {/* ================================================================ */}
        <div className="relative z-20 bg-[#020203] border-t border-[#E7BB55]/10">

          {/* Radar Point Cloud Background Canvas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <RadarPointCloudCanvas />
          </div>

          {/* Decorative Grid Mesh Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5505_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5505_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E7BB55]/50" />
                <ChipIcon className="w-5 h-5 text-[#E7BB55]" />
                <span className="font-mono text-[10px] text-[#E7BB55] uppercase tracking-[0.35em]">System Architecture</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E7BB55]/50" />
              </div>
              <h2 className="font-display text-white text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider leading-none">
                Under the <span className="text-[#E7BB55]">Hood</span>
              </h2>
              <p className="font-modern text-zinc-500 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                A dual-microcontroller emergency response system engineered for zero-latency activation, autonomous fall detection, and multi-tier community escalation.
              </p>
            </motion.div>


            {/* --- SUBSYSTEM GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">

              {/* Subsystem 1: ESP32-S3 Voice Controller */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#050507]/80 border border-[#E7BB55]/10 rounded-2xl p-8 md:p-10 backdrop-blur-md shadow-[0_0_40px_rgba(231,187,85,0.03)] relative overflow-hidden group"
              >
                {/* Top-left gold accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E7BB55] via-[#E7BB55]/30 to-transparent" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#E7BB55]/10 border border-[#E7BB55]/20 rounded-lg">
                    <Mic className="w-5 h-5 text-[#E7BB55]" />
                  </div>
                  <div>
                    <h3 className="font-display text-white text-xl md:text-2xl font-bold uppercase tracking-wide">ESP32-S3 Voice Controller</h3>
                    <span className="font-mono text-[9px] text-[#E7BB55]/70 tracking-widest">CENTRAL ALERT HUB // MASTER NODE</span>
                  </div>
                </div>

                <p className="font-modern text-zinc-300 text-sm md:text-base leading-relaxed mb-5">
                  The primary brain of E.L.S.A runs on an <strong className="text-white font-semibold">ESP32-S3 microcontroller</strong> with an embedded neural network voice engine. Residents can trigger alerts through three independent pathways:
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                    <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Voice Command</strong> — Say <span className="font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded text-xs">"Help me"</span> to instantly alert nearby caretakers, hospitals, and police. Say <span className="font-mono text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded text-xs">"Cancel"</span> to stop a false alarm.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                    <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Physical Button</strong> — A hardware interrupt on GPIO pin 4 triggers an immediate alert sequence with debounce protection.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                    <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">RF Sensor Link</strong> — Receives fall-detection payloads from the secondary ESP32-C3 radar node via a 433MHz RF receiver.
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <SoundwaveVisualizer />
                </div>
              </motion.div>


              {/* Subsystem 2: Escalation Pipeline */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="bg-[#050507]/80 border border-[#E7BB55]/10 rounded-2xl p-8 md:p-10 backdrop-blur-md shadow-[0_0_40px_rgba(231,187,85,0.03)] relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E7BB55] via-[#E7BB55]/30 to-transparent" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#E7BB55]/10 border border-[#E7BB55]/20 rounded-lg">
                    <Clock className="w-5 h-5 text-[#E7BB55]" />
                  </div>
                  <div>
                    <h3 className="font-display text-white text-xl md:text-2xl font-bold uppercase tracking-wide">Community Escalation Pipeline</h3>
                    <span className="font-mono text-[9px] text-[#E7BB55]/70 tracking-widest">60-SECOND FALSE ALARM BUFFER</span>
                  </div>
                </div>

                <p className="font-modern text-zinc-300 text-sm md:text-base leading-relaxed mb-5">
                  Once an alert is triggered, the system immediately notifies the local <strong className="text-white font-semibold">caretaker or security guard</strong> and gives them a <strong className="text-white font-semibold">60-second window</strong> to cancel in case it was a false alarm.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                    <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Automated Calls & SMS</strong> — If uncancelled after 60 seconds, the system sends automated voice calls and SMS alerts to external responders.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                    <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Data-Enriched Payloads</strong> — Notifications include the resident's flat number, exact GPS coordinates, and pre-registered medical history, helping responders prepare before arrival.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                    <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Cloud API Escalation</strong> — Final payload is forwarded via WiFi/GSM to the PluggedIn Safety Cloud endpoint for logging and multi-channel dispatch.
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <CountdownVisualizer />
                </div>
              </motion.div>


              {/* Subsystem 3: mmWave Radar Fall Detection (Full Width) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-2 bg-[#050507]/80 border border-[#E7BB55]/10 rounded-2xl p-8 md:p-10 backdrop-blur-md shadow-[0_0_40px_rgba(231,187,85,0.03)] relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E7BB55]/40 to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 bg-[#E7BB55]/10 border border-[#E7BB55]/20 rounded-lg">
                        <Radio className="w-5 h-5 text-[#E7BB55]" />
                      </div>
                      <div>
                        <h3 className="font-display text-white text-xl md:text-2xl font-bold uppercase tracking-wide">ESP32-C3 mmWave Radar Node</h3>
                        <span className="font-mono text-[9px] text-[#E7BB55]/70 tracking-widest">AUXILIARY FALL DETECTION UNIT</span>
                      </div>
                    </div>

                    <p className="font-modern text-zinc-300 text-sm md:text-base leading-relaxed mb-5">
                      A secondary module built on an <strong className="text-white font-semibold">ESP32-C3 microcontroller</strong> integrates an <strong className="text-white font-semibold">LD2420 24GHz mmWave radar sensor</strong> and a vibration sensor to automatically detect sudden falls — even when the resident is incapacitated and cannot press a button or speak.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                        <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                          <strong className="text-white font-semibold">Vibration Impact Detection</strong> — A hardware interrupt on the vibration sensor catches high-G impact events characteristic of a fall.
                        </p>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                        <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                          <strong className="text-white font-semibold">Radar Verification</strong> — After a 1.5-second settling period, the mmWave radar confirms a static target presence below the 0.5m height threshold, eliminating false positives from dropped objects.
                        </p>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 border border-zinc-800 rounded-lg p-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] mt-2 shrink-0" />
                        <p className="font-modern text-zinc-400 text-sm leading-relaxed">
                          <strong className="text-white font-semibold">433MHz RF Transmission</strong> — Confirmed fall events are transmitted wirelessly to the main ESP32-S3 hub via a secure RF link, ensuring help is called even if WiFi is unavailable.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <RadarVisualizer />
                    <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-xs">
                      <div className="bg-black/60 border border-zinc-800 rounded-lg p-3 text-center">
                        <div className="font-mono text-[#E7BB55] text-lg font-bold">24.15</div>
                        <div className="font-mono text-zinc-500 text-[9px] uppercase tracking-wider">GHz Frequency</div>
                      </div>
                      <div className="bg-black/60 border border-zinc-800 rounded-lg p-3 text-center">
                        <div className="font-mono text-[#E7BB55] text-lg font-bold">433</div>
                        <div className="font-mono text-zinc-500 text-[9px] uppercase tracking-wider">MHz RF Link</div>
                      </div>
                      <div className="bg-black/60 border border-zinc-800 rounded-lg p-3 text-center">
                        <div className="font-mono text-[#E7BB55] text-lg font-bold">&lt;1.5s</div>
                        <div className="font-mono text-zinc-500 text-[9px] uppercase tracking-wider">Detection Latency</div>
                      </div>
                      <div className="bg-black/60 border border-zinc-800 rounded-lg p-3 text-center">
                        <div className="font-mono text-[#E7BB55] text-lg font-bold">0.5m</div>
                        <div className="font-mono text-zinc-500 text-[9px] uppercase tracking-wider">Height Threshold</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>




            {/* --- BOTTOM CTA --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Button 
                size="lg" 
                className="text-sm font-display font-bold uppercase tracking-wider bg-[#E7BB55] text-black hover:bg-black hover:text-[#E7BB55] hover:border hover:border-[#E7BB55]/40 px-10 py-6 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg shadow-[0_0_30px_rgba(231,187,85,0.2)]" 
                asChild
              >
                <Link to="/product-inspect">
                  Inspect the Product in 3D <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

          </div>
        </div>

      </div>
    </AnimatedPage>
  );
};

// --- SUB-COMPONENT FOR ORBITING FEATURES WITH CONNECTION LINES ---
const FeatureOrb = ({ 
  feature, 
  index,
  scrollProgress, 
  finalAngle,
  stayVisibleUntil
}: { 
  feature: any, 
  index: number,
  scrollProgress: MotionValue<number>,
  finalAngle: number,
  stayVisibleUntil: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const animStart = 0.50; // Delay orbit start until after technical diagnostics slide has concluded
  const animEnd = 0.90;
  
  // Stagger entry
  const entryDelay = 0.05 * index; 
  const myStart = animStart + entryDelay;
  
  // 1. Opacity (driven by scroll range fadeout)
  const opacity = useTransform(scrollProgress, 
    [myStart, myStart + 0.05, stayVisibleUntil, stayVisibleUntil + 0.05], 
    [0, 1, 1, 0]
  );

  // 2. Angle Interpolation
  const currentAngle = useTransform(scrollProgress,
    [myStart, animEnd], 
    [90, finalAngle] 
  );

  // 3. Radius Configuration
  const radiusX = 38; // vmin
  const radiusY = 27; // vmin

  // Math: Convert Polar to Cartesian
  const x = useTransform(currentAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return `${Math.cos(rad) * radiusX}vmin`; 
  });
  
  const y = useTransform(currentAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return `${Math.sin(rad) * radiusY}vmin`; 
  });

  // Calculate negative vectors back to the absolute center of E.L.S.A
  const negX = useTransform(x, (v) => `-${v}`);
  const negY = useTransform(y, (v) => `-${v}`);

  return (
    <motion.div 
      style={{ x, y, opacity }}
      className="absolute top-1/2 left-[43%] -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Connecting Line */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible z-[-1] pointer-events-none">
        <svg className="overflow-visible w-0 h-0">
          <motion.line
            x1="0"
            y1="0"
            x2={negX}
            y2={negY}
            stroke="#E7BB55"
            strokeWidth={isHovered ? 2.5 : 1}
            strokeOpacity={isHovered ? 0.95 : 0.45}
            strokeDasharray={isHovered ? "none" : "6, 6"}
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
          />
        </svg>
      </div>

      <motion.div 
        className="
          w-[160px] md:w-[200px] 
          bg-black/90 backdrop-blur-md border border-[#E7BB55]/20 
          rounded-xl p-3.5 shadow-[0_0_15px_rgba(231,187,85,0.05)] cursor-default
          flex flex-col items-center text-center transition-all duration-300
        "
        whileHover={{ 
          scale: 1.1, 
          zIndex: 50,
          boxShadow: "0 0 25px rgba(231, 187, 85, 0.25)",
          borderColor: "rgba(231, 187, 85, 0.6)"
        }}
      >
        <div className="p-2 bg-[#E7BB55]/10 border border-[#E7BB55]/20 rounded-full mb-1 text-[#E7BB55] transition-colors duration-300">
          {feature.icon}
        </div>
        <h3 className="font-display text-[#E7BB55] text-sm font-bold leading-tight mb-1">
          {feature.title}
        </h3>
        <p className="text-zinc-400 text-[10px] md:text-xs leading-tight font-sans line-clamp-2">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ELSA;
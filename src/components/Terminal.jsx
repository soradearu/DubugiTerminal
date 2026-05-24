import { useState } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("matrix");

  const themes = {
    matrix: {
      bg: "#050607",
      panel: "#070a0c",
      border: "#0f2a22",
      primary: "#00ff99",
      secondary: "#66ffcc",
      input: "#ffffff",
    },

    noir: {
      bg: "#0f0f12",
      panel: "#17171c",
      border: "#2a2a35",
      primary: "#c792ea",
      secondary: "#e6d5ff",
      input: "#ffffff",
    },

    forensic: {
      bg: "#071018",
      panel: "#0b1722",
      border: "#163041",
      primary: "#4fd1ff",
      secondary: "#b8ecff",
      input: "#ffffff",
    },

    alert: {
      bg: "#140909",
      panel: "#1f1111",
      border: "#522020",
      primary: "#ff4d4d",
      secondary: "#ffb3b3",
      input: "#ffffff",
    },
  };

  const currentTheme = themes[theme];

  const [logs, setLogs] = useState([
    {
      type: "system",
      text: "CYBER DETECTIVE DATABASE ONLINE // ACCESS GRANTED",
    },
    {
      type: "system",
      text: "Type 'help' to view available investigation commands.",
    },
  ]);

  const asciiHeader = `
██████╗ ██╗   ██╗██████╗ ██╗   ██╗ ██████╗ ██╗
██╔══██╗██║   ██║██╔══██╗██║   ██║██╔════╝ ██║
██║  ██║██║   ██║██████╔╝██║   ██║██║  ███╗██║
██║  ██║██║   ██║██╔══██╗██║   ██║██║   ██║██║
██████╔╝╚██████╔╝██████╔╝╚██████╔╝╚██████╔╝██║
╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝
      CYBER DETECTIVE DATABASE
`;

  const generatePacketCapture = () => {
    const protocols = ["TCP", "HTTPS", "TLS", "DNS", "SSH"];
    const ips = [
      "192.168.1.7",
      "10.0.0.5",
      "45.33.32.156",
      "91.214.124.88",
      "185.220.101.4",
      "104.21.44.12",
      "172.67.2.91",
    ];

    let output = `
PACKET CAPTURE ACTIVE
────────────────────────────────────────────────────────────

TIME        SRC IP          DEST IP         PROTOCOL   SIZE
`;

    for (let i = 0; i < 10; i++) {
      const src = ips[Math.floor(Math.random() * ips.length)];
      const dest = ips[Math.floor(Math.random() * ips.length)];
      const protocol =
        protocols[Math.floor(Math.random() * protocols.length)];

      const size = Math.floor(Math.random() * 2000) + "B";

      output += `
03:41:${10 + i}    ${src.padEnd(15)} ${dest.padEnd(
        15
      )} ${protocol.padEnd(8)} ${size}
`;
    }

    output += `

ANALYSIS:
- abnormal encrypted traffic detected
- possible proxy relay identified
- suspicious SSH handshake intercepted
- packet inspection recommended

STATUS: LIVE MONITORING...
`;

    return output;
  };

  const generatePortScan = () => {
    return `
PORT SCAN RESULTS
────────────────────────

PORT     STATUS      SERVICE
22       OPEN        SSH
53       OPEN        DNS
80       OPEN        HTTP
443      OPEN        HTTPS
3306     FILTERED    MYSQL
8080     CLOSED      HTTP-ALT

ANALYSIS:
- exposed SSH service detected
- possible reverse proxy configured
- recommend firewall inspection
`;
  };

  const generateTrace = () => {
    return `
TRACE ROUTE INITIATED
────────────────────────

HOP 1   192.168.1.1
HOP 2   10.10.0.1
HOP 3   172.67.2.91
HOP 4   185.220.101.4

WARNING:
TOR EXIT NODE DETECTED
LOCATION MASKING ACTIVE
TRACE CONFIDENCE: LOW
`;
  };

  const handleCommand = (cmd) => {
    let response = "";

    const command = cmd.toLowerCase().trim();

    switch (command) {
      case "help":
        response = `
COMMANDS:
────────────────────────

GENERAL
- help
- clear
- profile
- cases
- evidence

THEMES
- themes
- theme matrix
- theme noir
- theme forensic
- theme alert

NETWORK ANALYSIS
- pcap
- packet
- capture traffic
- scan ports
- trace ip

        `;
        break;

      case "cases":
        response = `
ACTIVE CASE FILES
────────────────────────

[CASE-014] Phantom Data Leak
STATUS: ACTIVE

[CASE-021] Black Market Identity Ring
STATUS: UNDER REVIEW

[CASE-033] Ghost Login Intrusion
STATUS: HIGH PRIORITY
        `;
        break;

      case "profile":
        response = `
AGENT PROFILE
────────────────────────

AGENT ID: Dubugi-07
CLEARANCE: LEVEL 4
SPECIALTY: Behavioral Cyber Forensics
ROLE: SOC Analyst

STATUS: ACTIVE
        `;
        break;

      case "evidence":
        response = `
EVIDENCE LOG
────────────────────────

- encrypted packet cluster recovered
- suspicious outbound connection
- unauthorized SSH handshake detected
- dark-web credential leak linked
        `;
        break;

      case "themes":
      case "theme":
        response = `
AVAILABLE THEMES
────────────────────────

- matrix
- noir
- forensic
- alert

USAGE:
theme matrix
theme noir
theme forensic
theme alert
        `;
        break;

      case "theme matrix":
        setTheme("matrix");
        response = "THEME UPDATED → MATRIX";
        break;

      case "theme noir":
        setTheme("noir");
        response = "THEME UPDATED → NOIR";
        break;

      case "theme forensic":
        setTheme("forensic");
        response = "THEME UPDATED → FORENSIC";
        break;

      case "theme alert":
        setTheme("alert");
        response = "WARNING: ALERT MODE ENABLED";
        break;

      case "pcap":
      case "packet":
      case "capture traffic":
        response = generatePacketCapture();
        break;

      case "scan ports":
        response = generatePortScan();
        break;

      case "trace ip":
        response = generateTrace();
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        response = `
UNKNOWN COMMAND: ${cmd}

Type 'help' for available commands.
        `;
    }

    setLogs((prev) => [
      ...prev,
      { type: "input", text: `> ${cmd}` },
      { type: "output", text: response },
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    handleCommand(input.trim());

    setInput("");
  };

  return (
    <div
      style={{
        backgroundColor: currentTheme.bg,
        height: "100vh",
        color: currentTheme.primary,
        fontFamily: "monospace",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
      }}
    >
      <pre
        style={{
          color: currentTheme.secondary,
          fontSize: "12px",
          lineHeight: "12px",
          marginBottom: "20px",
          textShadow: `0 0 10px ${currentTheme.primary}`,
        }}
      >
        {asciiHeader}
      </pre>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: `1px solid ${currentTheme.border}`,
          padding: "15px",
          backgroundColor: currentTheme.panel,
          boxShadow: `0 0 20px ${currentTheme.border}`,
        }}
      >
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "10px",
              lineHeight: "1.5",
              color:
                log.type === "system"
                  ? currentTheme.secondary
                  : log.type === "input"
                  ? currentTheme.input
                  : currentTheme.primary,
            }}
          >
            {log.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          borderTop: `1px solid ${currentTheme.border}`,
          paddingTop: "12px",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            color: currentTheme.secondary,
            marginRight: "10px",
            textShadow: `0 0 10px ${currentTheme.primary}`,
          }}
        >
          detectivedubu7@case-db:~$
        </span>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: currentTheme.primary,
            fontSize: "14px",
            fontFamily: "monospace",
          }}
        />
      </form>
    </div>
  );
}
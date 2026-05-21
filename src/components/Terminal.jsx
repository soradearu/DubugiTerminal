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

const handleCommand = (cmd) => {
  let response = "";

  const command = cmd.toLowerCase().trim();

  switch (command) {
    case "help":
      response = `
COMMANDS:
- cases
- profile
- evidence
- themes
- theme [name]
- clear
        `;
      break;

    case "cases":
      response = `
ACTIVE CASE FILES:

[CASE-014] Phantom Data Leak
[CASE-021] Black Market Identity Ring
[CASE-033] Ghost Login Intrusion
        `;
      break;

    case "profile":
      response = `
AGENT ID: Dubugi-07
CLEARANCE: LEVEL 4
SPECIALTY: Behavioral Cyber Forensics / SOC Analyst
STATUS: ACTIVE INVESTIGATION UNIT
        `;
      break;

    case "evidence":
      response = `
EVIDENCE LOG:

- encrypted packet cluster recovered
- suspicious proxy chain detected
- dark-web credential trace identified
        `;
      break;

    case "themes":
    case "theme":
      response = `
AVAILABLE THEMES:

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
      response = "Theme switched to MATRIX mode.";
      break;

    case "theme noir":
      setTheme("noir");
      response = "Theme switched to NOIR mode.";
      break;

    case "theme forensic":
      setTheme("forensic");
      response = "Theme switched to FORENSIC mode.";
      break;

    case "theme alert":
      setTheme("alert");
      response = "WARNING: ALERT MODE ENABLED.";
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
        }}
      >
        {asciiHeader}
      </pre>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: `1px solid ${currentTheme.border}`,
          padding: "10px",
          backgroundColor: currentTheme.panel,
        }}
      >
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              whiteSpace: "pre-wrap",
              marginBottom: "6px",
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
          paddingTop: "10px",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            color: currentTheme.secondary,
            marginRight: "10px",
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
          }}
        />
      </form>
    </div>
  );
}
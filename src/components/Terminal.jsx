import { useState } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");
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

    switch (cmd.toLowerCase()) {
      case "help":
        response =
          "COMMANDS:\n- cases (list active investigations)\n- profile (agent file)\n- evidence (latest findings)\n- clear (wipe terminal)";
        break;

      case "cases":
        response =
          "ACTIVE CASE FILES:\n[CASE-014] ...\n[CASE-021] ...\n[CASE-033] ...";
        break;

      case "profile":
        response =
          "AGENT ID: Dubugi-07\nCLEARANCE: LEVEL 4\nSPECIALTY: Behavioral Cyber Forensics / SOC Analyst\nSTATUS: ACTIVE INVESTIGATION UNIT";
        break;

      case "evidence":
        response =
          "EVIDENCE LOG:\n- ...\n- ...\n- ...";
        break;

      case "clear":
        setLogs([]);
        return;

      default:
        response = `Unknown command: ${cmd}. Type 'help' for guidance.`;
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
    <div style={styles.wrapper}>
      <pre style={styles.header}>{asciiHeader}</pre>

      <div style={styles.panel}>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              ...styles.line,
              color:
                log.type === "system"
                  ? "#66ffcc"
                  : log.type === "input"
                  ? "#ffffff"
                  : "#00ff99",
            }}
          >
            {log.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} style={styles.inputBar}>
        <span style={styles.prompt}>detectivedubu7@case-db:~$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          autoFocus
        />
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#050607",
    height: "100vh",
    color: "#00ff99",
    fontFamily: "monospace",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    color: "#66ffcc",
    fontSize: "12px",
    lineHeight: "12px",
    marginBottom: "20px",
  },
  panel: {
    flex: 1,
    overflowY: "auto",
    border: "1px solid #0f2a22",
    padding: "10px",
    backgroundColor: "#070a0c",
  },
  line: {
    whiteSpace: "pre-wrap",
    marginBottom: "6px",
  },
  inputBar: {
    display: "flex",
    borderTop: "1px solid #0f2a22",
    paddingTop: "10px",
    marginTop: "10px",
  },
  prompt: {
    color: "#66ffcc",
    marginRight: "10px",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#00ff99",
    fontSize: "14px",
  },
};
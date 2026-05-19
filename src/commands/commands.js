const commands = {
  help: {
    output: `Available commands:

whoami
skills
contact
socials
theme
clear
help

There may or may not be some easter eggs within the project, hope you don't find'em...`,

  },

  whoami: {
    output: `Dubugi
━━━━━━━━━━━━━━━━━━━━━
SOC Analyst
Musician`,
  },

  skills: {
    output: `Python
Linux
...`,
  },

  contact: {
    output: `Email: ...@gmail.com`,
  },

  socials: {
    output: ``,
  },

  sudo: {
    output: `[sudo] password for guest:

Permission denied.`,
  },
  theme: {
  output: `Available themes:

green
blue
red
amber
pink
white


Usage:
theme <colour>`,
},
}

export default commands
<p align="center">
    <img src="./client/src/assets/logo.png" align="center" width="30%">
</p>
<p align="center"><h1 align="center">JUSTPROMPT.AI X INFORMATICA</h1></p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/mahsook3/JustPrompt.ai-x-Informatica?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/mahsook3/JustPrompt.ai-x-Informatica?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/mahsook3/JustPrompt.ai-x-Informatica?style=default&color=0080ff" alt="repo-language-count">
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

## JustPrompt

**JustPrompt** is an AI-powered platform designed to simplify cross-border trade for SMEs (Small and Medium-sized Enterprises). It provides comprehensive compliance guidance and various features to help SMEs overcome challenges in entering global markets.

---

## Challenges Faced by MSMEs

MSMEs encounter several obstacles when trying to expand globally, including:

- **Complex cross-border regulations**
- **Difficulty accessing government incentives**
- **High costs for building an online presence**
- **Expensive compliance with international standards**
- **Limited access to market research tools**

---

## Features of JustPrompt

JustPrompt tackles these challenges with the following features:

1. **Cross-Border Regulatory Compliance** - Simplifies understanding and adherence to complex trade regulations.
2. **Comprehensive Market Research** - Provides SMEs with detailed market insights for informed decision-making.
3. **GenAI-Powered Document Generation** - Uses AI to automate necessary trade documentation.
4. **Pre-built Templates for Online Presence** - Offers ready-to-use templates for quick online business setup.

---

## Project Structure

The project is organized into two main directories: `client` and `server`.

### Client

The `client` directory houses the frontend code of the JustPrompt platform.

```plaintext
client/
 ├── .catalystrc
 ├── .gitignore
 ├── catalyst.json
 ├── package.json
 ├── postcss.config.js
 ├── README.md
 ├── tailwind.config.js
 ├── public/
 │   ├── favicon.ico
 │   ├── index.html
 │   ├── logo192.png
 │   ├── logo512.png
 │   ├── manifest.json
 │   ├── robots.txt
 ├── src/
 │   ├── App.css
 │   ├── App.js
 │   ├── App.test.js
 │   ├── Chatbot.js
 │   ├── cleaned_components.json
 │   ├── codebase.json
 │   ├── ...
```

###  Server

The `server` directory contains the backend code of JustPrompt.

```plaintext
server/
 ├── .catalystrc
 ├── app-config.json
 ├── catalyst-debug.log
 ├── catalyst.json
 ├── generate-billoflading.js
 ├── generate-responses.js
 ├── get-embeddings.js
 ├── index.js
 ├── package.json
 ├── README.md
 ├── models/
 │   ├── ...
```

---

## Getting Started

Follow these steps to set up the project:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/JustPrompt.git
   ```
2. **Navigate to the `client` directory and install dependencies:**
   ```sh
   cd client && npm install
   ```
3. **Navigate to the `server` directory and install dependencies:**
   ```sh
   cd ../server && npm install
   ```
4. **Start the development servers:**
   ```sh
   npm start
   ```

---

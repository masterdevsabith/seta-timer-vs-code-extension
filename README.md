# Seta Productivity Timer

A simple yet powerful productivity timer for VS Code.  
Switch between popular productivity methods or define your own custom work/break cycle — all directly inside the editor.

---

## ✨ Features

- **Multiple Productivity Methods Built-in**

  - **Pomodoro**: 25 minutes focus + 5 minutes break
  - **Flowtime**: 50 minutes work + 10 minutes break
  - **52/17 Rule**: 52 minutes work + 17 minutes break
  - **Ultradian Rhythm**: 90 minutes deep work + 20 minutes rest
  - **Test Timer**: 1 minute work + 1 minute break (for quick testing)

- **Custom Method**

  - Input your own work and break durations (in minutes).
  - The timer continues cycling **work → break → work → break** until you manually stop it.

- **Status Bar Integration**

  - Live countdown of work or break sessions.
  - Different colors for work and break states.

- **Notifications**

  - Alerts when a work session finishes.
  - Alerts when a break finishes, reminding you to get back to work.

- **Commands**
  - `Seta Productivity Timer` → Start a new timer (choose method).
  - `Stop Productivity Timer` → Stop the running timer.

---

## 🚀 Installation

1. Open **Visual Studio Code**.
2. Go to **Extensions Marketplace** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **Seta Productivity Timer**.
4. Click **Install**.

---

## 📖 Usage

1. Open the **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run `Seta Productivity Timer`.
3. Select a productivity method from the list.
   - For **Custom**, enter your desired work and break durations in minutes.
4. The timer will appear in the **status bar** and start counting down.
5. To stop the timer at any time, run `Stop Productivity Timer`.

---

## 🛠️ Development (for contributors)

- Clone this repo
- Run `npm install`
- Press `F5` in VS Code to launch the extension in a new window
- Make changes and test
- To package the extension:
  ```bash
  vsce package
  ```

const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */

let isRunning = false;
let currentInterval = null;

function activate(context) {
  const productivity_methods = [
    {
      id: "pomodoro",
      title: "Pomodoro",
      description: "25 min focus + 5 min break",
      work: 25,
      break: 5,
    },
    {
      id: "flowtime",
      title: "Flowtime",
      description: "Custom session length + flexible break",
      work: 50,
      break: 10,
    },
    {
      id: "rule5217",
      title: "52/17 Rule",
      description: "52 min work + 17 min break",
      work: 52,
      break: 17,
    },
    {
      id: "ultradian",
      title: "Ultradian Rhythm",
      description: "90 min deep work + 20 min rest",
      work: 90,
      break: 20,
    },
    {
      id: "test-timer",
      title: "Test Timer",
      description: "Test timer with 1 min work + 1 min break",
      work: 1,
      break: 1,
    },
    {
      id: "custom",
      title: "Custom Timer",
      description: "Set your own work and break durations",
      work: null,
      break: null,
    },
  ];
  const mapped_productivity_method = productivity_methods.map((method) => {
    return {
      label: method.title,
      detail: method.description,
      method: method,
    };
  });

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = "seta-timer.SetaProductivityTimer";
  context.subscriptions.push(statusBarItem);

  const start_disposable = vscode.commands.registerCommand(
    "seta-timer.SetaProductivityTimer",
    async function () {
      const method = await vscode.window.showQuickPick(
        mapped_productivity_method,
        {
          matchOnDetail: true,
          placeHolder: "Choose a productivity method",
        }
      );
      let work_minutes = method.method.work;
      let break_minutes = method.method.break;
      let title = method.method.title;

      if (!method) return;

      isRunning = true;
      startTimer(work_minutes, break_minutes, title, statusBarItem);
    }
  );

  const stop_disposable = vscode.commands.registerCommand(
    "seta-timer.StopProductivityTimer",
    function () {
      isRunning = false;
      if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
      }
      vscode.window.showInformationMessage("Productivity timer stopped.");
      statusBarItem.hide();
    }
  );

  context.subscriptions.push(start_disposable, stop_disposable);
}

function startTimer(workmin, breakmin, title, statusBarItem) {
  let seconds = workmin * 60;
  statusBarItem.show();

  if (currentInterval) clearInterval(currentInterval);

  currentInterval = setInterval(() => {
    if (!isRunning) {
      clearInterval(currentInterval);
      return;
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    statusBarItem.color = "#f6ff00ff";
    statusBarItem.text = `$(clock) ${title}: ${mins}m ${secs}s`;

    if (seconds <= 0) {
      clearInterval(currentInterval);

      vscode.window.showInformationMessage(
        `${title} finished! Take a break for ${breakmin} minutes.`
      );

      if (isRunning) {
        startBreakTimer(workmin, breakmin, title, statusBarItem);
      } else {
        statusBarItem.hide();
      }
    }
    seconds--;
  }, 1000);
}

function startBreakTimer(workmin, breakmin, title, statusBarItem) {
  let seconds = breakmin * 60;
  statusBarItem.show();

  if (currentInterval) clearInterval(currentInterval);

  currentInterval = setInterval(() => {
    if (!isRunning) {
      clearInterval(currentInterval);
      return;
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    statusBarItem.color = "#1eff00ff";
    statusBarItem.text = `$(clock) ${title} break : ${mins}m ${secs}s`;

    if (seconds <= 0) {
      clearInterval(currentInterval);
      statusBarItem.text = `$(clock) ${title} break Finished!`;
      vscode.window.showInformationMessage(`Break over! Back to work.`);

      if (isRunning) {
        startTimer(workmin, breakmin, title, statusBarItem);
      } else {
        statusBarItem.hide();
      }
    }

    seconds--;
  }, 1000);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

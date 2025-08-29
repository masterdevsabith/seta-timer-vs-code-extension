const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
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

  //intialising status bar
  statusBarItem.command = "seta-timer.SetaProductivityTimer";
  context.subscriptions.push(statusBarItem);

  //testing status bar
  //   statusBarItem.text = "$(zap) Testing Seta-Timer";
  //   statusBarItem.show();

  const disposable = vscode.commands.registerCommand(
    "seta-timer.SetaProductivityTimer",
    async function () {
      const method = await vscode.window.showQuickPick(
        mapped_productivity_method,
        {
          matchOnDetail: true,
          placeHolder: "Choose a productivity method",
        }
      );

      if (!method) return;

      let work_minutes = method.method.work;
      let break_minutes = method.method.break;
      vscode.window.showInformationMessage("Hello World from seta-timer!");

      startTimer(
        work_minutes,
        break_minutes,
        method.method.title,
        statusBarItem
      );
    }
  );

  context.subscriptions.push(disposable);
}

function startTimer(workmin, breakmin, title, statusBarItem) {
  let seconds = workmin * 60;
  statusBarItem.show();
  console.log(`${title} technique has started, with ${workmin} minutes`);

  const interval = setInterval(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    statusBarItem.text = `$(clock) ${title}: ${mins}m ${secs}s`;

    if (seconds <= 0) {
      clearInterval(interval);
      statusBarItem.text = `$(clock) ${title} Done!`;
    }
    seconds--;
  }, 1000);
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

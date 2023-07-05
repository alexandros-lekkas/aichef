export function openConsole() {
    // Open a new window or tab
    const consoleWindow = window.open('', '_blank');
  
    // Override the console methods to redirect output to the new window/tab
    consoleWindow.console.log = function (message) {
      console.log(message); // Optional: Log the message to the browser console as well
      consoleWindow.console._stdout.push({ type: 'log', message: message });
      consoleWindow.console._updateOutput();
    };
  
    consoleWindow.console.error = function (message) {
      console.error(message); // Optional: Log the message to the browser console as well
      consoleWindow.console._stdout.push({ type: 'error', message: message });
      consoleWindow.console._updateOutput();
    };
  
    // Optional: Override other console methods (e.g., warn, info, etc.) following the same pattern
  
    // Store the output messages in an array
    consoleWindow.console._stdout = [];
  
    // Update the output in the new window/tab
    consoleWindow.console._updateOutput = function () {
      const outputDiv = consoleWindow.document.getElementById('console-output');
      outputDiv.innerHTML = consoleWindow.console._stdout
        .map((log) => `<div class="${log.type}">${log.message}</div>`)
        .join('');
    };
  
    // Optional: Customize the appearance of the console window/tab
    consoleWindow.document.body.innerHTML = `
      <div id="console-output"></div>
      <style>
        /* Add your custom styles here */
        .log { color: black; }
        .error { color: red; }
      </style>
    `;
  }
  
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as sqlFormatter from "sql-formatter";

const NAME = "py-inline-sql";

// Inline SQL Format
function sqlInlineFormat() {
  // The code you place here will be executed every time your command is executed

  // Display a message box to the user
  const editor = vscode.window.activeTextEditor;
  let cursorPosition = editor?.selection.start;
  let cursorPositione = editor?.selection.end;

  // @ts-ignore
  var wordRange = new vscode.Range(cursorPosition, cursorPositione);

  // let wordRange = editor.document.getWordRangeAtPosition(cursorPosition, cursorPositione);

  let seletedText = editor?.document.getText(wordRange) as string;

  let formattedText = sqlFormatter.format(seletedText, {
    keywordCase: "upper",
    language: "sql",
    tabWidth: 2,
  });

  const startWidth = cursorPosition?.character ?? 0;
  const spaceWidth = seletedText.search(/\S/);

  console.log("width:", startWidth, spaceWidth);
  console.log("textFormatted:\n", formattedText);

  let indentedText = indent(formattedText, startWidth + spaceWidth);
  if (seletedText.endsWith("\n")) {
    indentedText += "\n";
  }

  editor?.edit((editBuilder) => {
    editBuilder.replace(wordRange, indentedText);
  });
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, your extension "${NAME}" is now active!`);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    `${NAME}.sqlInlineFormat`,
    sqlInlineFormat
  );

  context.subscriptions.push(disposable);
}

function indent(text: string, width: number) {
  return text
    .split("\n")
    .map((item, i) => " ".repeat(width) + item)
    .join("\n");
}

// this method is called when your extension is deactivated
export function deactivate() {}

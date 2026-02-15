import * as vscode from 'vscode';
import { scanner } from './scanner';

export function activate(context: vscode.ExtensionContext) {
  console.log('Vive Coders Security extension is now active!');

  // Register scan file command
  const scanFileCommand = vscode.commands.registerCommand(
    'viveCodersSecurity.scanFile',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('No active editor');
        return;
      }

      const document = editor.document;
      const findings = await scanner.scanFile(document.fileName, document.getText());

      if (findings.length === 0) {
        vscode.window.showInformationMessage('No security issues found! ✅');
        return;
      }

      // Show diagnostics
      const diagnostics: vscode.Diagnostic[] = findings.map((finding) => {
        const line = document.lineAt(finding.line_number - 1);
        const range = new vscode.Range(
          finding.line_number - 1,
          0,
          finding.line_number - 1,
          line.text.length
        );

        const severity = getSeverity(finding.severity);
        const diagnostic = new vscode.Diagnostic(
          range,
          `${finding.title}: ${finding.description}`,
          severity
        );
        diagnostic.code = finding.rule_id;
        diagnostic.source = 'Vive Coders Security';
        return diagnostic;
      });

      const diagnosticCollection = vscode.languages.createDiagnosticCollection('viveCodersSecurity');
      diagnosticCollection.set(document.uri, diagnostics);

      vscode.window.showWarningMessage(
        `Found ${findings.length} security issue(s). Check the Problems panel.`
      );
    }
  );

  // Register scan workspace command
  const scanWorkspaceCommand = vscode.commands.registerCommand(
    'viveCodersSecurity.scanWorkspace',
    async () => {
      vscode.window.showInformationMessage('Scanning workspace...');
      // TODO: Implement workspace scanning
    }
  );

  // Auto-scan on save
  const config = vscode.workspace.getConfiguration('viveCodersSecurity');
  if (config.get('enableAutoScan', true)) {
    const onSave = vscode.workspace.onDidSaveTextDocument(async (document) => {
      if (scanner.shouldScanFile(document.fileName)) {
        const findings = await scanner.scanFile(document.fileName, document.getText());
        if (findings.length > 0) {
          vscode.window.showWarningMessage(
            `Found ${findings.length} security issue(s) in ${document.fileName}`
          );
        }
      }
    });

    context.subscriptions.push(onSave);
  }

  context.subscriptions.push(scanFileCommand, scanWorkspaceCommand);
}

function getSeverity(severity: string): vscode.DiagnosticSeverity {
  switch (severity) {
    case 'critical':
    case 'high':
      return vscode.DiagnosticSeverity.Error;
    case 'medium':
      return vscode.DiagnosticSeverity.Warning;
    case 'low':
    case 'info':
      return vscode.DiagnosticSeverity.Information;
    default:
      return vscode.DiagnosticSeverity.Warning;
  }
}

export function deactivate() {}












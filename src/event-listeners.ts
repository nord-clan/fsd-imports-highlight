import { updateDecorationsForAllVisibleEditors, updateDecorationsForUri } from './decorations';
import { $config, Global } from './extension';
import { TextDocumentSaveReason, window, workspace } from 'vscode';

/*
 * Update listener for when active editor changes.
 */
export function updateChangedActiveTextEditorListener(): void {
  Global.onDidChangeActiveTextEditor?.dispose();

  Global.onDidChangeActiveTextEditor = window.onDidChangeActiveTextEditor((textEditor) => {
    if ($config.onSave) {
      Global.lastSavedTimestamp = Date.now();
    }
    if (textEditor) {
      updateDecorationsForUri(textEditor.document.uri, textEditor);
    } else {
      //TODO smth
    }
  });
}

/*
 * Update listener for when visible editors change.
 */
export function updateChangeVisibleTextEditorsListener(): void {
  Global.onDidChangeVisibleTextEditors?.dispose();

  Global.onDidChangeVisibleTextEditors = window.onDidChangeVisibleTextEditors(
    updateDecorationsForAllVisibleEditors
  );
}

/*
 * Update listener for when user performs manual save.
 *
 * Editor `files.autoSave` is ignored.
 */
export function updateOnSaveListener(): void {
  Global.onDidSave?.dispose();

  if (!$config.onSave) {
    return;
  }
  Global.onDidSave = workspace.onWillSaveTextDocument((e) => {
    if (e.reason === TextDocumentSaveReason.Manual) {
      setTimeout(() => {
        updateDecorationsForUri(e.document.uri);
      }, 200);
      Global.lastSavedTimestamp = Date.now();
    }
  });
}

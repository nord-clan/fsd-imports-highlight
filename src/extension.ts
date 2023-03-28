import { registerAllCommands } from './commands';
import {
  updateChangedActiveTextEditorListener,
  updateChangeVisibleTextEditorsListener,
  updateOnSaveListener
} from './event-listeners';
import { Constants, TExtensionConfig } from './types';
import { ExtensionContext, workspace, Disposable } from 'vscode';

/*
 * All user settings.
 */
export let $config: TExtensionConfig;

/*
 * Global variables.
 */
export abstract class Global {
  static onDidChangeActiveTextEditor: Disposable | undefined;
  static onDidChangeVisibleTextEditors: Disposable | undefined;
  static onDidSave: Disposable | undefined;

  /*
   * Timestamp when last time user manually saved the document.
   * Used to determine if the save was recently (1s?) to show decorations.
   */
  static lastSavedTimestamp = Date.now() + 2000;
}

export function activate(context: ExtensionContext) {
  registerAllCommands(context);
  updateConfigAndEverything(context);
  updateConfigSubscription(context);
}

/*
 * - Update config
 * - Dispose everything
 * - Update everything
 */
function updateConfigAndEverything(context: ExtensionContext) {
  $config = workspace.getConfiguration().get(Constants.SettingsPrefix) as TExtensionConfig;

  disposeEverything();

  if ($config.enabled) {
    updateEverything(context);
  }
}

function updateConfigSubscription(context: ExtensionContext) {
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(Constants.SettingsPrefix)) {
        return;
      }
      updateConfigAndEverything(context);
    })
  );
}

/*
 * - Update all global variables
 * - Update all decoration styles
 * - Update decorations for all visible editors
 * - Update all event listeners
 */
export function updateEverything(context: ExtensionContext) {
  updateChangedActiveTextEditorListener();
  // updateChangeVisibleTextEditorsListener();
  updateOnSaveListener();
}

/*
 * Dispose all known disposables (except `onDidChangeConfiguration`).
 */
export function disposeEverything() {
  Global.onDidChangeVisibleTextEditors?.dispose();
  Global.onDidChangeActiveTextEditor?.dispose();
  Global.onDidSave?.dispose();
}

export function deactivate() {}

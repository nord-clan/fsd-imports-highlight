import { $config } from './extension';
import { updateGlobalSetting } from './settings';
import { CommandId, Constants } from './types';
import { commands, ExtensionContext } from 'vscode';

/*
 * Register all commands contributed by this extension.
 */
export function registerAllCommands(extensionContext: ExtensionContext) {
  const disposableToggleActive = commands.registerCommand(CommandId.toggle, () => {
    updateGlobalSetting(`${Constants.SettingsPrefix}.enabled`, !$config.enabled);
  });

  extensionContext.subscriptions.push(disposableToggleActive);
}

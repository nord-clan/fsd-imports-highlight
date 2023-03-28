import { ConfigurationTarget, workspace, window } from 'vscode';

/*
 * Update global settings.json file with the new settign value.
 */
export function updateGlobalSetting(settingId: string, newValue: unknown): void {
  window.showInformationMessage(`${settingId} - ${newValue}`);
  const config = workspace.getConfiguration();
  config.update(settingId, newValue, ConfigurationTarget.Global);
}

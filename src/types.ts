import { Diagnostic, Range } from 'vscode';

interface ILayer {
  color: string;
  backgroundColor: string;
  border: string;
  folders: string[];
}

interface IExtensionConfigType {
  enabled: boolean;
  onSave: boolean;
  onSaveTimeout: number;
  layers: Record<string, ILayer>;
}

export type TExtensionConfig = Readonly<IExtensionConfigType>;

export interface IAggregatedByLineDiagnostics {
  [lineNumber: string]: Diagnostic[];
}

export interface IRangeDecorator {
  range: Range;
  contentText: string;
  layer: ILayer;
}

/*
 * All command ids contributed by this extensions.
 */
export const enum CommandId {
  toggle = 'fsd-imports-highlight.toggle'
}

export const enum Constants {
  SettingsPrefix = 'fsd-imports-highlight'
}

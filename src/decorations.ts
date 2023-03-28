import { $config, Global } from './extension';
import { IAggregatedByLineDiagnostics, Constants, IRangeDecorator } from './types';
import * as vscode from 'vscode';
import { DecorationRenderOptions, Range, TextEditor, Uri, window, DecorationOptions } from 'vscode';

/*
 * Update decorations for all visible editor.
 */
export function updateDecorationsForAllVisibleEditors() {
  for (const editor of window.visibleTextEditors) {
    updateDecorationsForUri(editor.document.uri, editor);
  }
}

/*
 * Update decorations for one editor.
 */
export function updateDecorationsForUri(
  uriToDecorate: Uri,
  editor?: TextEditor,
  groupedDiagnostics?: IAggregatedByLineDiagnostics,
  range?: Range
) {
  const activeEditor: TextEditor = window.activeTextEditor as TextEditor;
  const text = activeEditor.document.getText();
  const regex = new RegExp(/(?<=from\s?['"])(.*?)(?=['"])/g);
  const result: IRangeDecorator[] = [];

  const layers = Object.keys($config.layers);
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    const startPos = activeEditor.document.positionAt(match.index - 1);
    const endPos = activeEditor.document.positionAt(match.index + match[0].length + 2);

    const matches = match[0].split('/');

    let rootFolder = '';
    matches.forEach((f) => {
      const finded = layers.find((layer) => layer === f);
      if (!rootFolder && finded) {
        rootFolder = finded;
      }
    });

    let contentText = rootFolder;
    if (!!contentText) {
      const additionalFolders = $config.layers[rootFolder].folders;
      if (!!additionalFolders) {
        matches.forEach((f) => {
          const folder = additionalFolders.find((folder) => folder === f);
          if (folder) {
            contentText += ` › ${folder}`;
          }
        });
      }
    }

    result.push({
      range: new vscode.Range(startPos, endPos),
      contentText,
      layer: $config.layers[rootFolder]
    });
  }

  setDecoration(result);
}

function setDecoration(items: IRangeDecorator[]): void {
  items.forEach(({ range, contentText, layer }) => {
    if (!contentText) {
      return;
    }

    const decorationOptions: DecorationOptions[] = [];
    const options: DecorationRenderOptions = {
      opacity: '0.25'
    };

    const decoration = vscode.window.createTextEditorDecorationType(options);
    decorationOptions.push({
      range,
      renderOptions: {
        before: {
          contentText,
          fontStyle: 'Roboto',
          fontWeight: '300',
          color: layer.color ?? '#ADB9E3',
          padding: '0 8px',
          textAlign: 'center',
          fontSize: '0.9rem',
          backgroundColor: layer.backgroundColor ?? '#4B4353',
          border: layer.border ?? '1px solid #8189A5',
          borderRadius: '8px',
          margin: '0 4px 0 0'
        } as unknown as vscode.ThemableDecorationAttachmentRenderOptions
      }
    });

    const activeEditor: TextEditor = window.activeTextEditor as TextEditor;
    activeEditor.setDecorations(decoration, decorationOptions);
  });
}

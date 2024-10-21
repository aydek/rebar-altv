import * as alt from 'alt-client';
import { IKeys } from '../shared/interface.js';
import { useWebview } from '@Client/webview/index.js';
import { InstructionKeysEvents } from '../shared/events.js';
import './api.js';

const webview = useWebview();

export async function showInstructionKeys(keys: IKeys[]) {
    webview.show('InstructionKeys', 'persistent');
    await alt.Utils.wait(200);
    webview.emit(InstructionKeysEvents.toWebview.set, keys);
}

export function hideInstructionKeys() {
    webview.hide('InstructionKeys');
}

import { useClientApi } from '@Client/api/index.js';
import { hideInstructionKeys, showInstructionKeys } from './index.js';

export function useInstructionKeys() {
    return {
        showInstructionKeys,
        hideInstructionKeys,
    };
}

declare global {
    export interface ClientPlugin {
        ['instruction-keys-api']: ReturnType<typeof useInstructionKeys>;
    }
}

useClientApi().register('instruction-keys-api', useInstructionKeys());

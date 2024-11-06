
import { checkBan, permBan, tempBan } from './functions.js';


export function useBanHandlerAPI() {
    return {
        tempBan,
        permBan,
        checkBan,
    };
}


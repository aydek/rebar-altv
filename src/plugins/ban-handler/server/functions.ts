import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import '../translate/index.js';
import { useTranslate } from '@Shared/translate.js';

const Rebar = useRebar();

const { get, create, deleteDocument } = Rebar.database.useDatabase();
const { t } = useTranslate();

const CollectionName = 'BanHandler';

type Props = {
    _id?: string;
    type: 'Pernament' | 'Temporary';
    hardware?: string[];
    socialID?: string;
    ip?: string;
    discordID: string;
    username: string;
    reason: string;
    from: string;
    time?: number;
};

export async function permBan(player: alt.Player, from: string, reason: string) {
    const account = Rebar.document.account.useAccount(player);

    await create<Props>(
        {
            type: 'Pernament',
            hardware: [player.hwidHash, player.hwidExHash],
            socialID: player.socialID,
            ip: player.ip,
            discordID: account.getField('discord'),
            username: account.getField('username'),
            from,
            reason,
        },
        CollectionName,
    );

    kickBannedPlayer(player, reason);
}

export async function tempBan(player: alt.Player, from: string, reason: string, hours: number) {
    const account = Rebar.document.account.useAccount(player);
    const time = Date.now() + parseInt((3600000 * hours).toFixed());

    await create<Props>(
        {
            type: 'Temporary',
            discordID: account.getField('discord'),
            username: account.getField('username'),
            from,
            reason,
            time,
        },
        CollectionName,
    );

    const timeFormat = new Date(time).toLocaleString();
    kickBannedPlayer(player, reason, timeFormat);
}

export async function checkBan(player: alt.Player) {
    const account = Rebar.document.account.useAccount(player);

    const hardwareBan = await get<Props>(
        { hardware: [player.hwidHash, player.hwidExHash], type: 'Pernament' },
        CollectionName,
    );

    const ipBan = await get<Props>({ ip: player.ip, type: 'Pernament' }, CollectionName);

    const socialBan = await get<Props>({ socialID: player.socialID, type: 'Pernament' }, CollectionName);

    if (hardwareBan) {
        kickBannedPlayer(player, hardwareBan.reason);
        return true;
    }

    if (ipBan) {
        kickBannedPlayer(player, ipBan.reason);
        return true;
    }

    if (socialBan) {
        kickBannedPlayer(player, socialBan.reason);
        return true;
    }

    const tempBan = await get<Props>({ discordID: account.get().discord, type: 'Temporary' }, CollectionName);

    if (tempBan && tempBan.time > Date.now()) {
        const timeFormat = new Date(tempBan.time).toLocaleString();
        kickBannedPlayer(player, tempBan.reason, timeFormat);
        return true;
    }

    if (tempBan && tempBan.time < Date.now()) {
        await deleteDocument(tempBan._id, CollectionName);
    }

    return false;
}

function kickBannedPlayer(player: alt.Player, reason: string, until: string | undefined = undefined) {
    player.kick(
        `${t('ban.handler.banned')} ${t('ban.handler.reason')}: ${reason} ${until ? `${t('ban.handler.banned.until')}: ${until}` : ''}  `,
    );
}

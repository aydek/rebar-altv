import * as alt from 'alt-client';
import { ISanitizedStatsItem, IStatsItem } from '../shared/types.js';
import { useRebarClient } from '@Client/index.js';
import { HudEvents } from '../shared/events.js';
import { HudSettingsKeys } from '../shared/settings.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

const stats: IStatsItem[] = [
    {
        id: 'stat-dev',
        icon: 'icon-developer_board',
        color: '#2b2b2b',
        hidden: () => !alt.debug,
        value: () => 100,
        min: 0,
        max: 100,
        active: () => false,
        activeColor: '#2b2b2b',
    },
    {
        id: 'stat-mic',
        icon: 'icon-microphone',
        color: '#ede100',
        hidden: () => false,
        value: () => 33,
        min: 0,
        max: 100,
        active: () => alt.isKeyDown(alt.Voice.activationKey),
        activeColor: '#ede100',
    },
    {
        id: 'stat-dead',
        icon: 'icon-death-skull',
        hidden: () => true,
        color: '#cc0000',
        value: () => 0,
        min: 0,
        max: 100,
        active: () => true,
        activeColor: '#990000',
    },
    {
        id: 'stat-health',
        icon: 'icon-heart',
        hidden: () => false,
        color: '#cc0000',
        value: () => alt.Player.local.health,
        min: 100,
        max: 200,
        active: () => alt.Player.local.health < 115,
        activeColor: '#cc0000',
    },
    {
        id: 'stat-armour',
        icon: 'icon-shield2',
        hidden: () => {
            if (alt.Player.local.armour < 1) return true;
            return false;
        },
        color: '#0055ff',
        value: () => alt.Player.local.armour,
        min: 0,
        max: 100,
        active: () => alt.Player.local.armour < 15,
        activeColor: '#0055ff',
    },
];

export function updateStats() {
    if (alt.LocalStorage.get(HudSettingsKeys.statsHidden)) {
        return;
    }

    const data = [];
    if (alt.Player.local.isDead) {
        for (const item of stats) {
            if (item.id === 'stat-mic')
                data.push({ id: item.id, value: item.value(), hidden: item.hidden(), active: item.active() });
            else if (item.id === 'stat-dead') data.push({ id: item.id, value: 0, hidden: false, active: false });
            else data.push({ id: item.id, value: 0, hidden: true, active: false });
        }
    } else {
        for (const item of stats) {
            data.push({ id: item.id, value: item.value(), hidden: item.hidden(), active: item.active() });
        }
    }

    webview.emit(HudEvents.toWebview.setStats, data);
}

export function addStatsItem(items: IStatsItem[]) {
    for (const item of items) {
        stats.push(item);
    }
}

webview.onRpc(HudEvents.toClient.getStatsRPC, () => {
    const sanitizedItems: ISanitizedStatsItem[] = [];
    for (const item of stats) {
        sanitizedItems.push({
            id: item.id,
            color: item.color,
            hidden: true,
            icon: item.icon,
            min: item.min,
            max: item.max,
            value: item.min,
            active: false,
            activeColor: item.activeColor,
        });
    }
    return sanitizedItems;
});

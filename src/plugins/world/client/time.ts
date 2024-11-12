import * as alt from 'alt-client';
import { TimeConfig } from '../shared/config.js';

alt.setMsPerGameMinute(TimeConfig.secondsPerSecond * 1000);

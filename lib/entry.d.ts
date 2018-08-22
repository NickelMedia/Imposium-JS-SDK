import Client from './client/Client';
import Player from './video/Player';
declare const e: {
    EXPERIENCE_CREATED: string;
    UPLOAD_PROGRESS: string;
    GOT_EXPERIENCE: string;
    STATUS_UPDATE: string;
    ERROR: string;
};
export { Client, Player, e as Events };

import type { CalendarDate } from "@internationalized/date";

declare global {
    interface DisplayPlayers {
        avatar_url: string;
    }

    type roomMode = 'standard' | 'guts' | 'relay' | 'blitz' | 'showdown';

    interface PublicRoom {
        code: string;
        title: string;
        description: string;
        mode: roomMode;
        players: DisplayPlayers[];
        maxPlayers: number;
    }

    type PublicRoomOtherFilters = {
        notFull?: boolean;
        mode: roomMode | null;
	}
}

export {};
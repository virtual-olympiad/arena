import type { CalendarDate } from "@internationalized/date";

declare global {
    interface DisplayPlayer {
        avatar_url: string;
    }

    interface Player extends DisplayPlayer {
        id: string;
        display_name: string;
        username: string;
        status_text: string;
    }

    type roomMode = 'standard' | 'guts' | 'relay' | 'blitz' | 'showdown';

    interface PublicRoom {
        code: string;
        title: string;
        description: string;
        mode: roomMode;
        host: string;
        private: boolean;
        players: DisplayPlayer[];
        max_players: number;
    }

    type PublicRoomOtherFilters = {
        notFull?: boolean;
        mode: roomMode | null;
	}
}

export {};
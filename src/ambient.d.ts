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
        players: DisplayPlayer[];
        max_players: number;
        settings_game: {
            mode: roomMode;
            duration: number;
        };
        settings_problemset: {
            problemCount: number;
            correctValue: number;
            incorrectValue: number;
            blankValue: number;
            selected: boolean;
        };
    }

    interface Room extends PublicRoom {
        private: boolean;
    }

    type PublicRoomOtherFilters = {
        notFull?: boolean;
        mode: roomMode | null;
	}

    interface SourceSettings {
        problemCount: number;
        correctValue: number;
        incorrectValue: number;
        blankValue: number;
        selected: boolean;
    }
}

export {};
export interface ClientInfo {
    name: string;
    clan: string;
    country: number;
    skin: string;
    use_custom_color: number;
    color_body: number;
    color_feet: number;
    id: number;
}

export interface iOptions {
    identity?: ClientInfo;
    password?: string;
    ddnet_version?: {
        version: number;
        release_version: string;
    };
    timeout?: number;
    NET_VERSION?: string;
    lightweight?: boolean;
    timeout_on_connecting?: boolean;
    downloadMap?: boolean;
}

export interface iMessage {
    team: number;
    client_id: number;
    author?: {
        ClientInfo?: ClientInfo;
        PlayerInfo?: PlayerInfo;
    };
    message: string;
}

export interface PlayerInfo {
    local: number;
    cliend_id: number;
    team: number;
    score: number;
    latency: number;
}

export interface PlayerData {
    profile: {
        name: string;
        points: number;
    },
    general_activity: {
        total_seconds_played: number;
    }
}
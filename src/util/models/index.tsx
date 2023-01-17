export interface NavRoute {
    id: number;
    url: string;
    text: string;
}

export interface RegistryItem {
    name: string;
    url: string;
    id: number;
    price: number;
    claimer: string;
    claimer_id: number;
}

export interface Registry {
    name: string;
    registry_items: Array<RegistryItem>;
}

export interface Guest {
    name: string;
    id: number;
    dietary_restrictions: string;
    is_attending: boolean;
}

export interface Invite {
    family_name: string;
    guests: Array<Guest>;
    uuid: string;
    focused: number;
    finished: boolean;
}
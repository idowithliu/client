export interface NavRoute {
    id: number;
    url: string;
    text: string;
}

export interface RegistryItem {
    name: string;
    url: string;
    photo_url: string;
    id: number;
    price: number;
    claimer: { pseudo_id: number };
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
    pseudo_id: number;
    focused: number;
    finished: boolean;
    email: string;
}

export interface Fund {
    id: number;
    name: string;
    total_amount_raised: number;
    goal: number;
    background_photo: string;
}

export interface Recipient {
    id: number;
    address: string; // Email address
    family_name: string;
}

export interface Photo {
    id: number;
    image: string; // URL to image
}

export interface FetchedValue<T> {
    value: T;
    fetched: boolean;
}
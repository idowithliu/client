export interface NavRoute {
    id: number;
    url: string;
    text: string;
}

export interface RegistryItem {
    name: string;
    id: number;
    price: number;
    claimer: string;
}

export interface Registry {
    name: string;
    registry_items: Array<RegistryItem>;
}
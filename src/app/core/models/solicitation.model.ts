export interface Solicitation {
    id?: number;
    requester: string;
    registration: string;
    date_request: Date;
    request_number: string;
    email: string;
    address: string;
    number: number;
    city: string;
    state: string;
    complement: string;
    id_secretary: number;
    status: string;
    id_warehouse: number;
    operator?: string;
}
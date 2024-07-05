import axios from "axios";
import type { Bar } from "@/types/bar";
import type { Order } from "@/types/order";
import type {DeliveryState} from "@/types/deliveryState";

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMDEwNTc5MywiZXhwIjoxNzIwMTA5MzkzfQ.AZZj3dCBRXNjJrJtuwMyNvUgsYeajiWSZ5oS6uwcnRk";

//todo remove this when login is handle
axios.interceptors.request.use(
    (config: any) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // fait le ici
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export type UseApiResult = {
    // --- user
    //todo

    // --- bar
    getBars: () => Promise<Bar[]>
    getBar: (id: string) => Promise<Bar>
    updateBar: (bar: Bar, id: string) => Promise<Bar>
    getOrderProposal: (id: string) => Promise<Bar>

    // --- order
    getOrders: () => Promise<Order[]>
    getOrderPending: () => Promise<Order[]>
    getOrderPendingByBarId: (id: string) => Promise<Order>
    createOrder: (bar: Bar) => Promise<Order>
    updateOrder: (state: DeliveryState, id: string) => Promise<Order>
}

export function useApi(): UseApiResult {
    return {
        // --- user
        //todo

        // --- bar
        getBars,
        getBar,
        updateBar,
        getOrderProposal,

        // --- order
        getOrders,
        getOrderPending,
        getOrderPendingByBarId,
        createOrder,
        updateOrder,
    }
}

// -----------------------------------------------------------------------------------
// USER

//todo

// -----------------------------------------------------------------------------------
// BAR
async function getBars(): Promise<Bar[]> {
    const result = await axios.get(buildUrl(`/bars`));
    return result.data;
}
async function getBar(id: string): Promise<Bar> {
    const result = await axios.get(buildUrl(`/bars/${id}`));
    return result.data;
}

async function updateBar(bar: Bar, id: string): Promise<Bar> {
    const result = await axios.put(buildUrl(`/bars/${id}`), bar);
    return result.data;
}
async function getOrderProposal(id: string): Promise<Bar> {
    const result = await axios.get(buildUrl(`/bars/${id}/proposal`)); //todo proposal
    return result.data;
}



// -----------------------------------------------------------------------------------
// ORDER
async function getOrders(): Promise<Order[]> {
    const result = await axios.get(buildUrl(`/livraisons`));
    return result.data;
}

async function getOrder(id: string): Promise<Order> {
    const result = await axios.get(buildUrl(`/livraisons/${id}`));
    return result.data;
}

async function getOrderPending(): Promise<Order[]> {
    const result = await axios.get(buildUrl(`/livraisons/pending`));
    return result.data;
}

async function getOrderPendingByBarId(id: string): Promise<Order[]> {
    const result = await axios.get(buildUrl(`/bars/${id}/livraisons/pending`));
    return result.data;
}

async function updateOrder(state: DeliveryState, id: string): Promise<Order> {
    const result = await axios.put(buildUrl(`/livraisons/${id}`), state);
    return result.data;
}
async function createOrder(bar: Bar): Promise<Order> {
    const result = await axios.post(buildUrl(`/livraisons`), bar);
    return result.data;
}

// -----------------------------------------------------------------------------------
// HELPERS

function buildUrl(url: string, query?: any): string {
    let fullUrl = import.meta.env.VITE_API_URL + url;
    if(query) {
        let separator = "?";
        for(const key of Object.keys(query)) {
            const value = query[key] ? encodeURIComponent(query[key].toString()) : null;
            if(value !== null) {
                fullUrl += separator + key + "=" + encodeURIComponent(query[key].toString());
                separator = "&";
            }
        }
    }
    return fullUrl;
}

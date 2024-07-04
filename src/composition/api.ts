import axios from "axios";
import type { Bar } from "@/types/bar";
import type { Order, OrderChangeStatut } from "@/types/order";
import Order from "@/views/Order.vue";
import type { User } from "@/types/user";

const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMDEyMDU5NCwiZXhwIjoxNzIwMTI0MTk0fQ.qBH9JlzHRQSYPJ9Mo0xN0UuSAzl3R5FUIMOPehd_oeM";

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
    getMe:() => Promise<User>
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
    updateOrder: (order: Order, id: string) => Promise<Order>
    updateUserWithUserId:(id: string, change: OrderChangeStatut) => Promise<Order>
}

export function useApi(): UseApiResult {
    return {
        // --- user
        //todo
        getMe,

        // --- bar
        getBars,
        getBar,
        updateBar,
        getOrderProposal,

        // --- order
        getOrders,
        getOrderPending,
        getOrderPendingByBarId: getOrder,
        createOrder,
        updateOrder,
        updateUserWithUserId,
    }
}

// -----------------------------------------------------------------------------------
// USER

//todo
async function getMe(): Promise<User> {
    const result = await axios.get(buildUrl(`/me`));
    return result.data;
}

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

async function updateOrder(order: Order, id: string): Promise<Order> {
    const result = await axios.post(buildUrl(`/livraisons/${id}`), order);
    return result.data;
}

async function updateUserWithUserId(id: string, change: OrderChangeStatut): Promise<Order>{
    const result = await axios.put(buildUrl(`/livraisons/${id}`),change);
    return result.data;
}

async function createOrder(bar: Bar): Promise<Order> {
    const result = await axios.put(buildUrl(`/livraisons`), bar);
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

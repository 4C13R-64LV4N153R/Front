import axios from "axios";
import type { Bar } from "@/types/bar";
import type { Order, OrderChangeStatut } from "@/types/order";
import type {DeliveryState} from "@/types/deliveryState";
import type { User } from '@/types/user'

function getToken() {
  return localStorage.getItem('token')
}

axios.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export type UseApiResult = {
  // --- user
  getMe: () => Promise<User>
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
  updateUserWithUserId: (id: string, change: OrderChangeStatut) => Promise<Order>
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
        getOrderPendingByBarId,
        createOrder,
      updateOrder,
      updateUserWithUserId
    }
}

// -----------------------------------------------------------------------------------
// USER

//todo
async function getMe(): Promise<User> {
  const result = await axios.get(buildUrl(`/me`))
  return result.data
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

async function getOrderPendingByBarId(id: string): Promise<Order[]> {
    const result = await axios.get(buildUrl(`/bars/${id}/livraisons/pending`));
    return result.data;
}

async function updateOrder(state: DeliveryState, id: string): Promise<Order> {
    const result = await axios.put(buildUrl(`/livraisons/${id}`), state);
    return result.data;
}

async function updateUserWithUserId(id: string, change: OrderChangeStatut): Promise<Order> {
  const result = await axios.put(buildUrl(`/livraisons/${id}`), change)
  return result.data
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

import { IToDoItem } from "./App";

interface IObj {
    [key: string]: IToDoItem;
}

export const tranArrToObj = (arr: IToDoItem[]): IObj => (
    arr.reduce((result: IObj, item) => {
        result[item.id] = item;
        return result;
    }, {})
)

export const tranObjToArr = (obj: IObj): IToDoItem[] => Object.keys(obj).map((item) => obj[item]);

export const store = (namespace: string, data?: IObj) => {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    const localStore = localStorage.getItem(namespace);
    return (localStore && JSON.parse(localStore)) || {};
}
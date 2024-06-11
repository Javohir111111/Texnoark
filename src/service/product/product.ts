import request from "../config"

// ----------------> Instance Product <-------------------------------------
export interface postData{
    name: string;
    price: number| string;
    category_id:number;
    brand_category_id:number;
    brand_id:number;
}

export interface UpdateData{
    id:number|undefined;
    putData: postData;
}



interface Product {
    post: (data: postData) => any,
    delete: (id: string | undefined) => any,
    get: (params: any) => any,
    getId: (id: string | undefined) => any,
    getBrandProduct: (id: number) => any,
    update: (data: UpdateData) => any,
}

// ---------> Interface Store Product <--------------------
export interface StoreProduct {
    isLoader: boolean;
    data: any[];
    dataProduct: any[];
    totlCount: number;
    getProduct: (params:any) => Promise<any>;
    getIdProduct: (id: string | undefined) => Promise<any>;
    getBrandProduct: (id: number) => Promise<any>;
    postProduct: (data: postData) => Promise<any>;
    deleteProducts: (id: string | undefined) => Promise<any>;
    updateProduct: (data: UpdateData) => Promise<any>;
}




// ----------------> Instance Product <----------------------------
export const product: Product = {
    post: (data) => request.post("/products/create", data),
    delete: (id) => request.delete(`/products/delete/${id}`),
    get: (params) => request.get(`/products/search?search=${params?.search}&limit=${params?.limit}&page=${params?.page}`),
    getBrandProduct: (id) => request.get(`/products/brand/${id}`),
    getId: (id) => request.get(`/product/${id}`),
    update: (data)=> request.patch(`/products/update/${data.id}`, data.putData)
}
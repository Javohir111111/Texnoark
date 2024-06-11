import request from "../config"

// ----------------> Instance Product <-------------------------------------
export interface PostData {
    brand_id: number,
    category_id: number,
}

export interface UpdateData extends PostData {
    id: string,
}



interface BrandCategory {
    post: (data: PostData) => any,
    delete: (id: string | undefined) => any,
    get: (params:any) => any,
    getId: (id: string | undefined) => any,
    update: (data: UpdateData) => any,
}

// ---------> Interface Store Product <--------------------
export interface StoreBrandCategory {
    isLoader: boolean;
    data: any[];
    totlCount: number;
    getProduct: (params:any) => Promise<any>;
    getIdProduct: (id: string | undefined) => Promise<any>;
    postProduct: (data: PostData) => Promise<any>;
    deleteProduct: (id: string | undefined) => Promise<any>;
    updateProduct: (data: UpdateData ) => Promise<any>;
}




// ----------------> Instance Product <----------------------------
export const brandCategory: BrandCategory = {
    post: (data) => request.post("/category/create", data),
    delete: (id) => request.delete(`/category/delete/${id}`),
    get: (params) => request.get(`/category/search?search=${params?.search}&limit=${params?.limit}&page=${params?.page}`),
    getId: (id) => request.get(`/category/${id}`),
    update: (id) => request.patch(`/category/update/${id}`)
}
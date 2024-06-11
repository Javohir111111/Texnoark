import request from "../config"


// ----------------> Instance Product <-------------------------------------
export interface PostData {
  form: FormData;
  [key: string]: any; 
}

export interface UpdateData extends PostData {
    id: string,
}



interface brand {
    post: (data: any) => any,
    delete: (id: string | undefined) => any,
    get: (params:any) => any,
    getCategoryId:(data:GetCategoryId)=> any,
    update: (data: UpdateData) => any,
}

export interface GetCategoryId{
    id:number;
    limit?:number;
    page?:number;
}

// ---------> Interface Store Product <--------------------
export interface StoreBrand {
    isLoader: boolean;
    data: any[];
    dataBrandsId: any[],
    totlCount: number;
    getBrand: (data:any) => Promise<any>;
    // getIdBrand: (id: string | undefined) => Promise<any>;
    postBrand: (data: any) => Promise<any>;
    deleteBrand: (id: string | undefined) => Promise<any>;
    getCategoryId: (data:GetCategoryId)=> Promise <any>;
    updateBrand: (data: UpdateData) => Promise<any>;
}




// ----------------> Instance Product <----------------------------
export const brand: brand = {
    post: (data) => request.post(`/brand/create`, data),
    delete: (id) => request.delete(`/brand/delete/${id}`),
    get: (params) => request.get(`/brand/search?search=${params.search}&limit=${params.limit}&page=${params.page}`),
    getCategoryId: (data)=> request.get(`/brand/category/${data?.id}?limit=${data?.limit}&page=${data?.page}`),
    update: (id) => request.patch(`/brand/update/${id}`)
}
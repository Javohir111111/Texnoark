import request from "../config"


// ----------------> Instance Product <-------------------------------------
export interface PostData {
    form: FormData;
    [key: string]: any;
}

export interface UpdateData extends PostData {
    id: string,
}



interface brandCategory {
    post: (data: any) => any,
    delete: (id: string | undefined) => any,
    get: (params: any) => any,
    getCategoryBrandId:(data:GetCategoryBrandId)=>any,
    update: (data: UpdateData) => any,
}

export interface GetCategoryBrandId {
    id: number;
    limit?: number;
    page?: number;
}

// ---------> Interface Store Product <--------------------
export interface StoreBrandCategory {
    isLoader: boolean;
    data: any[];
    dataBrandCategoryById: any[],
    totlCount: number;
    getCategoryBrand: (data: any) => Promise<any>;
    // getIdBrand: (id: string | undefined) => Promise<any>;
    postBrand: (data: any) => Promise<any>;
    deleteBrand: (id: string | undefined) => Promise<any>;
    getCategoryBrandId: (data: GetCategoryBrandId) => Promise<any>;
    updateBrand: (data: UpdateData) => Promise<any>;
}




// ----------------> Instance Product <----------------------------
export const brandCategory: brandCategory = {
    post: (data) => request.post(`/brand-category/create`, data),
    delete: (id) => request.delete(`/brand/${id}`),
    get: (params) => request.get(`/brand-category/search?search=${params.search}&limit=${params.limit}&page=${params.page}`),
    getCategoryBrandId: (data) => request.get(`/brand-category/brand/${data?.id}?limit=${data?.limit}&page=${data?.page}`),
    update: (id) => request.patch(`/brand-category/update/${id}`)
}
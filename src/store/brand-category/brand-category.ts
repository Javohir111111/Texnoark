
import { toast } from 'react-toastify';
import { create } from 'zustand';
import axios from 'axios';
import { getCookies } from "@utils";
import { brandCategory, StoreBrandCategory } from '../../service/brand-category/brand-category';
import request from '../../service/config';


const useBrandStore = create<StoreBrandCategory>((set) => ({
    isLoader: false,
    data: [],
    dataBrandCategoryById: [],
    totlCount: 0,
    getCategoryBrand: async (data) => {
        try {
            set({ isLoader: true })
            const respons = await brandCategory.get(data)
            //    console.log(respons)
            if (respons.status === 200) {
                set({ data: respons?.data?.data?.brands });
                set({ totlCount: respons?.data?.total_count })
            }
            set({ isLoader: false })
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }

    },
    postBrand: async (data) => {
        try {
            const response = await axios.post('https://ecomapi.ilyosbekdev.uz/brand/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            getCookies("token");
            console.log(response);
            if (response.status === 201) {
                set((state) => ({
                    data: [...state.data, { ...data, id: response?.data?.id }],
                    dataBrandCategoryById: state.dataBrandCategoryById.length < 10 ? [...state.dataBrandCategoryById, response?.data?.data] : [...state.dataBrandCategoryById],
                }));
                toast.success("Successfully added");
                return response?.status;
            }
        } catch (error) {
            console.log(error);
            toast.error("Error: ");
        }
    },
    deleteBrand: async (id) => {
        try {
            const respons = await brandCategory.delete(id)
            //    console.log(respons)
            if (respons.status === 200) {
                set((state) => ({ data: state.data.filter((el: any) => el.id !== id) }))
                toast.success("Deleted successfully")
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    updateBrand: async (data) => {
        try {
            const getId = getCookies("Id")
            const res = await request.patch(`/brand/${getId}`, data)
            if (res.status === 200) {
                return res
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    getCategoryBrandId: async(data)=>{
        try{
           const respons = await brandCategory.getCategoryBrandId(data)
        //    console.log(respons)
           if(respons.status === 200){
               set({dataBrandCategoryById: respons?.data?.data?.brandCategories})
               set({totlCount: respons?.data?.data?.count})
           }
        }catch(error:any){
            console.log(error)
        }
    }

}))

export default useBrandStore
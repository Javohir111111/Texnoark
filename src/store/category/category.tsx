
import { create } from 'zustand';
import { toast } from 'react-toastify';
import { brandCategory, StoreBrandCategory } from '../../service/category/category';
import request from '../../service/config';
import { getCookies } from '@utils';


const useCategoryStore = create<StoreBrandCategory>((set) => ({
    isLoader: false,
    data: [],
    dataCategory: [],
    totlCount: 0,
    getProduct: async (params) => {
        try {
            set({ isLoader: true })
            const respons = await brandCategory.get(params)
            //    console.log(respons)
            if (respons.status === 200) {
                set({ data: respons?.data?.data?.categories });
                set({ totlCount: respons?.data?.total_count })
            }
            set({ isLoader: false })
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }

    },
    postProduct: async (data) => {
        try {
            const respons = await brandCategory.post(data)
            console.log(respons)
            if (respons.status === 201) {
                set((state) => ({ data: [...state.data, { ...data, product_id: respons?.data?.data?.id }] }))
                toast.success("success full")
                return respons?.status
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    deleteProduct: async (id) => {
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
    updateProduct: async (data) => {
        try {
            const getId = getCookies("Id")
            const res = await request.patch(`/category/update/${getId}`, data)
            if (res.status === 200) {
                return res
            }

        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    getIdProduct: async (id) => {
        try {
            const respons = await brandCategory.getId(id)
            //    console.log(respons)
            if (respons.status === 200) {
                return respons.data;
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    }

}))

export default useCategoryStore
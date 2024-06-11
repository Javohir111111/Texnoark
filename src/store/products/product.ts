
import { create } from 'zustand';
import { toast } from 'react-toastify';
import { product, StoreProduct } from '../../service/product/product';


const useProductStore = create<StoreProduct>((set) => ({
    isLoader: false,
    data: [],
    dataProduct: [],
    totlCount: 0,
    getProduct: async (params) => {
        try {
            set({ isLoader: true })
            const respons = await product.get(params)
            //    console.log(respons)
            if (respons.status === 200) {
                set({ data: respons?.data?.data?.products });
                set({ totlCount: respons?.data?.data?.count })
            }
            set({ isLoader: false })
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }

    },
    postProduct: async (data) => {
        try {
            const respons = await product.post(data)
            console.log(respons)
            if (respons.status === 201) {
                set((state) => ({ data: [...state.data, { ...data, product_id: respons?.data?.product_id }] }))
                toast.success("success full")
                return respons?.status
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    deleteProducts: async (id) => {
        try {
            const respons = await product.delete(id)
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
            const respons = await product.update(data)
            if (respons?.status === 200) {
                set((state) => ({ data: state.data.map((el: any) => el.id === data?.id ? { ...data.putData, id: data.id } : el) }))
                return respons?.status
            }

        } catch (error: any) {
            console.log(error)
        }
    },
    getIdProduct: async (id) => {
        try {
            const respons = await product.getId(id)
            //    console.log(respons)
            if (respons.status === 200) {
                return respons.data;
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    getBrandProduct: async (id) => {
        try {
            const respons = await product.getBrandProduct(id)
            //    console.log(respons)
            if (respons.status === 200) {
                set({ dataProduct: respons?.data?.data })
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    }

}))

export default useProductStore



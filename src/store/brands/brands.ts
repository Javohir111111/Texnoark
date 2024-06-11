
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { getCookies } from "@utils";
import { brand , StoreBrand } from '../../service/brands/brand';
import axios from 'axios';
import request from '../../service/config';


const useBrandStore = create <StoreBrand> ((set)=>({
    isLoader: false,
    data: [],
    dataBrandsId: [],
    totlCount: 0,
    getBrand : async(data)=>{
        try{
           set({isLoader: true})
           const respons = await brand.get(data)
        //    console.log(respons)
           if(respons.status === 200){
               set({data: respons?.data?.data?.brands});
               set({totlCount: respons?.data?.total_count})
           }
           set({isLoader: false})
       }catch(error:any){
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
                set((state) => ({ data: [...state.data, { ...data, product_id: response?.data?.id }] }));
                toast.success("Successfully added");
                return response?.status;
            }
        } catch (error) {
            console.log(error);
            toast.error("Error: ");
        }
    },
    deleteBrand: async(id)=>{
        try{
           const respons = await brand.delete(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({data: state.data.filter((el:any)=>el.id !== id)})) 
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    updateBrand: async(data)=>{
        try{
            const getId = getCookies("Id")
            const res = await request.patch(`/brand/update/${getId}`, data)
            if (res.status === 200) {
                return res
            }

        }catch(error:any){
            console.log(error)
            toast.error("Error : " + error?.message);
        }
    },
    getCategoryId: async(data)=>{
        try{
            const respons = await brand.getCategoryId(data)
            if(respons?.status === 200){
                set(({dataBrandsId: respons?.data?.data?.brands}))
            }
        }catch(error:any){
            console.log(error)
        }
    }

}))

export default useBrandStore

import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { stock , StoreStock } from '../../service/stock/stock';


const useStockStore = create <StoreStock> ((set)=>({
    isLoader: false,
    dataStock: [],
    totlCount: 0,
    productsId: null ,
    getStock : async(params)=>{
        try{
           set({isLoader: true})
           const respons = await stock.get(params)
        //    console.log(respons)
           if(respons.status === 200){
               set({dataStock: respons?.data?.data?.stocks});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
    
    postStock: async(data)=>{
        
            try{
                const respons = await stock.post(data)
             //    console.log(respons)
                if(respons.status === 201){
                    set((state)=>({dataStock:  [...state.dataStock, respons?.data?.data] })) 
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return respons?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteStock: async(id)=>{
        try{
           const respons = await stock.delete(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({dataStock: state.dataStock.filter((el:any)=>el.id !== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateStock: async(data)=>{
            try{
                const respons = await stock.update(data)
                if(respons?.status === 200){
                    set((state)=>({dataStock: state.dataStock.map((el:any)=>el.id === data?.id ? {...data.putData , id:data.id} : el)}))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useStockStore
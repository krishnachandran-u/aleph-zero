'use client'
import ProfileCard from "@/components/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { selectUserProductsWithProfile } from "@/lib/fetchProducts";
import ProductCard from "@/components/ProductCard";

export default function Home({params}) {
    const username = params.username;
    const userProducts = useQuery({ 
        queryKey: ["profile",{userName: username}], 
        queryFn: () => selectUserProductsWithProfile(username),
        enabled : !!username
    })
    if(userProducts.isLoading || !username){
        return <div>Loading...</div>
    }
    const {products,...user} = userProducts.data;
    if(userProducts.isError){
        return <div>Error</div>
    }
    const soldProdcuts = products.filter((product) => {
        return product.sold
    })
    const unsoldProdcuts = products.filter((product) => {
        return !product.sold
    })

    return (
        <div className = "flex flex-col p-2 gap-2">
            <div>
                <h1 className = "text-5xl text-center sm:pl-2 sm:text-left font-bold"></h1>
            </div>
            <div className = "flex flex-col sm:flex-row flex-grow sm:justify-between mb-20 gap-4 h-full">
                <div className = "flex flex-col px-2 gap-6 w-full">
                    <div className = "">
                        <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold">
                        <h3 className = "mb-2">Currently selling</h3>
                        </div>
                        <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start gap-2">
                        {
                            unsoldProdcuts.map((product) => {
                                return <ProductCard key={product.id} product={product} hideSeller={true} />
                            })
                        }
                        </div>
                    </div>
                    <div>
                        <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold gap-2">
                        <h3 className = "mb-2">Sold</h3>
                        </div>
                        <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start gap-2">
                            {
                                soldProdcuts.map((product) => {
                                    return <ProductCard key={product.id} product={product} disableCard={true} />
                                })
                            }
                        </div>
                    </div> 
                </div>
                <div className = "order-first sm:order-last">
                    <ProfileCard user={user} />
                </div>
            </div>
        </div>
    )
}
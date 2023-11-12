'use client'
import AddProductCard from "@/components/AddProductCard"
import ProductCard from "@/components/ProductCard"
import { useQuery } from "@tanstack/react-query"
import { selectUserProducts } from "@/lib/fetchProducts"
import { useSession } from "next-auth/react"

function SellPage() {
  const session = useSession()
  const username = session.data?.user?.username;
  const userProducts = useQuery({ 
    queryKey: ["products",{sellerName: username}], 
    queryFn: () => selectUserProducts(username), 
    enabled : !!username
  })
  if(userProducts.isLoading || !username){
    return <div>Loading...</div>
  }
  if(userProducts.isError){
    return <div>Error</div>
  }
  const soldProdcuts = userProducts.data.filter((product) => {
    return product.sold
  })
  const unsoldProdcuts = userProducts.data.filter((product) => {
    return !product.sold
  })

  return (
    <div className="p-4">
      <div className = "flex flex-col">
          <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold">
              <h2 className = "">Your Products</h2>
          </div>
          <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start p-4 gap-2">
            <AddProductCard />
            {
              unsoldProdcuts.map((product) => {
                return <ProductCard key={product.id} product={product} hideCart={true} hideSeller={true} />
              })
            }
          </div>
          <div className = "text-center sm:text-left w-full sm:pl-2 text-3xl font-semibold">
              <h2 className = "">Sold Products</h2>
          </div>
          <div className = "flex sm:flex-row flex-col sm:flex-wrap sm:items-start p-4 gap-2">
            {
              soldProdcuts.map((product) => {
                return <ProductCard key={product.id} product={product} hideCart={true} disableCard={true} hideSeller={true} />
              })
            }
          </div>
      </div>
    </div>
  )
}

export default SellPage
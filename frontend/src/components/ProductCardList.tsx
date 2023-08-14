import React from "react";
import ProductInterface from "../interfaces/product.interface";
import useTextLimit from "../hooks/useTextLimit.ts";

const ProductSkeleton: React.FC = () => {
    return (
        <div role="status" className="w-2/3 shrink-0 lg:w-full animate-pulse">
            <div className="flex items-center justify-center w-full h-48 rounded bg-gray-700">
                <svg className="w-10 h-10 text-gray-600" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>

            <div className="mt-4">
                <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
                <div className="flex items-center w-full space-x-2">
                    <div className="h-2.5 rounded-full bg-gray-600 w-24"></div>
                    <div className="h-2.5 rounded-full bg-gray-600 w-24"></div>
                </div>
            </div>
        </div>
    );
}

const ProductCard: React.FC<ProductInterface> = (product: ProductInterface) => {
    const limitedTitle = useTextLimit(product.title, 30);

    return (
        <div className="w-2/3 shrink-0 lg:w-full">
            <img
                src={product.photo}
                alt={product.title}
                className="rounded w-full lg:h-[200px] object-cover"
                width={1024}
                height={1024}
            />

            <div className="mt-4">
                <h3 className="font-medium">{limitedTitle}</h3>

                <div className="mt-2">
                    <span className="text-2xl font-bold">${product.price}</span>

                    <button className="btn btn-sm btn-primary ml-4">Buy</button>
                </div>
            </div>
        </div>
    );
}

interface ProductCardListProps {
    products: ProductInterface[];
    isLoading: boolean;
}

const ProductCardList: React.FC<ProductCardListProps> = ({products, isLoading}) => {
    return (
        <>
            {isLoading ? (
                <>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                    <ProductSkeleton/>
                </>
            ) : (
                <>
                    {products.map((product) => (
                        <ProductCard {...product} key={product._id}/>
                    ))}
                </>
            )}
        </>
    );
}

export default ProductCardList;

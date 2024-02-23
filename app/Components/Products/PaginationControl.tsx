'use client';
import { useSearchParams, useRouter } from "next/navigation";

const PaginationControl = ({ productsQuantity }: {productsQuantity: number}) => {
    const searchParams = useSearchParams();
    
    const perPage = searchParams.get('perPage') ?? '12';
    const totalPages = Math.round(productsQuantity as number /  Number(perPage));

    const router = useRouter();

    return(
        <div className="flex justify-center w-full pb-5">
            <div className="flex gap-5">
                {Array.from({ length: totalPages }, (x, page) => (
                    <button
                        key={page+1}
                        onClick={() => {
                            router.push(`/Products?page=${Number(page) + 1}&perPage=${Number(perPage)}`);
                        }}
                        className="text-neutral-600 text-xl font-semibold"
                    >{page+1}</button>
                ))}
            </div>
        </div>
    )
}

export default PaginationControl;
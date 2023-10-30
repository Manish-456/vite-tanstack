import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { Loader } from "lucide-react";
import Button from "./components/button";
import { ProductCard } from "./components/product-card";
import { fetchProducts } from "./api/products";
import { Loading } from "./components/loading";
import { Error } from "./components/error";
import Navbar from "./components/navbar";

function App() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data: products,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return null;
      }
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <Loading />;

  if (error) return <Error error={"Something went wrong"} />;

  return (
    <>
      <Navbar />
      <Button>Add Product</Button>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {products.pages.map((group, i) => (
          <Fragment key={i}>
            {group.sort((a,b) => b.id - a.id).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Fragment>
        ))}
      </div>
      
      {isFetchingNextPage && (
        <Loader className="animate-spin h-5 w-5 mx-auto mb-6" />
      )}
      <div className="flex items-center justify-center">
        <div ref={ref}></div>
      </div>
    </>
  );
}

export default App;

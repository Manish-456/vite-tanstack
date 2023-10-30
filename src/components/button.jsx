import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addProducts } from '../api/products';
import { Loader2 } from 'lucide-react';
import { products } from '../constant';


const Button = ({ children }) => {
  const [index, setIndex] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn : addProducts,
    onSuccess : () => queryClient.invalidateQueries({queryKey : ["products"]})
  });


  
  const onCreate = () => {

     setIndex(prev => (prev + 1) % products.length);
     mutation.mutate(products[index]);
  }

  return (
    <div className='flex items-center justify-center my-6'>
      <button
        onClick={onCreate}
        type="button"
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {mutation.isPending ? <Loader2 className='h-6 animate-spin w-6'/> : children}
      </button>
    </div>
  );
};

export default Button;

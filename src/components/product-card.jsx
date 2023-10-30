import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { deleteProduct, updateProduct } from "../api/products";

export function ProductCard({ product }) {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(product.title || "Untitled");
  const [editDesc, setEditDesc] = useState(false);
  const [description, setDescription] = useState(product.title || "Untitled");
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const editMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  function removeProduct() {
    mutation.mutate(product.id);
  }

  function enableInput() {
    setTitle(product.title);
    setEditTitle(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    });
  }

  function disableInput() {
    setEditTitle(false);
    editMutation.mutate({
      id: product.id,
      product: {
        title: title || "Untitled",
      },
    });
  }
  function enableDesc() {
    setDescription(product.description);
    setEditDesc(true);
    setTimeout(() => {
      textRef?.current?.focus();
      textRef.current?.setSelectionRange(0, textRef.current.value.length);
    });
  }

  function disableDesc() {
    setEditDesc(false);
    editMutation.mutate({
      id: product.id,
      product: {
        description: description || "Untitled",
      },
    });
  }
  
  
    function handleKeyDown(e, cb){
      if(e.key === "Enter"){
         cb();
      }
    }

  
  return (
    <div className="relative group aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]">
      <img
        src={product.image}
        alt={product.title}
        className="z-0 h-full w-full rounded-md object-cover"
      />
      <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute bottom-4  left-4 text-left">
        {!editTitle && (
          <h1
            className="text-lg font-semibold text-white"
            role="button"
            onClick={enableInput}
          >
            {title}
          </h1>
        )}
        {editTitle && (
          <input
            ref={inputRef}
            value={title}
            className="bg-transparent w-full outline-none"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={disableInput}
            onKeyDown={e => handleKeyDown(e, disableInput)}
          />
        )}
        {!editDesc && (
          <p
            role="button"
            onClick={enableDesc}
            className="mt-2 md:block hidden text-sm text-gray-300"
          >
            {product.description.length > 200
              ? product.description.slice(0, 200) + "..."
              : product.description}
          </p>
        )}

        {editDesc && (
          <textarea
            ref={textRef}
            value={description}
            
            className="bg-transparent resize-none w-full outline-none"
            onChange={(e) => setDescription(e.target.value)}
            onBlur={disableDesc}
            onKeyDown={e => handleKeyDown(e, disableDesc)}
          />
        )}
        <div className="flex items-center w-full justify-between">
          <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
            Shop Now &rarr;
          </button>
          <div className="bg-slate-500/10 p-4 rounded-full group-hover:opacity-100 mr-4 opacity-0">
            <Trash
              onClick={removeProduct}
              role="button"
              className="h-5 w-5 text-red-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

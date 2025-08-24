import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import type { FoodData, FoodDataCreate } from "../../interface/FoodData";

import "./modal.css";

interface InputProps {
  labelText: string;
  value: string | number;
  updateValue(value: any): void;
}

interface ModalProps{
    closeModal(): void;
}

const Input = ({ labelText, value, updateValue }: InputProps) => {
  return (
    <div>
      <label>{labelText}</label>
      <input 
        value={value} 
        onChange={(event) => updateValue(event.target.value)} 
      />
    </div>
  );
};
 
export function CreateModal( {closeModal}: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const {mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
       const foodData: FoodDataCreate = {
         title, 
         price,
         image
       }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    },[isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>

                <form className="input-container">
                         <Input 
                        labelText="Nome do produto" 
                        value={title} 
                        updateValue={setTitle} 
                    />
                    <Input 
                        labelText="Preço" 
                        value={price} 
                        updateValue={setPrice} 
                    />
                    <Input 
                        labelText="Imagem (URL)" 
                        value={image} 
                        updateValue={setImage} 
                    />
                  
                </form>

                <button onClick={submit} className="btn-secondary">
                    {isPending  ? 'postando...' : 'postar'}
                </button>

            </div>
        </div>
    )
}
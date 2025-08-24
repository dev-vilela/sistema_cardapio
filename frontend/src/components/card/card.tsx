import "./card.css"
import { useFoodDataDelete } from "../../hooks/useFoodDataDelete"
import { useState } from "react"
import { DeleteModal } from "../delete-modal/DeleteModal"

interface CardProps{
    id: number,
    price: number,
    title: string,
    image:string
}


export function Card({ id, price, image, title }: CardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="card">
      <img src={image} />
      <h2>{title}</h2>
      <p><b>Valor:</b> {price}</p>

    
    </div>
  );
}

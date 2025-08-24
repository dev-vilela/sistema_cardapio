import './App.css'
import { Card } from './components/card/card'
import type { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData'
import { useState } from 'react';
import { CreateModal } from './components/create-modal/create-modal';
import { DeleteModal } from './components/delete-modal/DeleteModal'; 

function App() {
  const { data } = useFoodData();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenCreate = () => setIsCreateOpen(prev => !prev);
  const handleOpenDelete = () => setIsDeleteOpen(prev => !prev);

  return (
    <div className='container'>
      <h1>Cardápio</h1>

      {/* Botões alinhados um à esquerda e outro à direita */}
      <div className="actions">
        <button onClick={handleOpenDelete} className="btn-delete">Deletar</button>
        <button onClick={handleOpenCreate} className="btn-create">Novo</button>
      </div>

      {/* Grid dos cards */}
      <div className="card-grid">
        {data?.map(foodData => 
          <Card 
            key={foodData.id}
            id={foodData.id}
            price={foodData.price}  
            title={foodData.title} 
            image={foodData.image} 
          />
        )}
      </div>

      {/* Modais */}
      {isCreateOpen && <CreateModal closeModal={handleOpenCreate} />}
      {isDeleteOpen && <DeleteModal closeModal={handleOpenDelete} />}
    </div>
  )
}

export default App

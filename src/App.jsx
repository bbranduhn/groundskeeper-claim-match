import { useState } from 'react';
import './App.css';

function App() {
  const dropZones = [
    {id: 0, title: 'To Do'}, 
    {id: 1, title: 'In Progress'},
    {id: 2, title: 'Done'},
  ];

  // Each card tracks which dropZone it currently lives in
  const [cards, setCards] = useState([
    { id: 'card-1', label: 'Match Item 1', zone: 0 },
    { id: 'card-2', label: 'Match Item 2', zone: 0 },
    { id: 'card-3', label: 'Match Item 3', zone: 1 },
  ]);

  const [draggedCardId, setDraggedCardId] = useState(null);
  const [hoverZone, setHoverZone] = useState(null);

  const handleDrop = (e, targetZone) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
    if (!cardId) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, zone: targetZone } : card
      )
    );

    setHoverZone(null);
    setDraggedCardId(null);
  };

  return (
    <div className="app">
      <div className='boardContainer'>
        <h1 className="boardTitle"> Groundkeeper Board </h1>

        <div className = "boardColumns">
        {dropZones.map((zone) => {
          const zoneCards = cards.filter((card) => card.zone === zone.id);

          return (
            <div
              key={zone.id}
              className={`dropZone ${hoverZone === zone.id ? 'hoverOver' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                if (hoverZone !== zone.id) {
                  setHoverZone(zone.id);
                }
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setHoverZone(null);
                }
              }}
              onDrop={(e) => handleDrop(e, zone.id)}
            >
              <h2 className='zoneTitle'>
                {zone.title} ({zoneCards.length})
              </h2>
              {zoneCards.map((card) => (
                <div
                  key={card.id}
                  className={`dragElement ${
                    draggedCardId === card.id ? 'beingDragged' : ''
                  }`}
                  draggable
                  onDragStart={(e) => {
                    setDraggedCardId(card.id);
                    e.dataTransfer.setData('text/plain', card.id);
                  }}
                  onDragEnd={() => {
                    setDraggedCardId(null);
                    setHoverZone(null);
                  }}
                >
                  <h3>{card.label}</h3>
                </div>
              ))}
            </div>  
        );
      })}
        </div>
      </div>
    </div>
  );
}

export default App;
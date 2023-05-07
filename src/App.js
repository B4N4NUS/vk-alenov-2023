import { useEffect, useState, createContext } from 'react';
import './App.css';
import './index.css'
import FormLineSelector from './components/FormLineSelector';
import { options } from './misc/DefaultOptions'

function App() {
  const [open, setOpen] = useState(false)
  const [userSelection, setUserSelection] = useState({
    tower: null,
    floor: null,
    place: null,
    date: null,
    time: null,
    comment: null,
  })

  const clear = () => {
    setUserSelection({
      tower: null,
      floor: null,
      place: null,
      date: null,
      time: null,
      comment: null,
    })
  }

  const changeTower = (index) => {
    setUserSelection({ ...userSelection, tower: index })
  }

  const changeFloor = (index) => {
    setUserSelection({ ...userSelection, floor: index })
  }

  const changePlace = (index) => {
    setUserSelection({ ...userSelection, place: index })
  }

  const changeComment = (text) => {
    setUserSelection({ ...userSelection, comment: text })
  }

  return (
    <div className='mainContainer' onClick={() => { setOpen(false) }}>
      <div className={open ? 'formButtonOpen' : 'formButtonClosed'} onClick={(e) => {
        e.stopPropagation()
        if (!open) {
          setOpen(true)
        }
      }}>
        <div className={open ? 'formContainer' : "formButtonContainer"}>
          <div className={open ? 'formHeader' : 'formButtonHeader'}>
            Забронировать переговорную
          </div>
          {open && <div className='formIntarectableContainer'>
            <FormLineSelector emptyText={"Башня"} variants={options.towers.map((val) => val.nickname)} setSelection={changeTower} lastSelection={userSelection.tower}/>
            <FormLineSelector emptyText={"Этаж"} variants={options.towers[0].floors.map((val) => val.number)} setSelection={changeFloor} lastSelection={userSelection.floor}/>
            <FormLineSelector emptyText={"Переговорочная"} variants={options.towers[0].floors[0].place} setSelection={changePlace} lastSelection={userSelection.place}/>

          </div>
          }
        </div>
      </div>
      {<div className={!open ? "autograph agVisible" : "autograph agHidden"}>
        Стажировка ВК 2023 <br />
        Аленов Михаил Константинович
      </div>}
    </div>
  );
}

export default App;

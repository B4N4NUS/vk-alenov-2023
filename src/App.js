import { useState } from 'react';
import './App.css';
import './index.css'
import FormSelector from './components/FormSelector';
import { options } from './misc/DefaultOptions'
import FormButton from './components/FormButton';
import Cross from './assets/Cross';
import Arrow from './assets/Arrow';
import FormComment from './components/FormComment';
import FormDatePicker from './components/FormDatePicker';
import FormTimePicker from './components/FormTimePicker';


function App() {
  const [open, setOpen] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const [userSelection, setUserSelection] = useState({
    tower: null,
    floor: null,
    place: null,
    date: null,
    time: null,
    duration: null,
    comment: null,
  })

  const clear = () => {
    highlightMainContainer(false)
    setUserSelection({
      tower: null,
      floor: null,
      place: null,
      date: null,
      time: null,
      duration: null,
      comment: null,
    })
  }

  const highlightMainContainer = (isError) => {
    setShowEffect(isError == 2 ? 2 : 1)
    setTimeout(() => {
      setShowEffect(0)
    }, 500)
  }

  const submit = () => {
    if (userSelection.tower !== null && userSelection.floor !== null && userSelection.place !== null && userSelection.date !== null && userSelection.time !== null && userSelection.duration !== null) {
      highlightMainContainer(1)
      console.log("USER SELECTION IN RAW JSON FORMAT\n  " + JSON.stringify(userSelection) + "\n\n")
      console.log("USER SELECTION IN HUMAN FORMAT\n" +
        "  Tower: " + options.towers[userSelection.tower].nickname + "\n" +
        "  Floor: " + options.towers[userSelection.tower].floors[userSelection.floor].number + "\n" +
        "  Place: " + options.towers[userSelection.tower].floors[userSelection.floor].place[userSelection.place] + "\n" +
        "  Date: " + userSelection.date.day + "." + userSelection.date.month + "." + userSelection.date.year + "\n" +
        "  Time: " + userSelection.time.hours + ":" + userSelection.time.minutes + "\n" +
        "  Duration " + options.durations[userSelection.duration] + "\n" +
        "  Comment: " + userSelection.comment + "\n\n"
      )
      let expData = {
        tower: options.towers[userSelection.tower].nickname,
        floor: options.towers[userSelection.tower].floors[userSelection.floor].number,
        place: options.towers[userSelection.tower].floors[userSelection.floor].place[userSelection.place],
        dateStart: new Date(userSelection.date.year, userSelection.date.month, userSelection.date.day, options.hourIntervals[userSelection.time.hours], options.minuteIntervals[userSelection.time.minutes]),
        dateEnd: new Date((new Date(userSelection.date.year, userSelection.date.month, userSelection.date.day, options.hourIntervals[userSelection.time.hours], options.minuteIntervals[userSelection.time.minutes])).getTime() + options.durations[userSelection.duration].minutes * 60000),
        comment: userSelection.comment ? userSelection.comment : ""
      }
      console.log("VALIDATED USER SELECTION IN JSON FORMAT FOR EXPORT\n " + JSON.stringify(expData))
    } else {
      highlightMainContainer(2)
      console.log("Cant Submit Until All Fields Are Filled")
    }

  }

  const changeTower = (index) => {
    setUserSelection({ ...userSelection, tower: index, floor: null, place: null })
  }

  const changeFloor = (index) => {
    setUserSelection({ ...userSelection, floor: index, place: null })
  }

  const changePlace = (index) => {
    setUserSelection({ ...userSelection, place: index })
  }

  const changeDate = (year, month, day) => {
    setUserSelection({ ...userSelection, date: { year: year, month: month, day: day } })
  }

  const changeTime = (hours, minutes) => {
    setUserSelection({ ...userSelection, time: { hours: hours, minutes: minutes } })
  }

  const changeComment = (text) => {
    setUserSelection({ ...userSelection, comment: text })
  }

  const changeDuration = (time) => {
    console.log(time)
    setUserSelection({ ...userSelection, duration: time })
  }

  return (
    <div className={(showEffect ? (showEffect === 1 ? "highlightEdge" : "highlightEdgeError") : "") + ' mainContainer'} onClick={() => { setOpen(false) }}>
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
          {open && <div>
            <div className='formIntarectableContainer'>
              <FormSelector
                emptyText={"Башня"}
                variants={options.towers.map((val) => val.nickname)}
                setSelection={changeTower}
                lastSelection={userSelection.tower}
                defaultSelectionText={"Выберите Башню..."}
              />
              <FormSelector
                emptyText={"Этаж"}
                variants={userSelection.tower !== null ? options.towers[userSelection.tower].floors.map((val) => val.number) : null}
                setSelection={changeFloor}
                lastSelection={userSelection.floor}
                grid={true}
                defaultSelectionText={"Выберите Этаж..."}
                prefixText={"Этаж "}
                errorText={"Не Указана Башня"}
              />
              <FormSelector
                emptyText={"Переговорная"}
                variants={userSelection.tower !== null && userSelection.floor !== null ? options.towers[userSelection.tower].floors[userSelection.floor].place : null}
                setSelection={changePlace}
                lastSelection={userSelection.place}
                grid={true}
                defaultSelectionText={"Выберите Переговорную"}
                prefixText={"Переговорная "}
                errorText={"Не Указан Этаж"}
              />
              <FormDatePicker
                emptyText={"Дата бронирования"}
                defaultSelectionText={"Выберите дату бронирования"}
                setSelection={changeDate}
                lastSelection={userSelection.date}
                daysNames={options.daysNames}
                prefixText={'Бронь на '}
              />
              <FormTimePicker
                maxValue={(userSelection.timeEnd && userSelection.timeEnd.hours !== null) ? { hours: userSelection.timeEnd.hours, minutes: userSelection.timeEnd.minutes } : { hours: 23, minutes: 3 }}
                lastSelection={userSelection.time}
                setSelection={changeTime}
                emptyText={"Время начала"}
                prefixText={"Начало в "}
                defaultSelectionText={"Введите время"}
                hourIntervals={options.hourIntervals}
                minuteIntervals={options.minuteIntervals}

              />
              <FormSelector
                emptyText={"Длительность"}
                variants={options.durations.map((x) => (x.desc))}
                setSelection={changeDuration}
                lastSelection={userSelection.duration}
                defaultSelectionText={"Выберите длительность"}
                prefixText={"Длительность "}
                errorText={""}
              />

              <FormComment setText={changeComment} lastText={userSelection.comment} />
              <div style={{ height: "80px" }} />
            </div>

            <div className='formButtonWrapper'>
              <FormButton
                textFirst={false}
                text={"Очистить"}
                image={<Cross id={"icon"} />}
                previewImage={<Cross id={'previewIcon'} />}
                doClick={clear}
              />
              <div style={{ flex: 1, minWidth: 5 }} />
              <FormButton
                textFirst={true}
                text={"Отправить"}
                image={<Arrow id={"icon"} />}
                previewImage={<Arrow id={'previewIcon'} />}
                doClick={submit}
              />
            </div>
          </div>}
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

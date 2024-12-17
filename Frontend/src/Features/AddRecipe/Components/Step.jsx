

export default function Step({recipeDispatch, s, instruction, provided}){


    const removeNullNumber = (e) => {
        if(e.currentTarget.value === "-"){
            e.currentTarget.value = ""
        }
    }
    const addNullNumber = (e) => {
        if(e.currentTarget.value === "" || e.currentTarget.value === "0"){
            e.currentTarget.value = "-"
        }
    }

    return(
        <div 
            ref={provided.innerRef} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${s.step}`}
            style={{...provided.draggableProps.style}}
        >
            <button className={s.moove}><i className="fa-solid fa-grip-vertical"></i></button>
            <button onClick={() => recipeDispatch({type:"DELETE_INSTRUCTION", payload:instruction.id})} className={s.delete}><i className="fa-solid fa-xmark"></i></button>
            <input onChange={() => null} className={`${s.stepNumber} ${s.light}`} type="number" value={instruction.step} />
            <input required onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_SENTENCE", payload:{id:instruction.id, sentence:e.currentTarget.value}})} className={`${s.instruction} ${s.dark}`} type="text" value={instruction.sentence} />
            <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_HOURs", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={instruction.hours} onFocus={removeNullNumber} type="text" />
            <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_MINUTES", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={instruction.minutes} onFocus={removeNullNumber} type="text" />
            <input onChange={(e) => recipeDispatch({type:"SET_INSTRUCTION_SECONDES", payload:{id:instruction.id, value:e.currentTarget.value}})} className={`${s.light} ${s.duration}`} onBlur={addNullNumber} value={instruction.secondes} onFocus={removeNullNumber} type="text" />
        </div>
    )
}
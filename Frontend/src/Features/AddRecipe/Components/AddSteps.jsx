import Step from "./Step";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function AddSteps({recipeState, recipeDispatch, s}){


    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(recipeState.instructions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        recipeDispatch({type:"REORDER_INSTRUCTIONS", payload:items})
        return
    }
    

    return(
        <div className={`${s.section} ${s.steps}`}>

            <label htmlFor="">Instructions</label>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={`${s.container}`}>
                            <div className={`${s.informations} ${s.steps}`}>
                                <span>H.</span>
                                <span>Min.</span>
                                <span>Sec.</span>
                            </div>
                            
                            {recipeState.instructions.map((instruction, index) => (
                                <Draggable key={instruction.id} draggableId={String(instruction.id)} index={index}>
                                    {(provided) => (
                                        <Step 
                                            key={instruction.id}
                                            provided = {provided}
                                            instruction={instruction} 
                                            recipeDispatch={recipeDispatch} 
                                            s={s}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <button className={s.add} onClick={() => recipeDispatch({type:"ADD_INSTRUCTION"})}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    )}


                </Droppable>
            </DragDropContext>
        </div>
    )
}
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const resetEl = document.getElementById("reset");
const addCounterEl = document.getElementById("addCounter");
const fullCounterEl = document.getElementById("full-counter");


function addFunction (){
    const divElem= document.createElement("div");

   divElem.innerHTML =` <div class="max-w-md mx-auto mt-10 space-y-5" id="full-counter">
    <div
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
    >
        <div class="text-2xl font-semibold" id="counter">0</div>
        <div class="flex space-x-3">
            <button
                class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                id="increment"
            >
                Increment
            </button>
            <button
                class="bg-red-400 text-white px-3 py-2 rounded shadow"
                id="decrement"
            >
                Decrement
            </button>

           
        </div>
    </div>
    
    
   
</div>`;
    // divElem.appendChild(allElm);
    document.getElementById("full-counter").appendChild(divElem)

}

// action identifiers 

const INCREMENT ='increment';
const DECREMENT ='decrement';
const RESET ='reset';

// action creators  


const increment= (value)=>{
    return{
        type:INCREMENT,
        payload:value
    }
}
const decrement= (value)=>{
    return{
        type:DECREMENT,
        payload:value
    }
}
const reset= (value)=>{
    return{
        type:RESET,
        payload:value
    }
}

// initial state 

const initialState = {
    value:2
}

// create reducer function  

function counterReducer (state= initialState,action){
    if(action.type === INCREMENT){
            return{
                ...state,
                value: state.value + action.payload
            }
        

        
    }

    else if(action.type === DECREMENT){
        if(state.value === 0){
            return {
                value:0
            }
         }
         else{
            return{
                ...state,
                value: state.value - action.payload
            
           
        }
         }
        
    }
   else if(action.type === RESET){
    return{
        value:action.payload
    }

   }
    else{
        return state
    }

}

// create store  

const store = Redux.createStore(counterReducer);

const render = ()=>{
    const state = store.getState();
    counterEl.innerText = state.value.toString();
}
render()

store.subscribe(render)





// button handler  

incrementEl.addEventListener("click",()=>{
    store.dispatch(increment(5))
})

decrementEl.addEventListener("click",()=>{
    store.dispatch(decrement(1))
})
resetEl.addEventListener("click",()=>{
    store.dispatch(reset(2))
})
const resetEl = document.getElementById("reset");
const addCounterEl = document.getElementById("addCounter");
const fullCounterEl = document.getElementById("full-counter");

// action identifiers 
const ADD_COUNTER='add_counter';
const INCREMENT ='increment';
const DECREMENT ='decrement';
const RESET ='reset';



// action creators  

const addCounter = () =>{
    return {
        type: ADD_COUNTER,
        payload: {
          id: store.getState().totalCounters,
          value: 0,
          increment: Math.floor(Math.random() * 10) + 1,
          decrement: Math.floor(Math.random() * 10) + 1,
        },
      };

}
const incrementAction= (id)=>{
    return{
        type:INCREMENT,
        payload:{
            id:id,
        }
    }
}
const decrementAction= (id)=>{
    return{
        type:DECREMENT,
        payload:{
            id:id
        }
    }
}
const reset= ()=>{
    return{
        type:RESET,
       
    }
}


// initial state 

let initialState = {
    counters:[
       { 
        id: 0,
        value: 0,
        increment: Math.floor(Math.random() * 10) + 1,
        decrement: Math.floor(Math.random() * 10) + 1,
       }

    ],
    totalCounters : 1
    
    
};


// create store  

const store = Redux.createStore(counterReducer);


// add new counter  
const  addNewCounter = ()=>{
    const divElem= document.createElement("div");
    store.getState().counters.forEach((counter) =>{
        divElem.innerHTML =`<div
         
        class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
      >
        <div 
          id="${counter.id + 1}"
        class="text-2xl font-semibold">
          ${counter.value}
        </div>
        <div class="flex space-x-3">
          <button
              id="increment-${counter.id}"
              onclick="increment('${counter.id + 1}', '${
                counter.increment
  }')"
           class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
            Increment By ${counter.increment}
          <button 
              id="decrement-${initialState.counters + 1}"
              onclick="decrement('${counter.id + 1}', '${
    counter.decrement
  }')"
          class="bg-red-400 text-white px-3 py-2 rounded shadow">
            Decrement By ${counter.decrement}
          </button>
        </div>
      </div>
  `;

    })

   
    // divElem.appendChild(allElm);
    fullCounterEl.appendChild(divElem)

}

const resetAllCounter = () => {
    fullCounterEl.innerHTML = "";
    store.getState().counters.map((counter) => {
      const newCounter = document.createElement("div");
      newCounter.innerHTML = `
     <div
           
            class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
          >
            <div 
              id="${counter.id + 1}"
            class="text-2xl font-semibold">
              ${counter.value}
            </div>
            <div class="flex space-x-3">
              <button
                  id="increment-${counter.id}"
                  onclick="increment('${counter.id + 1}', '${
        counter.increment
      }')"
               class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
                Increment By ${counter.increment}
              <button 
                  id="decrement-${initialState.counters + 1}"
                  onclick="decrement('${counter.id + 1}', '${
        counter.decrement
      }')"
              class="bg-red-400 text-white px-3 py-2 rounded shadow">
                Decrement By ${counter.decrement}
              </button>
            </div>
          </div>
      `;
      fullCounterEl.appendChild(newCounter);
    });
  };







// create reducer function  

function counterReducer (state= initialState,action){
    if(action.type === ADD_COUNTER){
            return{
                counters:[
                    ...state.counters,
                ,action.payload
                ],
                totalCounters:state.totalCounters + 1 ,
            }
        

        
    }
     if(action.type === INCREMENT){
        return {
            ...state,
            counters: state.counters.map((counter) => {
              if (counter.id + 1 === Number(action.payload.id)) {
                return {
                  ...counter,
                  value: counter.value + counter.increment,
                };
              } else {
                return counter;
              }
            }),
          };
        

        
    }

    if(action.type === DECREMENT){
        return {
            ...state,
            counters: state.counters.map((counter) => {
              if (counter.id + 1 === Number(action.payload.id)) {
      
                return {
                  ...counter,
                  value: counter.value - counter.decrement,
                };
              } else {
                return counter;
              }
            }),
          };
        
    }
  if(action.type === RESET){
    return {
        ...state,
        counters: state.counters.map((counter) => {
          return {
            ...counter,
            value: 0,
          };
        }),
      };
   }
   
 return state
   

}



//Subscribe to store changes
store.subscribe(() => {
    console.log(store.getState());
  });
  
  //Initial render
  addNewCounter();

// const render = ()=>{
//     const state = store.getState();
//     counterEl.innerText = state.value.toString();
// }
// render()

// store.subscribe(render)





// button handler  

addCounterEl.addEventListener("click",()=>{
    store.dispatch(addCounter());
    addNewCounter()

})


resetEl.addEventListener("click",()=>{
    store.dispatch(reset());
    resetAllCounter()
})


function incrementHandler(id, increment) {
    store.dispatch(incrementAction(id));
    document.getElementById(id).innerText =
      Number(document.getElementById(id).innerText) + Number(increment);
  }
  
  function decrementHandler(id, decrement) {
    store.dispatch(decrementAction(id));
    document.getElementById(id).innerText =
      Number(document.getElementById(id).innerText) - Number(decrement);
  }
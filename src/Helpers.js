const addToNestedArray = (state, key, value) => {
  if(!Array.isArray(state[key])) {
    state[key] = [];
  }
  state[key].push(value);
  return {...state};
};

const removeFromNestedArray = (state, key, value) => {
  if(!Array.isArray(state[key])) {
    state[key] = [];
  }
  state[key] = state[key].filter(item => item !== value);
  return {...state};
};

const onChangeNestedArray = (state, i, key, value) => {
  const newState = [ ...state ];
  newState[i] = { ...newState[i], [key]: value };

  return newState;
};

const onChangeDoubleNestedArray = (state, indexes = [], keys = [], value) => {
  const newState = [ ...state ];
  if(indexes.length !== keys.length) {
    return newState;
  }
  switch (indexes.length) {
    case 1: {
      newState = newState[indexes[0]][keys[0]] = value;
    }
    case 2: {
      newState = newState[indexes[0]][keys[0]][indexes[1]][keys[1]] = value;
    }
    case 3: {
      newState = newState[indexes[0]][keys[0]][indexes[1]][keys[1]][indexes[2]][keys[2]] = value;
    }
    default: {
      newState = newState;
    }
  }
  return newState;
};

const removeFromDoubleNestedArray = (state, childIndex, parentIndex, childKey) => {
  const newState = [ ...state ];
  newState[parentIndex][childKey].splice(childIndex, 1);
  return newState;
};

const addToNestedArrayOfArray = (state, i, target, value) => {
  const newState = [ ...state ];
  newState[i][target].push(value);
  return newState;
};

export {
  addToNestedArray,
  removeFromNestedArray,
  onChangeNestedArray,
  onChangeDoubleNestedArray,
  removeFromDoubleNestedArray,
  addToNestedArrayOfArray
};

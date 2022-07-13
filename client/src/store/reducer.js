const initialState = {
  data: { auth: null },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set_user":
      return { data: action.payload.data };
    case "delete_user":
      return { data: { auth: null } };
    default:
      return { data: state.data };
  }
}

export default reducer;

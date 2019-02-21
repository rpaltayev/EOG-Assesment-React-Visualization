import * as actions from "../actions";

const initialState = {
  loading: false,
  latitude: null,
  longitude: null,
  metric: null,
  metricsData: [],
};

const startLoading = (state, action) => {

  return { ...state, loading: true };
};

const droneDataReceived = (state, action) => {

  const { data } = action.data;
  let l = data.length - 1;

  return {
    ...state,
    loading: false,
    metric: data[l].metric,
    latitude: data[l].latitude,
    longitude: data[l].longitude,
    metricsData: data
  };
};

const handlers = {
  [actions.FETCH_DRONE]: startLoading,
  [actions.DRON_DATA_RECEIVED]: droneDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};

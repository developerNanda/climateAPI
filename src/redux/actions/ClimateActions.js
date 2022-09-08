

import ClimateService from "../../axios/services/ClimateService";
import { GET_CLIMTAE_DATA } from "./type";

export const getClimateData = (data, isF) => async (dispatch) => {
  try {
    const res = await ClimateService.getAll(data, isF);
    console.log(res);
    dispatch({
      type: GET_CLIMTAE_DATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
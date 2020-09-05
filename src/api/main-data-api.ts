import axios, {AxiosPromise} from "axios";
import {ResponseFromBack} from "../types/types";

export default class MainDataApi {
  getScheduleEntity = <R>(props: {url: string; token: string; data?: any}): AxiosPromise<ResponseFromBack<R>> => {
    const {
      url,
      token = '',
      data = null,
    } = props;

    return axios.get(url, {headers: {"Authorization": `Bearer ${token}`}, params: data})
      .then((response) => response)
      .catch((error) => error.response);
  };

  postScheduleEntity = <R>(props: {url: string; token: string; data?: any}): AxiosPromise<ResponseFromBack<R>> => {
    const {
      url,
      token,
      data = null,
    } = props;

    return axios.post(url, data, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => response)
      .catch((error) => error.response);
  };

  putScheduleEntity = <R>(props: {url: string; token: string; data?: any}): AxiosPromise<ResponseFromBack<R>> => {
    const {
      url,
      token,
      data,
    } = props;

    return axios.put(url, data, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => response)
      .catch((error) => error.response);
  };

  removeScheduleEntity = <R>(props: {url: string; token: string}): AxiosPromise<ResponseFromBack<R>> => {
    const {
      url,
      token,
    } = props;

    return axios.delete(url, {headers: {"Authorization": `Bearer ${token}`}})
      .then((response) => response)
      .catch((error) => error.response);
  };
}

import {Dispatch} from "redux";
import {asyncThunkTypePrefix, getAsyncThunk, ReduxStateEntities} from "../../reducers/reducers-config";
import {ParsedResponse} from "../../types/types";
import {makeFirstUpper} from "../../utils/make-frst-upper/make-frst-upper";

interface UseGettingEntityProps {
  currentEntity: ReduxStateEntities;
  data?: any;
  dispatch: Dispatch<any>;
  fetchFn: (props: any) => Promise<ParsedResponse<any>>;
}

export const dispatchEntityHelper = async (props: UseGettingEntityProps): Promise<any> => {
  const {
    currentEntity,
    data,
    dispatch,
    fetchFn,
  } = props;

  const typePrefix = `${asyncThunkTypePrefix}${makeFirstUpper(currentEntity)}`;
  const dispatchFn = getAsyncThunk({typePrefix});

  return dispatch(dispatchFn({fetchFn, data}));
};

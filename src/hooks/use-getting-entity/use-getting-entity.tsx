import * as React from "react";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {dispatchEntityHelper} from "../../helpers/dispatch-entity-helper/dispatch-entity-helper";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {ParsedResponse} from "../../types/types";

interface UseGettingEntityProps {
  currentEntity: ReduxStateEntities;
  fetchFn: (props: any) => Promise<ParsedResponse<any>>;
  data?: any;
}

const useGettingEntity = (props: UseGettingEntityProps): RootState => {
  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state);
  const history = useHistory();
  const fetchData = React.useCallback(() => dispatchEntityHelper({...props, dispatch}), [props]);

  React.useEffect(() => {
    const tmp = async () => {
      return await fetchData();
    };
    tmp();
  }, [history]);

  return rootState;
};

export default useGettingEntity;

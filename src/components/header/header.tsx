import * as React from "react";
import {Row, Col, Select} from "antd";
import {LOGO, timeZones} from "../../config"
import {headerSC as SC} from "./sc";
import {SelectValue} from "antd/lib/select";
import {TimeZone} from "../../types/types";
import {MainDataContext} from "../../context/main-data-context";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {dispatchEntityHelper} from "../../helpers/dispatch-entity-helper/dispatch-entity-helper";
import {useDispatch, useSelector} from "react-redux";
import {selectUserRole, selectUserTimeZone} from "../../selectors/selectors";
import {userSettingsReducerData} from "../../reducers/root-reducer";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const {
    getUserSettings,
    setUserSettings,
  } = React.useContext(MainDataContext);

  const currentTimeZone = useSelector(selectUserTimeZone) || userSettingsReducerData.initialState.data.timeZone;
  const currentUserRole = useSelector(selectUserRole);

  const handleTimeZoneChange = (evt: SelectValue) => {
    setUserSettings({timeZone: evt})
      .then(() => dispatchEntityHelper({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, dispatch}));
  };

  const handleUserTypeChange = (evt: SelectValue) => {
    setUserSettings({userRole: evt})
      .then(() => dispatchEntityHelper({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, dispatch}));
  };

  const getTimeZoneOption = (data: TimeZone[]) => {
    return data.map((timeZone) => {
      return (
        <Select.Option
          value={timeZone.TITLE}
          key={timeZone.TITLE}>
          {timeZone.TITLE}
        </Select.Option>
      );
    })
  };

  const getTimeZoneSelect = React.useCallback((currentValue: string) => {
    return (
      <SC.TIME_ZONE_SELECT
        size="large"
        value={currentValue}
        onChange={handleTimeZoneChange}
      >
        {getTimeZoneOption(timeZones)}
      </SC.TIME_ZONE_SELECT>
    );
  }, []);

  const getUserTypeSelect = React.useCallback((defaultValue: string) => {
    return (
      <Select
        size="large"
        value={defaultValue}
        onChange={handleUserTypeChange}
      >
        <Select.Option value="student">
          Student
        </Select.Option>
        <Select.Option value="mentor">
          Mentor
        </Select.Option>
      </Select>
    );
  }, []);

  return (
    <header>
      <Row>
        <Col
          xs={12}
          lg={8}
        >
          <SC.LOGO
            src={LOGO.src}
            alt={LOGO.alt}
          />
        </Col>

        <Col
          xs={{span: 24, order: 3,}}
          lg={{span: 8, order: 2}}
        >
          <SC.TITLE level={2}>
            Schedule
          </SC.TITLE>
        </Col>

        <SC.ROLE
          xs={{span: 12, order: 2}}
          lg={{span: 8, order: 3}}
        >
          {getUserTypeSelect(currentUserRole)}
        </SC.ROLE>

        <Col
          xs={{span: 24, order: 4}}
          lg={{span: 8, order: 4}}
        >
          {getTimeZoneSelect(currentTimeZone)}
        </Col>
      </Row>
    </header>
  );
};

export default Header;

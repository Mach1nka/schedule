import {statusCodes} from "../../config";

export const isStatusOk = (data: any): boolean => !!(data && data?.payload?.status === statusCodes.OK);

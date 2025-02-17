import { PaginatedResult, ServerResponse } from "@/common/types";
import {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface AsyncThunkConfig {}

type Res<S, R> = {
  state: S;
  action: PayloadAction<AxiosResponse<PaginatedResult<any>>>;
  res: AxiosResponse<Omit<Res<S, R>, "state" | "res" | "action">>;
  arg: any;
  requestId: string;
  requestStatus: "fulfilled";
} & ServerResponse<R>;

type CustomLogic<S, R> = {
  pending?: (state: S, action: PayloadAction<any>) => void;
  rejected?: (state: S, action: PayloadAction<any>) => void;
  fulfilled?: (res: Res<S, R>) => void;
};

const returnBuilder = <S, R>(
  builder: ActionReducerMapBuilder<any>,
  request: AsyncThunk<AxiosResponse<any, any>, any, AsyncThunkConfig>,
  name: string,
  customLogic: CustomLogic<S, R>,
  showSuccessMessage = false,
  showErrorMessages = true
) => {
  builder.addCase(request.pending, (state, action) => {
    if (!action.meta.arg?.showNoLoading) {
      state.requests[name].inProgress = true;
    }
    state.requests[name].success = false;
    if (customLogic?.pending) {
      customLogic.pending(state, action);
    }
  });
  builder.addCase(request.rejected, (state, action: any) => {
    if (showErrorMessages) {
      //   fireErrorToast(action?.payload?.response);
    }
    if (customLogic?.rejected) {
      customLogic?.rejected(state, action);
    } else {
      state.requests[name].inProgress = false;
      state.requests[name].error = action.error;
    }
  });
  builder.addCase(request.fulfilled, (state, action) => {
    state.requests[name].inProgress = false;
    state.requests[name].success = true;

    if (showSuccessMessage) {
      //   fireSuccessToast(action.payload);
    }

    const { data, message, path, status, statusCode } = action.payload
      .data as any;
    const { arg, requestId, requestStatus } = action.meta;
    state.requests[name].data = data;
    if (customLogic?.fulfilled) {
      customLogic.fulfilled({
        state,
        data,
        res: action.payload.data,
        message,
        path,
        status,
        statusCode,
        action,
        arg,
        requestId,
        requestStatus,
      });
    }
  });
};

type ReducerSliceState = {
  requests: {};
};

export const createRequestBuilderAuth = <
  D,
  K extends keyof ReducerSliceState["requests"] = keyof ReducerSliceState["requests"]
>(
  builder: ActionReducerMapBuilder<ReducerSliceState>,
  request: AsyncThunk<AxiosResponse<D, any>, any, AsyncThunkConfig>,
  name: K,
  customLogic: CustomLogic<ReducerSliceState, D> = {},
  options?: {
    showSuccessMessage?: boolean;
    showErrorMessages?: boolean;
  }
) =>
  returnBuilder(
    builder,
    request,
    name,
    customLogic,
    options?.showSuccessMessage,
    options?.showErrorMessages
  );

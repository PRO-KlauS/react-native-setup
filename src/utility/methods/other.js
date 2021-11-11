import { useState, useRef, useEffect } from "react";
import { Toast } from "native-base";
import {
  APP_ENV,
  LOCAL_API_URL,
  STAGING_API_URL,
  PRODUCTION_API_URL,
} from "@env";
import { colors } from "../../styles";

const showToast = (
  text,
  style,
  duration,
  buttonText,
  type,
  textStyle,
  buttonTextStyle,
  buttonStyle,
) => {
  text &&
    Toast.show({
      text,
      buttonText,
      type,
      textStyle,
      buttonTextStyle,
      buttonStyle,
      position: "bottom",
      duration: duration || 3000,
      style: [
        {
          backgroundColor: colors.backgroundDarkGray,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 8,
        },
        style,
      ],
    });
};

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = (state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

const getAPIBaseURL = () => {
  if (APP_ENV === "local") {
    return LOCAL_API_URL;
  }
  if (APP_ENV === "staging") {
    return STAGING_API_URL;
  }
  if (APP_ENV === "production") {
    return PRODUCTION_API_URL;
  }
  return LOCAL_API_URL;
};

export { showToast, useStateCallback, getAPIBaseURL };

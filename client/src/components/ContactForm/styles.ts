import { TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    padding: 20,
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    width: "80%",
    height: 50,
    textAlign: "left",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 16,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
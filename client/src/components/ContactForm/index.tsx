import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";
import { customStyles, StyledTextField } from "../ContactForm/styles";

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Contact, FormType, Result } from "../../types/contact";
import { addContact } from "../../store/actions/contacts";
import { store } from "../..";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(5, "Last Name must be at least 6 characters")
    .max(20, "Last Name must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone is required")
    .min(6, "Phone must be at least 6 characters")
    .max(15, "Phone must not exceed 40 characters"),

  //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactType: { value: "", label: "" },
  active: false,
};

const ContactForm = (props: Result) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormType) => {
    console.log(JSON.stringify(data, null, 2));
    const contact = Object.assign(
      {},
      {
        name: {
          first: data.firstName,
          last: data.lastName,
        },
        email: data.email,
        phone: data.phone,
      }
    );
    dispatch(addContact(contact));
    reset(initialState);
  };

  const handleChange = (email: string) => {
    const items = store.getState().contacts.items;
    if(items.find((item: Contact) => item.email === email)){
      setError("email", {
        type: "manual",
        message: "This email already exist",
      });
    }else{
      clearErrors('email');
    }
  } 

  
  return (
    <>
      <Box px={3} py={2}>
        <Paper sx={{ height: "calc(100vh - 52px)", position: "relative" }}>
          <Typography
            variant="h6"
            align="center"
            margin="dense"
            color="primary"
          >
            Add Contact
          </Typography>
          <Box px={3}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <StyledTextField
                  required
                  id="firstName"
                  label="First Name"
                  margin="normal"
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <StyledTextField
                  required
                  id="lastName"
                  label="Last Name"
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.lastName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <StyledTextField
                  required
                  id="email"
                  label="Email"
                  {...register("email")}
                  onChange={(e)=> handleChange(e.target.value)}
                  error={errors.email ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <StyledTextField
                  required
                  id="phone"
                  label="Phone"
                  type="phone"
                  {...register("phone")}
                  error={errors.phone ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.phone?.message}
                </Typography>
              </Grid>
                <Grid item xs={8} sm={8}>
                  <Controller
                    name="contactType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        isClearable
                        styles={customStyles} 
                        {...field}
                        placeholder={"Contact Type"}
                        options={[
                          { value: "internal", label: "Internal" },
                          { value: "external", label: "External" },
                        ]}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" {...register("active")} />
                    }
                    label="active"
                  />
                </Grid>
            </Grid>

            <Button
              sx={{
                position: "absolute",
                bottom: "2%",
                left: "5%",
                minWidth: "90%",
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

function mapStateToProps(state: Result) {
  return {
    isLoading: state.isLoading,
    items: state.items,
    cursor: state.cursor,
    hasMore: state.hasMore,
  };
}

export default connect(mapStateToProps)(ContactForm);


import { useForm, Controller } from "react-hook-form"; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';
import { connect, useDispatch } from "react-redux"; 
import {StyledTextField} from "../ContactForm/styles"; 

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
  MenuItem
} from '@mui/material';
import { Contact, FormType, Result } from '../../types/contact';
import { addContact } from "../../store/actions/contacts";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(5, 'Last Name must be at least 6 characters')
    .max(20, 'Last Name must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required')
    .min(6, 'Phone must be at least 6 characters')
    .max(15, 'Phone must not exceed 40 characters')
 
  //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});
const initialState = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactType: {value: "", label: ""},
      active: false
}


const ContactForm = ( props: Result ) => {

  const dispatch = useDispatch();
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: FormType) => {
    console.log(JSON.stringify(data, null, 2));
    const contact = Object.assign({}, {}, 
      {
        name: 
        {
        first: data.firstName,
        last: data.lastName 
        }, 
        email: data.email,
        phone:data.phone
      });
    dispatch(addContact(contact));
    reset(initialState);
    
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'grey',
      padding: 20,
      
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      height: 50,
      width: "80%",
      textAlign: "left",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontSize: 16
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  return (
    <>
      <Box px={3} py={2}>
      <Paper sx={{ height:'calc(100vh - 52px)', position:"relative"}}>
          <Typography variant="h6" align="center" margin="dense" color="primary">
            Add Contact
          </Typography>
          <Box px={3} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <StyledTextField
                required
                id="firstName"
                label="First Name"
                margin="normal"
                {...register('firstName')}
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
                margin="dense"
                {...register('lastName')}
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
                margin="dense"
                {...register('email')}
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
                margin="dense"
                {...register('phone')}
                error={errors.phone ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.phone?.message}
              </Typography>
            </Grid>
            <Grid container paddingTop={2} paddingLeft={6}>
              <Grid item xs={6} sm={6}>
              <Controller
                name="contactType"
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable
                    styles={customStyles}
                    {...field}
                    placeholder={'Contact Type'}
                    options={[
                      { value: "internal", label: "Internal" },
                      { value: "external", label: "External" },
                      ]}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} sm={6}>
              
                  <FormControlLabel
                  control={
                    <Checkbox color="primary"
                      {...register('active')} 
                    />
                  }
                  label="active"
                /> 
              </Grid>
            </Grid>
          </Grid>
       
            <Button sx={{position: "absolute", bottom: "2%", left: "5%" , minWidth:"90%"}}
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
    hasMore: state.hasMore
  };
}

export default connect(mapStateToProps)(ContactForm);


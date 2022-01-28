import { FC } from "react";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import ContactInfo from "../ContactForm";
import ContactList from "../ContactList";

const ContactBook: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        height: "100hv",
      }}
    >
      <Box
        sx={{
          maxWidth: "40%",
        }}
      >
        <ContactInfo />
      </Box>

      <Box
        sx={{
          maxWidth: "60%",
          flexGrow: "1",
        }}
      >
        <ContactList />
      </Box>
    </Box>
  );
};

export default ContactBook;

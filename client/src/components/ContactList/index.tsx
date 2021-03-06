import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, Paper, Select } from "@mui/material";
import { loadContacts, deleteContact, sortItems } from "../../store/actions/contacts";
import { Contact, Result } from "../../types/contact";
import { connect, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { StyledIconBox } from "./styles";

const ContactList = (props: Result) => {
  const dispatch = useDispatch();

  const { isLoading, items, cursor, hasMore } = props;

  useEffect(() => {
    dispatch(loadContacts(2)); // TBD cursor
  }, []);


  const handleDelete = (item: Contact) => {
    dispatch(deleteContact(item));
  };

  const [sortType, setSortType] = useState('first');

  useEffect(() => {
    if(items.length===0)return
    dispatch(sortItems(items, sortType));
  }, [sortType]);


  return (
    <Box px={3} py={2}>
      <Paper>
        <Typography variant="h6" align="center" margin="dense" color="primary">
          Contacts
        </Typography>
        <Typography align="right" mr="2em">
            <select onChange={(e) => setSortType(e.target.value)}>
              <option value="first">First Name</option>
              <option value="last">Last Name</option>
              <option value="phone">Phone</option>
            </select>
          </Typography>
        <List
          sx={{
            height: "calc(100vh - 100px)",
            overflow: "auto",
            bgcolor: "#FFFF",
          }}
        >
          {isLoading && <CircularProgress />}
         
          {items?.map((item: Contact, index: Number) => (
            <Box key={`b${index}`} px={3} py={2}>
              <Card key={`card${index}`}>
                <CardContent key={`cardcontent${index}`}>
                  <ListItem alignItems="flex-start" key={`ls${index}`}>
                    <StyledIconBox
                      onClick={() => handleDelete(item)} 
                    >
                      <HighlightOffIcon color="disabled" />
                    </StyledIconBox>
                    <ListItemAvatar key={`lsa${index}`}>
                      <Avatar
                        key={`a${index}`}
                        alt="Remy Sharp"
                        src={item.picture?.thumbnail}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      key={`lit${index}`}
                      primary={item.name?.first + " " + item.name?.last}
                      secondary={
                        <>
                          <Typography
                            key={`t${index}`}
                            sx={{ display: "inline" }}
                            variant="body2"
                            color="text.primary"
                          >
                            {item.email}
                          </Typography>
                          <Typography key={`tt${index}`}>
                            {item.phone}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </CardContent>
              </Card>
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
function mapStateToProps(state: any): Result {
  return {
    isLoading: state.contacts.isLoading,
    items: state.contacts.items,
    cursor: state.contacts.cursor,
    hasMore: state.contacts.hasMore,
  };
}

export default connect(mapStateToProps)(ContactList);

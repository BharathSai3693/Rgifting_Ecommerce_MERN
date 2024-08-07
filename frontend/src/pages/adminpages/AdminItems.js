import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Itemsflex from "../../Components/Itemspage/Itemsflex";
import ItemsForm from "../../Components/admin/Form/ItemsForm";
import { FormProvider } from "../../Components/admin/Form/FormContext";
import ItemsList from "../../Components/admin/ItemsList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminItems() {
  const [value, setValue] = React.useState(0);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Items" {...a11yProps(0)} />
          <Tab label="Create Item" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <ItemsList />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <FormProvider>
          <ItemsForm editMode={editMode} />
        </FormProvider>
      </CustomTabPanel>
    </Box>
  );
}

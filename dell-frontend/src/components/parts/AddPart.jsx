import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
const AddPart = () => {


  const [formData, setFormData] = useState({
    name: '',
    modelNo: '',
    type: '',
    imageLink: '',
    specifications: '',
    compatibility: '',
    issuesRecalls: '',
    installationTroubleshooting: '',
  });
  const [loader,setLoader]=useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        setLoader(true)
         await fetch("https://jsonserver-database-production.up.railway.app/parts",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        });

        setLoader(false)
        toast.success("Added New Part Successfully.", {
          duration: 4000,
          position: 'bottom-right'
        });

    } catch (error) {
        setLoader(false)
        toast.error("Something Went Wrong !!", {
          duration: 4000,
          position: 'bottom-right'
        });
    }
   
    setFormData({
      name: '',
      modelNo: '',
      type: '',
      imageLink: '',
      specifications: '',
      compatibility: '',
      issuesRecalls: '',
      installationTroubleshooting: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{p:"3em",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
      <Typography variant="h4" gutterBottom>
        Add New Dell Part Form
      </Typography>
      <form onSubmit={handleSubmit}  style={{width:"70%",margin:"auto",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Model Number"
          name="modelNo"
          value={formData.modelNo}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Image Link"
          name="imageLink"
          value={formData.imageLink}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Specifications"
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Compatibility"
          name="compatibility"
          value={formData.compatibility}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Installation Troubleshooting"
          name="installationTroubleshooting"
          value={formData.installationTroubleshooting}
          onChange={handleChange}
          multiline
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Part
        </Button>
      </form>
    </Container>
  );
};

export default AddPart;

import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import laptopImg from "../../assets/images/latitude-laptops.avif";
import { Link } from 'react-router-dom';

const Parts = () => {
    const [loader, setLoader] = useState(false);
    const [partsData, setPartsData] = useState([]);
    console.log(partsData)
    const getParts = async () => {
        try {
            setLoader(true)
            const res = await fetch("https://jsonserver-database-production.up.railway.app/parts");
            const data = await res.json();
            setPartsData(data);
            setLoader(false)
        } catch (error) {
            setLoader(false)
        }
    }

    useEffect(() => {
        getParts()
        
    }, [])
    return <Grid container spacing={4} p="3em">
    {partsData && loader ? (
            
      new Array(10).fill(0).map((_, id) => (
        <Grid item xs={12} sm={6} md={3} key={id}>
        <Skeleton  sx={{ mb: "20px" }} variant="rounded" width="100%" height={300} />
        </Grid>
      ))
     
    ) : (
      partsData?.map((item) => {
        const id = item.id.match(/\d+/)
        return <Grid item xs={12} sm={6} md={3} key={item.id}>
        <Link to={`/parts/${id[0]}`}>
          <Card>
            <img src={laptopImg} alt={item.name} height="250px" width="100%" />
            <Box p="15px">
              <Typography variant='h6' component="h6">{item.name.length > 10 ? `${item.name.slice(0, 21)}...` : item.name}</Typography>
              <Typography variant='body1' component="p"><b>Model No: </b>{item.modelNo}</Typography>
              <Typography variant='body1' component="p"><b>Type: </b> {item.type}</Typography>
            </Box>
          </Card>
        </Link>
      </Grid>
})
    )}
  </Grid>
}

export default Parts
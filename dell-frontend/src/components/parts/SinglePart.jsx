import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import laptopImg from "../../assets/images/latitude-laptops.avif";

const SinglePart = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();

  const getSinglePart = async (id) => {
    try {
      setLoader(true)
      const res = await fetch(`https://jsonserver-database-production.up.railway.app/parts/part${id}`);
      const jsonRes = await res.json();
      setData(jsonRes);
      setLoader(false)
    } catch (error) {
      setLoader(false)

    }
  }

  useEffect(() => {
    getSinglePart(id)
  }, [id])


  return (
    <Box>
      {
        loader ? <Skeleton sx={{ mb: "20px" }} variant="rounded" width="100%" height={500} /> : (
          <Grid container spacing={4} sx={{ padding: { xs: "1em", md: "3em" } }}>




            <Grid item xs={12} md={5}>
              <img src={laptopImg} alt={data.name} width="100%" />
            </Grid>
            <Grid item xs={12} md={7}>
              <Card>

                <Box p="3em" sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Typography variant='h6' gutterBottom component="h6">{data.name}</Typography>
                  <Typography variant='body1' gutterBottom component="p"><b>Model No: </b>{data.modelNo}</Typography>
                  <Typography variant='body1' gutterBottom component="p"><b>Type: </b> {data.type}</Typography>
                  <Box>
                    <Typography variant='h6' gutterBottom component="h6">Specifications</Typography>
                    <ul style={{ paddingLeft: "25px" }}>
                      {
                        data?.specifications?.split(",")?.map(item => {
                          return <li key={item} style={{ lineHeight: "30px" }}>{item}</li>
                        })
                      }
                    </ul>
                  </Box>
                  <Box>
                    <Typography variant='h6' gutterBottom component="h6">Compatibility</Typography>
                    <Typography variant='body1' gutterBottom component="p">{data?.compatibility}</Typography>
                  </Box>

                  <Box>
                    <Typography variant='h6' gutterBottom component="h6">Installation Steps</Typography>
                    {
                      data?.installationTroubleshooting?.split("\n")?.map(item => {
                        return <Typography key={item} variant='body1' gutterBottom component="p">{item}</Typography>
                      })
                    }
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )
      }
    </Box>

  )
}

export default SinglePart
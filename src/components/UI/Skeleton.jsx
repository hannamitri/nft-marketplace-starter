import React from "react";
import { Box, Grid, Skeleton as Skelly } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Skeleton = ({ cards, loading }) => {
  return (
    <div className="">
      {new Array(6).fill(0).map((index) => (
        <Card sx={{ maxWidth: 345, mr: 3 }} key={index}>
          {loading ? (
            <Skelly
              animation="pulse"
              variant="rectangular"
              height={200}
              width="100%"
            />
          ) : (
            <Card component="img" height={200} img={cards.nftImage} />
          )}
          <CardContent>
            {loading ? (
              <>
                <Skelly
                  animation="pulse"
                  variant="circular"
                  height={40}
                  width={40}
                  style={{ marginBottom: 6 }}
                />
              </>
            ) : (
              <Typography>
                {cards.title}
                {cards.code}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Skeleton;

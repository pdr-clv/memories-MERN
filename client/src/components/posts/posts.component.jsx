import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
//we can get data from the state-redux using useSelector.

import PostItem from './post-item/post.item.component';
import useStyles from './posts.styles';

const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.postsReducer);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <PostItem key={post._id} post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
};

export default Posts;
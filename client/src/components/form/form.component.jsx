import React,{ useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';

import { newPost, updatePost } from '../../redux/actions/postsActions';
import useStyles from './form.styles';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.postsReducer.find((p) => p._id === currentId) : null);
  const innerState = {
    creator:'',
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  }
  const[postData,setPostData] = useState(innerState);
  const classes = useStyles();

  useEffect(()=>{
    if(post) setPostData(post);
  },[post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(newPost(postData));
    }
    clearForm();
  }

  const clearForm = () => {
    setCurrentId(null);
    setPostData(innerState);
  }
  return (
    <Paper className={classes.paper}>
      <form 
        autoComplete='off' 
        noValidate 
        className={`${classes.root} ${classes.form}`} 
        onSubmit={ handleSubmit }
      >
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField 
          name='creator' 
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={(e)=> setPostData({ ...postData, creator: e.target.value })}/>
          <TextField 
          name='title' 
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e)=> setPostData({ ...postData, title: e.target.value })}/>
          <TextField 
          name='message' 
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e)=> setPostData({ ...postData, message: e.target.value })}/>
          <TextField 
          name='tags' 
          variant='outlined'
          label='Tag1,Tag2,Tag3'
          fullWidth
          value={postData.tags}
          onChange={(e)=> setPostData({ ...postData, tags: e.target.value.split(',') })}/>
          <div className={classes.fileInput}>
            <FileBase
              type='file'
              multiple={false}
              onDone={ ({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }
            />
          </div>
          <Button 
            className={classes.buttonSubmit} 
            variant = 'contained'
            color='primary'
            size='large'
            type='submit'
            fullWidth
          >Submit</Button>
          <Button  
            variant = 'contained'
            color='secondary'
            size='small'
            onClick={clearForm}
            fullWidth
          >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;

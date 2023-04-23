import { useRef, useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import loginData from '../../loginData';

import './form.scss';


const Form = ({ setLoged }) => {
  const [hiddenPassword, setHiddenPassword] = useState(false);

  const [textFields, setTextFields] = useState({
    username: '',
    password: '',
  });

  const passwordRef = useRef(null);

  const changeTextFields = (e) => {
    const { name, value } = e.target;
    setTextFields({
      ...textFields,
      [name]: value,
    });
  };

  const login = () => {
    loginData.forEach(user => {
      if (textFields.username === user.username && textFields.password === user.password) {
        setLoged(true)
        localStorage.setItem("user", JSON.stringify(user))
      }
    })
  }

  return (
    <div className="form-container flex-column">
      <h1>Login</h1>
      <TextField
        value={textFields.username}
        onChange={changeTextFields}
        name="username"
        sx={{ m: 1, width: '100%', minWidth: '270px'}}
        label="Логин"
        variant="outlined"
      />
      <FormControl sx={{ m: 1, width: '100%', minWidth: '270px' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
        <OutlinedInput
          required
          error={passwordRef.current}
          type={hiddenPassword ? 'text' : 'password'}
          value={textFields.password}
          onChange={changeTextFields}
          label="Пароль"
          name="password"
          variant="outlined"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setHiddenPassword((prev) => !prev)}
                edge="end"
              >
                {hiddenPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button variant="contained" onClick={login}>Вход</Button>
    </div>
  );
};

export default Form;

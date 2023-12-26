import styled from "@emotion/styled";
import { blue, grey } from './colors';
import { Input, inputClasses } from '@mui/base/Input';
import { TextField } from "@mui/material";


export const StyledInput = styled(Input)(() => `

    .${inputClasses.input} {
      width: 320px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${grey[900]};
      background: ${'#fff'};
      border: 1px solid ${grey[200]};
      box-shadow: 0px 2px 2px ${grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${blue[200]};
      }
    }
  `,
  );
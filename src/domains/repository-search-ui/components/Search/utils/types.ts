import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';

export type HandleInputChange = (
  event:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<unknown>,
) => void;
export type SelectType = `multiple` | `single`;

import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <Stack component="section" gap={2} aria-label="Page Header">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={{ typography: { xs: 'h5', md: 'h4' } }} component="h1">{title}</Typography>
          {description && (
            <Typography component="h2" color="text.secondary">{description}</Typography>
          )}
        </Box>
        {actions && (
          <Box display={{ xs: 'none', md: 'block' }}>
            {actions}
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default PageHeader;
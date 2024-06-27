import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Breadcrumb {
  href: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: Breadcrumb;
  actions?: ReactNode;
}

const PageHeader = ({ title, description, breadcrumb, actions }: PageHeaderProps) => {
  return (
    <Stack component="section" gap={2} aria-label="Page Header">
      {breadcrumb && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="none"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
            href={breadcrumb.href}
          >
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {breadcrumb.label}
          </Link>
        </Breadcrumbs>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={{ typography: { xs: 'h5', md: 'h4' } }} component="h1">{title}</Typography>
          <Typography component="h2" color="text.secondary">{description}</Typography>
        </Box>
        <Box display={{ xs: 'none', md: 'block' }}>
          {actions}
        </Box>
      </Stack>
    </Stack>
  )
}

export default PageHeader;
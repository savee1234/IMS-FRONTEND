import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, TextField, Button, Select, MenuItem, 
  FormControl, InputLabel, Grid, Paper, Box, Divider, InputAdornment,
  FormHelperText, Stepper, Step, StepLabel, makeStyles, CssBaseline
} from '@material-ui/core';
import { 
  Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, 
  Business as BusinessIcon, Category as CategoryIcon, 
  Description as DescriptionIcon, CheckCircle as CheckCircleIcon
} from '@material-ui/icons';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    flex: 1,
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 12,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(4),
    '&:hover': {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  title: {
    fontWeight: 800,
    color: '#2563eb',
    marginBottom: theme.spacing(2),
  },
  stepIcon: {
    backgroundColor: '#e2e8f0',
    color: '#64748b',
    width: 32,
    height: 32,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    '&.active': {
      backgroundColor: '#2563eb',
      color: '#fff',
    },
    '&.completed': {
      backgroundColor: '#2563eb',
      color: '#fff',
    },
  },
  formField: {
    marginBottom: theme.spacing(3),
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  },
  successContainer: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  successIcon: {
    color: '#10B981',
    fontSize: '4rem',
    marginBottom: theme.spacing(2),
  },
}));

const steps = ['Complaint Details', 'Contact Information', 'Review & Submit'];

const EnhancedComplaintForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    category: '',
    organization: '',
    description: '',
    title: 'Mr.',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  // Dummy data
  const categories = ['Billing', 'Technical', 'Service', 'Other'];
  const organizations = ['SLT', 'Mobitel', 'Hutch', 'Other'];
  const titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];

  const handleNext = () => {
    const currentErrors = validateStep(activeStep);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setErrors({});
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
      setActiveStep(steps.length);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.organization) newErrors.organization = 'Organization is required';
      if (!formData.description) newErrors.description = 'Description is required';
    } else if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    
    return newErrors;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className={classes.formField} error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleChange('category')}
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryIcon color="action" />
                    </InputAdornment>
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth className={classes.formField} error={!!errors.organization}>
                <InputLabel>Organization</InputLabel>
                <Select
                  value={formData.organization}
                  onChange={handleChange('organization')}
                  startAdornment={
                    <InputAdornment position="start">
                      <BusinessIcon color="action" />
                    </InputAdornment>
                  }
                >
                  {organizations.map((org) => (
                    <MenuItem key={org} value={org}>
                      {org}
                    </MenuItem>
                  ))}
                </Select>
                {errors.organization && <FormHelperText>{errors.organization}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange('description')}
                error={!!errors.description}
                helperText={errors.description}
                className={classes.formField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth className={classes.formField}>
                <InputLabel>Title</InputLabel>
                <Select
                  value={formData.title}
                  onChange={handleChange('title')}
                >
                  {titles.map((title) => (
                    <MenuItem key={title} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                className={classes.formField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                className={classes.formField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                error={!!errors.phone}
                helperText={errors.phone}
                className={classes.formField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Review Your Complaint</Typography>
              <Divider style={{ marginBottom: '1.5rem' }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Category</Typography>
                  <Typography variant="body1">{formData.category}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Organization</Typography>
                  <Typography variant="body1">{formData.organization}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Description</Typography>
                  <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                    {formData.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ margin: '1.5rem 0' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Contact Person</Typography>
                  <Typography variant="body1">{`${formData.title} ${formData.name}`}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1">{formData.email || 'Not provided'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1">{formData.phone}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      
      default:
        return 'Unknown step';
    }
  };

  // Success screen
  if (activeStep === steps.length) {
    return (
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="md" style={{ 
          padding: '4rem 0', 
          minHeight: '80vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          <Box textAlign="center" style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
            <CheckCircleIcon style={{ fontSize: 80, color: '#4caf50', marginBottom: '1.5rem' }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Complaint Submitted Successfully!
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Thank you for reaching out to us. We've received your complaint and our team will review it shortly.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Your reference number is: <strong>{`REF-${new Date().getTime()}`}</strong>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              style={{ marginTop: '1.5rem', padding: '0.5rem 2rem' }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
        <Footer />
      </div>
    );
  }

  // Main form render
  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Submit a Complaint
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ maxWidth: '800px', margin: '0 auto' }}>
            We're here to help! Please fill out the form below with details about your complaint.
          </Typography>
        </div>
        
        {/* Stepper */}
        <Box mb={6}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <div className={`${classes.stepIcon} ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
                      {completed ? <CheckCircleIcon fontSize="small" /> : index + 1}
                    </div>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        
        {/* Form Content */}
        <Paper className={classes.paper}>
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            {renderStepContent(activeStep)}
            
            <div className={classes.buttonGroup}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
                color="primary"
              >
                Back
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      
      <Footer />
    </div>
  );
};

export default EnhancedComplaintForm;

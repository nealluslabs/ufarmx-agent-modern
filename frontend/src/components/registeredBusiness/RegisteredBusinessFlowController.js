import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisteredBusinessForm from './RegisteredBusinessForm';
import RegisteredBusinessDetailsForm from './RegisteredBusinessDetailsForm';
import RegisteredBusinessPersonalInfoForm from './RegisteredBusinessPersonalInfoForm';
import RegisteredBusinessPreviewForm from './RegisteredBusinessPreviewForm';
import { useSelector } from 'react-redux';

const RegisteredBusinessFlowController = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: Company, 2: Business Details, 3: Personal, 4: Preview

  const {  cacUrl,
    statusReportUrl,
    memartUrl,
    photoOfShopBusUrl} = useSelector((state)=>state.group)
  
  // Company Information Data
  const [companyData, setCompanyData] = useState({
    businessName: '',
    cacNumber: '',
    taxId: '',
    businessRegistrationDate: '',
    businessAddress: '',
    state: '',
    localGovernment: '',
    city: '',
    countryCode: '+234',
    phoneNumber: '',
  });

  // Business Details Data
  const [businessData, setBusinessData] = useState({
    businessName: '',
    storeName: '',
    businessAddress: '',
    state: '',
    localGovernment: '',
    nearestLandmark: '',
    yearsInBusiness: '',
    shopOwnership: '',
    shopSize: '',
  });

  // Personal Information Data
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    email: '',
    countryCode: '+234',
    phoneNumber: '',
    nationality: '',
    stateOfOrigin: '',
    localGovernmentOrigin: '',
    dateOfBirth: '',
    address: '',
    currentState: '',
    currentLocalGovernment: '',
    utilityType: '',
    meansOfId: '',
    meterNumber: '',
    nin: '',
  });

  const handleCompanyDataChange = (event) => {
    const { name, value } = event.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBusinessDataChange = (event) => {
    const { name, value } = event.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePersonalDataChange = (event) => {
    const { name, value } = event.target;
    setPersonalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Navigation handlers
  const handleBackFromCompany = () => {
    navigate(-1); // Go back to business type selection
  };

  const handleContinueFromCompany = () => {
    setCurrentStep(2); // Go to business details
  };

  const handleBackFromBusinessDetails = () => {
    setCurrentStep(1); // Go back to company information
  };

  const handleContinueFromBusinessDetails = () => {
    setCurrentStep(3); // Go to personal information
  };

  const handleBackFromPersonal = () => {
    setCurrentStep(2); // Go back to business details
  };

  const handleContinueFromPersonal = () => {
    setCurrentStep(4); // Go to preview
  };

  const handleBackFromPreview = () => {
    setCurrentStep(3); // Go back to personal information
  };

  const handleEditCompany = () => {
    setCurrentStep(1); // Go to company information
  };

  const handleEditBusinessDetails = () => {
    setCurrentStep(2); // Go to business details
  };

  const handleEditPersonal = () => {
    setCurrentStep(3); // Go to personal information
  };

  const handleSubmit = async () => {
    try {
      // Combine all data
      const formData = {
        ...companyData,
        ...businessData,
        ...personalData,
        businessType: 'registered',
        cacUrl,
       statusReportUrl,
       memartUrl,
       photoOfShopBusUrl
      };
      
      console.log('Submitting form data:', formData);
      // Add your API call here
      navigate('/success'); // Navigate to success page
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Step 1: Company Information
  if (currentStep === 1) {
    return (
      <RegisteredBusinessForm
        formData={companyData}
        onInputChange={handleCompanyDataChange}
        onBack={handleBackFromCompany}
        onContinue={handleContinueFromCompany}
      />
    );
  }

  // Step 2: Business Details
  if (currentStep === 2) {
    return (
      <RegisteredBusinessDetailsForm
        formData={businessData}
        onInputChange={handleBusinessDataChange}
        onBack={handleBackFromBusinessDetails}
        onContinue={handleContinueFromBusinessDetails}
      />
    );
  }

  // Step 3: Personal Information
  if (currentStep === 3) {
    return (
      <RegisteredBusinessPersonalInfoForm
        personalData={personalData}
        onInputChange={handlePersonalDataChange}
        onBack={handleBackFromPersonal}
        onContinue={handleContinueFromPersonal}
      />
    );
  }

  // Step 4: Preview
  if (currentStep === 4) {
    return (
      <RegisteredBusinessPreviewForm
        companyData={companyData}
        businessData={businessData}
        personalData={personalData}
        onBack={handleBackFromPreview}
        onSubmit={handleSubmit}
        onEditCompany={handleEditCompany}
        onEditBusinessDetails={handleEditBusinessDetails}
        onEditPersonal={handleEditPersonal}
      />
    );
  }

  return null;
};

export default RegisteredBusinessFlowController;

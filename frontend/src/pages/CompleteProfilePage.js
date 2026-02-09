import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BusinessTypeSelection from '../components/businessType/BusinessTypeSelection';
// Individual Business Components
import IndividualBusinessForm from '../components/individualBusiness/IndividualBusinessForm';
import PersonalInformationForm from '../components/individualBusiness/PersonalInformationForm';
import IndividualPreviewForm from '../components/individualBusiness/IndividualPreviewForm';
// Registered Business Components
import RegisteredBusinessForm from '../components/registeredBusiness/RegisteredBusinessForm';
import RegisteredBusinessDetailsForm from '../components/registeredBusiness/RegisteredBusinessDetailsForm';
import RegisteredBusinessPersonalInfoForm from '../components/registeredBusiness/RegisteredBusinessPersonalInfoForm';
import RegisteredBusinessPreviewForm from '../components/registeredBusiness/RegisteredBusinessPreviewForm';
import { addNewRetailer } from 'src/redux/actions/group.action';
import { useDispatch, useSelector } from 'react-redux';

const CompleteProfilePage = () => {
  const dispatch= useDispatch()
  const [currentStep, setCurrentStep] = useState(1); // 1: Business Type, 2-4: Flow steps based on business type
  const [businessType, setBusinessType] = useState(null); // 'individual' or 'registered'

  const {  cacUrl,
    statusReportUrl,
    memartUrl,
    photoOfShopBusUrl,
  photoIdIndUrl,
  photoIdBusUrl,
utilityBillIndUrl,
utilityBillBusUrl,
photoOfShopIndUrl,
firstName,lastName,email,password} = useSelector((state)=>state.group)
  
  // Individual Business Data
  const [formData, setFormData] = useState({
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
  
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    stateOfOrigin: '',
    localGovernmentOfOrigin: '',
    dateOfBirth: '',
    address: '',
    currentState: '',
    currentLocalGovernment: '',
    utilityType: '',
    meansOfId: '',
    meterNumber: '',
    nin: '',
    utilityBill: null,
    idDocument: null,
  });

  // Registered Business Data
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

  const [registeredBusinessData, setRegisteredBusinessData] = useState({
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

  const [registeredPersonalData, setRegisteredPersonalData] = useState({
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
    utilityBill: null,
    idDocument: null,
  });
  
  const navigate = useNavigate();

  // Input change handlers for individual business
  const handleInputChange = (event) => {
    if (!event || !event.target) return;
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePersonalInputChange = (event) => {
    if (!event || !event.target) return;
    const { name, value, files } = event.target;
    setPersonalData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Input change handlers for registered business
  const handleCompanyInputChange = (event) => {
    let name, value;
    
    // Handle both event object and direct { name, value } object
    if (event && event.target) {
      ({ name, value } = event.target);
    } else if (event && event.name) {
      ({ name, value } = event);
    } else {
      return;
    }
    
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisteredBusinessInputChange = (event) => {
    let name, value;
    
    // Handle both event object and direct { name, value } object
    if (event && event.target) {
      ({ name, value } = event.target);
    } else if (event && event.name) {
      ({ name, value } = event);
    } else {
      return;
    }
    
    setRegisteredBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisteredPersonalInputChange = (event) => {
    let name, value, files;
    
    // Handle both event object and direct { name, value } object
    if (event && event.target) {
      ({ name, value, files } = event.target);
    } else if (event && event.name) {
      ({ name, value } = event);
    } else {
      return;
    }
    setRegisteredPersonalData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleBusinessTypeContinue = (selectedBusinessType) => {
    setBusinessType(selectedBusinessType);
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 5) {
      setCurrentStep(4); // From registered business preview to personal info
    } else if (currentStep === 4) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setBusinessType(null);
    } else {
      navigate(-1);
    }
  };

  // Individual business flow handlers
  const handleIndividualContinue = () => {
    setCurrentStep(3);
  };

  const handlePersonalContinue = () => {
    setCurrentStep(4);
  };

  // Registered business flow handlers
  const handleCompanyContinue = () => {
    setCurrentStep(3);
  };

  const handleRegisteredBusinessContinue = () => {
    setCurrentStep(4);
  };

  const handleRegisteredPersonalContinue = () => {
    setCurrentStep(5); // Preview step for registered business
  };

  const handleSubmit = () => {
    // Navigate to success page

    if(businessType === 'individual'){
    dispatch(addNewRetailer({
      businessType:'individual',
      ...formData,
      ...personalData,
      photoIdIndUrl,
      photoIdBusUrl,
      utilityBillIndUrl,
      photoOfShopIndUrl,
      firstName,
      lastName,
      email,
      password,
      
    },
       navigate)).then(()=>{ 

    navigate('/application-success');
    })
  }
  else{
    dispatch(addNewRetailer(
      {
        businessType:'registered',
        ...companyData,
        ...registeredPersonalData,
        ...registeredBusinessData,
        cacUrl,
        statusReportUrl,
        memartUrl,
        photoOfShopBusUrl,
        photoIdBusUrl,
        utilityBillBusUrl,
        firstName,
      lastName,
      email,
      password,

        
      }, 
      navigate)
  ).then(()=>{ 

      navigate('/application-success');
      })
  }


  };

  // Edit handlers for preview forms
  const handleEditBusinessDetails = () => {
    setCurrentStep(businessType === 'individual' ? 2 : 3);
  };

  const handleEditPersonalInfo = () => {
    setCurrentStep(businessType === 'individual' ? 3 : 4);
  };

  const handleEditCompanyInfo = () => {
    setCurrentStep(2);
  };

  return (
    <div style={{fontFamily:"Poppins"}}>
      <Helmet>
        <title>Complete Profile - UfarmX</title>
      </Helmet>

      {/* Step 1: Business Type Selection */}
      {currentStep === 1 && (
        <BusinessTypeSelection 
          onContinue={handleBusinessTypeContinue}
          onBack={() => navigate(-1)}
        />
      )}
      
      {/* Individual Business Flow */}
      {businessType === 'individual' && (
        <>
          {/* Step 2: Individual Business Details */}
          {currentStep === 2 && (
            <IndividualBusinessForm 
              formData={formData}
              onInputChange={handleInputChange}
              onBack={handleBack}
              onContinue={handleIndividualContinue}
            />
          )}
          
          {/* Step 3: Individual Personal Information */}
          {currentStep === 3 && (
            <PersonalInformationForm 
              personalData={personalData}
              onInputChange={handlePersonalInputChange}
              onBack={handleBack}
              onContinue={handlePersonalContinue}
            />
          )}
          
          {/* Step 4: Individual Preview */}
          {currentStep === 4 && (
            <IndividualPreviewForm 
              formData={formData}
              personalData={personalData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              onEditBusinessDetails={handleEditBusinessDetails}
              onEditPersonalInfo={handleEditPersonalInfo}
            />
          )}
        </>
      )}

      {/* Registered Business Flow */}
      {businessType === 'registered' && (
        <>
          {/* Step 2: Company Information */}
          {currentStep === 2 && (
            <RegisteredBusinessForm 
              companyData={companyData}
              onInputChange={handleCompanyInputChange}
              onBack={handleBack}
              onContinue={handleCompanyContinue}
            />
          )}
          
          {/* Step 3: Registered Business Details */}
          {currentStep === 3 && (
            <RegisteredBusinessDetailsForm 
              formData={registeredBusinessData}
              onInputChange={handleRegisteredBusinessInputChange}
              onBack={handleBack}
              onContinue={handleRegisteredBusinessContinue}
            />
          )}
          
          {/* Step 4: Registered Personal Information */}
          {currentStep === 4 && (
            <RegisteredBusinessPersonalInfoForm 
              personalData={registeredPersonalData}
              onInputChange={handleRegisteredPersonalInputChange}
              onBack={handleBack}
              onContinue={handleRegisteredPersonalContinue}
            />
          )}
          
          {/* Step 5: Registered Business Preview */}
          {currentStep === 5 && (
            <RegisteredBusinessPreviewForm 
              companyData={companyData}
              businessData={registeredBusinessData}
              personalData={registeredPersonalData}
              onBack={handleBack}
              onSubmit={handleSubmit}
              onEditCompanyInfo={handleEditCompanyInfo}
              onEditBusinessDetails={handleEditBusinessDetails}
              onEditPersonalInfo={handleEditPersonalInfo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CompleteProfilePage;

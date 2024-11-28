import React, { useState } from 'react';
import './SupplierRegister.css';

function SupplierRegister() {
  const [currentStep, setCurrentStep] = useState(1); // Step state
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    email: '',
    telephone: '',
    productName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Handling input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Step validation logic
  const validateStep = () => {
    let newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.businessName) newErrors.businessName = 'Business Name is required';
      if (!formData.businessAddress) newErrors.businessAddress = 'Business Address is required';
    } else if (currentStep === 2) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.telephone) newErrors.telephone = 'Telephone number is required';
    } else if (currentStep === 3) {
      if (!formData.productName) newErrors.productName = 'At least one product is required';
    } else if (currentStep === 4) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to the next step
  const nextStep = (e) => {
    e.preventDefault(); // Prevent form refresh
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1); // Move to next step
    }
  };

  // Move to the previous step
  const prevStep = (e) => {
    e.preventDefault(); // Prevent form refresh
    setCurrentStep((prevStep) => prevStep - 1); // Move to previous step
  };

  // Render each step of the form
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Step 1: Business Information</h2>
            <input 
              type="text" 
              name="businessName" 
              placeholder="Business Name" 
              value={formData.businessName} 
              onChange={handleChange} 
            />
            {errors.businessName && <span className="error">{errors.businessName}</span>}
            <br />
            <input 
              type="text" 
              name="businessAddress" 
              placeholder="Business Address" 
              value={formData.businessAddress} 
              onChange={handleChange} 
            />
            {errors.businessAddress && <span className="error">{errors.businessAddress}</span>}
            <br />
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Contact Information</h2>
            <input 
              type="email" 
              name="email" 
              placeholder="Official Email" 
              value={formData.email} 
              onChange={handleChange} 
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <br />
            <input 
              type="text" 
              name="telephone" 
              placeholder="Telephone" 
              value={formData.telephone} 
              onChange={handleChange} 
            />
            {errors.telephone && <span className="error">{errors.telephone}</span>}
            <br />
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: Product Details</h2>
            <input 
              type="text" 
              name="productName" 
              placeholder="Product Name" 
              value={formData.productName} 
              onChange={handleChange} 
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
            <br />
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Step 4: Verification</h2>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <br />
            <input n
              type="password" 
              name="confirmPassword" 
              placeholder="Re-enter Password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            <br />
            <button onClick={prevStep}>Previous</button>
            <button onClick={(e) => { 
              e.preventDefault(); 
              if (validateStep()) alert('Form submitted!'); 
            }}>Submit</button>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Supplier Registration</h1>
        {/* Modern progress bar */}
        <div className={`progress ${currentStep > 1 ? 'active' : ''}`}>
  <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>1</div>
  <div className={`step ${currentStep >= 2 ? 'completed' : ''}`}>2</div>
  <div className={`step ${currentStep >= 3 ? 'completed' : ''}`}>3</div>
  <div className={`step ${currentStep >= 4 ? 'completed' : ''}`}>4</div>
</div>

        <hr />
        {/* Render the current step */}
        {renderStep()}
      </form>
    </div>
  );
}

export default SupplierRegister;

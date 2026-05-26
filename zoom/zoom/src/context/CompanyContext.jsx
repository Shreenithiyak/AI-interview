
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
 
const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

const defaultCompanies = [
  { abbreviation: "TCS", fullName: "TCS" },
  { abbreviation: "INFY", fullName: "Infosys" },
  { abbreviation: "WIPRO", fullName: "Wipro" },
  { abbreviation: "ACC", fullName: "Accenture" },
  { abbreviation: "GOOG", fullName: "Google" },
  { abbreviation: "AMZN", fullName: "Amazon" },
  { abbreviation: "MSFT", fullName: "Microsoft" },
  { abbreviation: "ZOHO", fullName: "Zoho" },
  { abbreviation: "META", fullName: "Meta" },
  { abbreviation: "AAPL", fullName: "Apple" },
  { abbreviation: "NFLX", fullName: "Netflix" },
  { abbreviation: "IBM", fullName: "IBM" },
  { abbreviation: "ORCL", fullName: "Oracle" },
  { abbreviation: "CSCO", fullName: "Cisco" },
  { abbreviation: "TSLA", fullName: "Tesla" },
  { abbreviation: "INTC", fullName: "Intel" },
  { abbreviation: "SPOT", fullName: "Spotify" },
  { abbreviation: "TEAM", fullName: "Atlassian" },
  { abbreviation: "UBER", fullName: "Uber" },
  { abbreviation: "ABNB", fullName: "Airbnb" },
  { abbreviation: "SNOW", fullName: "Snowflake" },
  { abbreviation: "CRM", fullName: "Salesforce" },
  { abbreviation: "PLTR", fullName: "Palantir" },
  { abbreviation: "STR", fullName: "Stripe" }
];

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState(defaultCompanies);
  const [selectedCompany, setSelectedCompany] = useState(() => {
    return localStorage.getItem('selected_company') || null;
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/companies`);
        if (response.data.success && response.data.data.length > 0) {
          setCompanies(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, [API_URL]);

  useEffect(() => {
    if (selectedCompany) {
      localStorage.setItem('selected_company', selectedCompany);
    }
  }, [selectedCompany]);

  return (
    <CompanyContext.Provider value={{ 
      companies, 
      selectedCompany, 
      setSelectedCompany 
    }}>
      {children}
    </CompanyContext.Provider>
  );
};

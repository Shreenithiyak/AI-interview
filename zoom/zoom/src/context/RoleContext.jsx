/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

const defaultRoles = [
  { id: 1, title: 'Frontend Dev', description: 'React, Vue, Web Performance & Modern CSS Architecture.' },
  { id: 2, title: 'Backend Dev', description: 'Scalable APIs, Database Design, & Distributed Systems.' },
  { id: 3, title: 'Full Stack', description: 'End-to-end engineering from DOM to Deployment.' },
  { id: 4, title: 'Data Science', description: 'Statistical analysis, ML modeling, & data storytelling.' },
  { id: 5, title: 'DevOps', description: 'CI/CD, Kubernetes, Cloud Infra & Observability.' },
  { id: 6, title: 'System Design', description: 'Architecting high-availability large scale services.' },
  { id: 7, title: 'HR/Behavioral', description: 'Soft skills, leadership principles & culture fit.' },
];

const poolRoles = [
  { title: 'Cloud Architect', description: 'AWS, Azure, GCP infrastructure and migration strategies.' },
  { title: 'QA Engineer', description: 'Automated testing, Cypress, Selenium, and CI integration.' },
  { title: 'Security Analyst', description: 'Penetration testing, cryptography, and network security.' },
  { title: 'UI/UX Designer', description: 'Figma, prototyping, user research, and wireframing.' },
  { title: 'Blockchain Dev', description: 'Web3, Smart Contracts, Solidity, and Ethereum networks.' },
  { title: 'Mobile Dev', description: 'iOS, Android, React Native, and Flutter development.' },
  { title: 'Data Engineer', description: 'ETL pipelines, Spark, Kafka, and Data Warehousing.' },
  { title: 'ML Engineer', description: 'Deploying machine learning models to production securely.' }
];

export const RoleProvider = ({ children }) => {
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    const saved = localStorage.getItem('neon_selected_role');
    return saved ? JSON.parse(saved) : null;
  });

  const [roles, setRoles] = useState(defaultRoles);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/roles`);
        if (response.data.success && response.data.data.length > 0) {
          setRoles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching roles from backend:", error);
      }
    };
    fetchRoles();
  }, [API_URL]);

  useEffect(() => {
    localStorage.setItem('neon_selected_role', JSON.stringify(selectedRoleId));
  }, [selectedRoleId]);

  const handleGenerateRoles = () => {
    const existingTitles = roles.map(r => r.title);
    const available = poolRoles.filter(r => !existingTitles.includes(r.title));
    
    if (available.length === 0) {
      alert("No more new unique roles available to generate!");
      return;
    }
    
    const numToAdd = Math.min(2, available.length);
    const newRolesToAdd = [];
    
    for (let i = 0; i < numToAdd; i++) {
      const randIndex = Math.floor(Math.random() * available.length);
      newRolesToAdd.push({
        id: Date.now() + i,
        title: available[randIndex].title,
        description: available[randIndex].description,
        active: false
      });
      available.splice(randIndex, 1);
    }
    
    setRoles([...roles, ...newRolesToAdd]);
  };

  return (
    <RoleContext.Provider value={{ roles, handleGenerateRoles, selectedRoleId, setSelectedRoleId }}>
      {children}
    </RoleContext.Provider>
  );
};


import React from "react";

const SchemesPage = () => {
  const centralSchemes = [
    {
      name: "Pradhan Mantri Mudra Yojana (PMMY)",
      url: "https://www.mudra.org.in",
    },
    {
      name: "Prime Minister’s Employment Generation Programme (PMEGP)",
      url: "https://www.kviconline.gov.in/pmegp/pmegp_index.php",
    },
    {
      name: "Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)",
      url: "https://www.cgtmse.in",
    },
    {
      name: "SIDBI MSME Loans",
      url: "https://www.sidbi.in/home-product",
    },
  ];

  const tnSchemes = [
    {
      name: "New Entrepreneur cum Enterprise Development Scheme (NEEDS)",
      url: "https://msmeonline.tn.gov.in/",
    },
    {
      name: "Unemployed Youth Employment Generation Programme (UYEGP)",
      url: "https://msmeonline.tn.gov.in/",
    },
    {
      name: "Tamil Nadu State Government Credit Guarantee Scheme",
      url: "https://www.tiic.org",
    },
    {
      name: "Tamil Nadu Industrial Investment Corporation Ltd Loans",
      url: "https://www.tiic.org",
    },
  ];

  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    margin: "8px 0",
    backgroundColor: "#007BFF",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "0.3s",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
   

      <h1><b>Central Government Schemes</b></h1>
      {centralSchemes.map((scheme, index) => (
        <div key={index}>
          <a
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            {scheme.name}
          </a>
        </div>
      ))}

      <h1><b>Tamil Nadu Government Schemes</b></h1>
      {tnSchemes.map((scheme, index) => (
        <div key={index}>
          <a
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            {scheme.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SchemesPage;

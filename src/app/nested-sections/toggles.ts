export const toggles = {
    prr: {
      label: "Plan Rosters and Reports",
      toggleprop: "prr_main",
      modules: [
        {
          label: "Referrals",
          toggleProp: "prr_referrals",
          modules: [
            { label: "Case Management", toggleProp: "prr_r_cm" },
            { label: "Disease Management", toggleProp: "prr_r_dm" },
            {
              label: "Member Quality Assurance",
              toggleProp: "prr_r_mqa",
              modules: [
                { label: "QA Review", toggleProp: "mqa_qa_review" },
                { label: "Audit Reports", toggleProp: "mqa_audit_reports" },
                {
                  label: "Compliance",
                  toggleProp: "mqa_compliance",
                  modules: [
                    { label: "Regulatory Compliance", toggleProp: "mqa_reg_compliance" },
                    { label: "Internal Audits", toggleProp: "mqa_internal_audits" }
                  ]
                }
              ]
            }
          ]
        },
        { label: "ECC", toggleProp: "prr_ecc" }
      ]
    },
    vendorReports: {
      label: "Vendor Reports",
      toggleprop: "vr_main",
      modules: [
        { label: "Patient Centered Care", toggleProp: "vr_pcc" },
        { label: "Rare Disease Management", toggleProp: "vr_rdm" }
      ]
    }
  };
export type WorkstreamId =
  | "regulatory"
  | "engineering"
  | "partnerships"
  | "operations"
  | "business"
  | "finance"
  | "property";

export type WorkstreamStatus = "not_started" | "in_progress" | "blocked" | "ready";

export type WorkstreamRecord = {
  status: WorkstreamStatus;
  notes: string;
  nextActions: string[];
  updatedAt: string;
};

export const WORKSTREAMS: Record<
  WorkstreamId,
  { title: string; subagentId: WorkstreamId; anchorDocs: string[]; defaultNextActions: string[] }
> = {
  regulatory: {
    title: "Regulatory & certification",
    subagentId: "regulatory",
    anchorDocs: [
      "12_FAA_EB105A_Compliance_Review.md",
      "SEAS_Part135_GOM_V1.md",
      "SEAS_Part135_Certification_Package.html",
      "Submission_Letter_FAA_Columbia_FSDO.html",
      "SEAS_Safety_Management_System.html",
    ],
    defaultNextActions: [
      "Close EB 105A gaps against modular pad design.",
      "Align Part 135 package with eVTOL transition narrative.",
    ],
  },
  engineering: {
    title: "Engineering & vertiport design",
    subagentId: "engineering",
    anchorDocs: [
      "South East Aerial Systems.md",
      "13_Modular_Container_Vertiport_Design.md",
      "Modular_Vertiport_Diagram.html",
      "Modular_Vertiport_Technical_Drawings.html",
      "12_FAA_EB105A_Compliance_Review.md",
    ],
    defaultNextActions: [
      "Confirm pad dimensions and GEACS placement per site.",
      "Reconcile technical drawings with EB 105A compliance notes.",
    ],
  },
  partnerships: {
    title: "Partners & utilities",
    subagentId: "partnerships",
    anchorDocs: [
      "Submission_Letter_Joby_Aviation.html",
      "Submission_Letter_Dominion_Energy.html",
      "Submission_Letter_City_of_Columbia_Zoning.html",
      "Submission_Letter_Lexington_County.html",
      "Submission_Letter_South_Carolina_Avionics.html",
    ],
    defaultNextActions: [
      "Track outbound letters and response owners in KV.",
      "Define GEACS rollout milestones per site.",
    ],
  },
  operations: {
    title: "Operations manuals & training",
    subagentId: "operations",
    anchorDocs: [
      "SEAS_GOM_HTML.html",
      "SEAS_Flight_Standards_Manual_V1.md",
      "SEAS_Training_Materials.md",
      "SEAS_Checklists_Forms.md",
      "Flight_Operations_Guide.md",
    ],
    defaultNextActions: [
      "Cross-link GOM vertiport sections to site-specific SOPs.",
      "Schedule training modules against hiring plan.",
    ],
  },
  business: {
    title: "Business strategy & launch",
    subagentId: "business",
    anchorDocs: [
      "SEAS_Business_Plan.md",
      "00_Executive_Summary_Action_Plan.md",
      "01_Launch_Roadmap.md",
      "06_Market_Demand_Analysis.md",
      "07_Private_Jet_Commuter_Analysis.md",
    ],
    defaultNextActions: [
      "Set 90-day launch gate criteria.",
      "Align market narrative with three-site network story.",
    ],
  },
  finance: {
    title: "Finance & unit economics",
    subagentId: "finance",
    anchorDocs: [
      "04_Financial_Model_Profitability.md",
      "14_Used_Equipment_Cost_Analysis.md",
      "BUSINESS_STARTUP_PLAN.md",
      "SEAS_Business_Plan.md",
    ],
    defaultNextActions: [
      "Reconcile financial model with used-equipment and vertiport capex.",
      "Document funding milestones tied to Phase 1 sites.",
    ],
  },
  property: {
    title: "Property, zoning & airspace",
    subagentId: "property",
    anchorDocs: [
      "08_Property_Research_Guide.md",
      "09_Property_Owner_Research_Action_Plan.md",
      "10_Airspace_Analysis.md",
      "11_Weather_Analysis.md",
      "James_Island_Correspondence.md",
    ],
    defaultNextActions: [
      "Refresh parcel shortlist near Lake Murray.",
      "Validate airspace constraints for each candidate pad.",
    ],
  },
};

export const KV_PREFIX = "seas/workstreams/";

export const DOMAIN_SUBAGENT_IDS = Object.keys(WORKSTREAMS) as WorkstreamId[];

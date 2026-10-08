export type WorkstreamId =
  | "regulatory"
  | "sites"
  | "partnerships"
  | "operations"
  | "commercial"
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
  { title: string; anchorDocs: string[]; defaultNextActions: string[] }
> = {
  regulatory: {
    title: "Regulatory & certification",
    anchorDocs: [
      "12_FAA_EB105A_Compliance_Review.md",
      "SEAS_Part135_GOM_V1.md",
      "SEAS_Part135_Certification_Package.html",
      "Submission_Letter_FAA_Columbia_FSDO.html",
    ],
    defaultNextActions: [
      "Close EB 105A gaps against modular pad design.",
      "Align Part 135 package with eVTOL transition narrative.",
    ],
  },
  sites: {
    title: "Vertiport network & design",
    anchorDocs: [
      "South East Aerial Systems.md",
      "13_Modular_Container_Vertiport_Design.md",
      "Modular_Vertiport_Diagram.html",
      "Modular_Vertiport_Technical_Drawings.html",
    ],
    defaultNextActions: [
      "Confirm Phase 1 site list and pad dimensions per location.",
      "Publish single source of truth for network map and coordinates.",
    ],
  },
  partnerships: {
    title: "Partners & utilities",
    anchorDocs: [
      "Submission_Letter_Joby_Aviation.html",
      "Submission_Letter_Dominion_Energy.html",
      "Submission_Letter_City_of_Columbia_Zoning.html",
      "Submission_Letter_Lexington_County.html",
    ],
    defaultNextActions: [
      "Track outbound letters and response owners in KV.",
      "Define GEACS rollout milestones per site.",
    ],
  },
  operations: {
    title: "Operations manuals & training",
    anchorDocs: [
      "SEAS_GOM_HTML.html",
      "SEAS_Flight_Standards_Manual_V1.md",
      "SEAS_Training_Materials.md",
      "SEAS_Checklists_Forms.md",
    ],
    defaultNextActions: [
      "Cross-link GOM vertiport sections to site-specific SOPs.",
      "Schedule training modules against hiring plan.",
    ],
  },
  commercial: {
    title: "Business & launch",
    anchorDocs: [
      "SEAS_Business_Plan.md",
      "04_Financial_Model_Profitability.md",
      "00_Executive_Summary_Action_Plan.md",
      "01_Launch_Roadmap.md",
    ],
    defaultNextActions: [
      "Reconcile financial model assumptions with used-equipment analysis.",
      "Set 90-day launch gate criteria.",
    ],
  },
  property: {
    title: "Property, zoning & airspace",
    anchorDocs: [
      "08_Property_Research_Guide.md",
      "09_Property_Owner_Research_Action_Plan.md",
      "10_Airspace_Analysis.md",
      "11_Weather_Analysis.md",
    ],
    defaultNextActions: [
      "Refresh parcel shortlist near Lake Murray.",
      "Validate airspace constraints for each candidate pad.",
    ],
  },
};

export const KV_PREFIX = "seas/workstreams/";

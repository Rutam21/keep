import { Session } from "next-auth";
import { getApiURL } from "@/utils/apiUrl";

export interface CreateIncidentDto {
  name: string;
  summary: string;
  assignee: string;
}

export interface UpdateIncidentDto extends CreateIncidentDto {
  sameIncidentId?: string;
  generatedByAi?: boolean;
}

export const IncidentsApi = {
  createIncident: async (session: Session, incidentData: CreateIncidentDto) => {
    const apiUrl = getApiURL();
    const response = await fetch(`${apiUrl}/incidents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_generated_name: incidentData.name,
        user_summary: incidentData.summary,
        assignee: incidentData.assignee,
      }),
    });
    if (response.ok) {
      const created = await response.json();
      return created.id;
    } else {
      throw new Error("Failed to create incident");
    }
  },
  updateIncident: async (
    session: Session,
    incidentId: string,
    data: UpdateIncidentDto
  ) => {
    const apiUrl = getApiURL();
    const response = await fetch(
      `${apiUrl}/incidents/${incidentId}?generatedByAi=${data.generatedByAi}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_generated_name: data.name,
          user_summary: data.summary,
          assignee: data.assignee,
          same_incident_in_the_past_id: data.sameIncidentId,
        }),
      }
    );
    if (response.ok) {
      const updated = await response.json();
      return updated.id;
    } else {
      throw new Error(`Failed to update incident ${incidentId}`);
    }
  },
};

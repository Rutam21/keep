"use client";

import { useSession } from "next-auth/react";
import {
  CreateIncidentDto,
  IncidentsApi,
  UpdateIncidentDto,
} from "@/entities/incidents/api";
import { useCallback, useMemo } from "react";
import { IncidentDto } from "@/entities/incidents/model/models";
import { useSWRConfig } from "swr";

type UseIncidentsActionsValue = {
  createIncident: (incidentDto: CreateIncidentDto) => Promise<IncidentDto>;
  updateIncident: (
    incidentId: string,
    incidentDto: UpdateIncidentDto
  ) => Promise<IncidentDto>;
  deleteIncident: (incidentDto: CreateIncidentDto) => Promise<void>;
};

export function useIncidentsActions(): UseIncidentsActionsValue {
  const { data: session } = useSession();
  const { mutate: globalMutate } = useSWRConfig();

  const createIncident = useCallback(
    async (incidentDto: CreateIncidentDto) => {
      if (!session) {
        throw new Error("No session found");
      }
      // TODO: mutate global incidents
      return IncidentsApi.createIncident(session, incidentDto);
    },
    [session]
  );

  const updateIncident = useCallback(
    async (incidentId: string, incidentDto: CreateIncidentDto) => {
      if (!session) {
        throw new Error("No session found");
      }
      // TODO: mutate global incidents
      // TODO: mutate incident with id
      return IncidentsApi.updateIncident(session, incidentId, incidentDto);
    },
    [session]
  );

  const deleteIncident = useCallback(
    async (incidentDto: CreateIncidentDto) => {},
    []
  );

  return useMemo(() => {
    return {
      createIncident,
      updateIncident,
      deleteIncident,
    };
  }, [createIncident, updateIncident, deleteIncident]);
}

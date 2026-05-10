import { APPOINTMENTS } from "@/shared/data/appointments"
import { AppointmentService } from "@/shared/services/appointment-service"

export const useHomeViewModel = () => {
  return {
    groupedAppointments:
      AppointmentService.groupAppointmentsByPeriod(APPOINTMENTS),
  }
}

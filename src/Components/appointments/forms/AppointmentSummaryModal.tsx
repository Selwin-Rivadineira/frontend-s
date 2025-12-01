import React from "react";
// Importa los íconos necesarios de lucide-react
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Link, 
  FileText, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Check, 
  X 
} from "lucide-react";

// Define las propiedades (props) de tu componente usando TypeScript Interface
interface AppointmentSummaryModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    title: string;
    name: string;
    date: string;
    time: string;
    modality: "virtual" | "presential";
    locationOrLink: string;
    description?: string;
    errorCause?: string;            // Propiedad para mostrar errores
    channelsSent?: string[];        // Canales enviados
    channelsFailed?: string[];      // Canales fallidos
  };
}

// Define el componente funcional de React con TypeScript (FC)
const AppointmentSummaryModal: React.FC<AppointmentSummaryModalProps> = ({ open, onClose, data }) => {
  // Si el modal no está abierto, no renderiza nada
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Fondo oscuro translúcido que cierra el modal al hacer clic fuera */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      
      {/* Contenedor principal del modal (la tarjeta blanca) */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 z-10">
        
        {/* Sección superior con ícono principal y título */}
        <div className="flex flex-col items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            data.errorCause ? "bg-red-100" : "bg-green-100" // Cambia color de fondo según éxito/error
          }`}>
            {data.errorCause ? (
              <XCircle className="w-8 h-8 text-red-600" /> // Ícono de error
            ) : (
              <CheckCircle className="w-8 h-8 text-green-600" /> // Ícono de éxito
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 text-center">{data.title}</h2>
        </div>

        {/* Información de la cita con íconos y layout flexbox */}
        <div className="space-y-4 text-sm text-gray-700 w-full">
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4" /> Nombre:
            </span>
            <span>{data.name}</span>
          </div>

          {data.date && (
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Fecha:
              </span>
              <span>{data.date}</span>
            </div>
          )}

          {data.time && (
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-500 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Hora:
              </span>
              <span>{data.time}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-500 flex items-center gap-2">
                {/* Usamos MapPin o Link dependiendo de la modalidad */}
                {data.modality === "virtual" ? <Link className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                 Modalidad:
            </span>
            <span>{data.modality === "virtual" ? "Virtual" : "Presencial"}</span>
          </div>

          {data.locationOrLink && (
            <div className="flex items-start justify-between">
              <span className="font-medium text-gray-500 flex items-center gap-2">
                {data.modality === "virtual" ? <Link className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                {data.modality === "virtual" ? "Enlace:" : "Ubicación:"}
              </span>
              <span className="text-right break-words max-w-[60%]">{data.locationOrLink}</span>
            </div>
          )}

          {data.description && (
            <div>
              <span className="font-medium text-gray-500 flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4" /> Descripción:
              </span>
              <p className="bg-gray-100 rounded p-2 text-sm">{data.description}</p>
            </div>
          )}

          {data.errorCause && (
            <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700 font-medium text-sm">Causa del error:</p>
              <p className="text-red-600 text-sm">{data.errorCause}</p>
            </div>
          )}

           {/* Listas de canales enviados y fallidos (usando íconos en lugar de viñetas) */}  
         {(data.channelsSent || data.channelsFailed) && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4" /> Canales de notificación:
              </p>
              {data.channelsSent && data.channelsSent.length > 0 && (
                <div className="mb-2">
                  <p className="text-green-600 font-medium text-sm">Enviados:</p>
                  <ul className="list-inside text-green-600 text-sm space-y-1 mt-1">
                    {data.channelsSent.map((channel, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-3 h-3 inline" /> {channel}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.channelsFailed && data.channelsFailed.length > 0 && (
                <div>
                  <p className="text-red-600 font-medium text-sm">Fallidos:</p>
                  <ul className="list-inside text-red-600 text-sm space-y-1 mt-1">
                    {data.channelsFailed.map((channel, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <X className="w-3 h-3 inline" /> {channel}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sección inferior con el botón "Aceptar" centrado */}
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => {
              onClose();
              window.location.reload();
            }} 
            className="px-6 py-2 bg-[#2B6AE0] text-white rounded-lg hover:brightness-110 text-sm font-semibold shadow-md w-full"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummaryModal;

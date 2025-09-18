import axios from 'axios';

class ShelevesMapController {
  private baseURL: string;
  private projectURL: string;

  constructor() {
    this.baseURL = 'https://api.tu-backend.com'; // URL base del backend
    this.projectURL = 'http://131.107.5.106:3005';
  }

  // GET Estantes
  async getAllShelves() {
    try {
      const response = await axios.get(`${this.projectURL}/dockflow/getEstantes`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliZmQ4ODQ2LTA2MmYtNGUyOC04NWZiLWFkZGZhZjkxNGU0MyIsIm5vbWJyZSI6IkVEV0lOIEVTVFVBUkRPIFJFWUVTIFJFWUVTIiwiaWRUaXBvVXN1YXJpbyI6ImVmYzNmMmVjLTE0N2UtNGY0OC05ZmNmLTRjMjI4ZWFjNTQwOSIsInRpcG9Vc3VhcmlvIjoiVCIsInBlcm1pc29FeHBlZGllbnRlcyI6MywicGVybWlzb0xpYnJvcyI6MywidmVyRXhwZWRpZW50ZXNQcm9jZXNvIjp0cnVlLCJ2ZXJMaWJyb3NQcm9jZXNvIjp0cnVlLCJpYXQiOjE3MzE2MjYzMjQsImV4cCI6MTc2MzE2MjMyNH0.WX71yT1_iQ8r1zNSMH_99KWCm6ugOmOPAFqH37WkkAs",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estantes.", error);
      throw error;
    }
  }

  // GET Cajas de un estante
  async getAllBoxesShelve(shelveId: String) {
    try {
      const response = await axios.get(`${this.projectURL}/dockflow/getCajas/${shelveId}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliZmQ4ODQ2LTA2MmYtNGUyOC04NWZiLWFkZGZhZjkxNGU0MyIsIm5vbWJyZSI6IkVEV0lOIEVTVFVBUkRPIFJFWUVTIFJFWUVTIiwiaWRUaXBvVXN1YXJpbyI6ImVmYzNmMmVjLTE0N2UtNGY0OC05ZmNmLTRjMjI4ZWFjNTQwOSIsInRpcG9Vc3VhcmlvIjoiVCIsInBlcm1pc29FeHBlZGllbnRlcyI6MywicGVybWlzb0xpYnJvcyI6MywidmVyRXhwZWRpZW50ZXNQcm9jZXNvIjp0cnVlLCJ2ZXJMaWJyb3NQcm9jZXNvIjp0cnVlLCJpYXQiOjE3MzE2MjYzMjQsImV4cCI6MTc2MzE2MjMyNH0.WX71yT1_iQ8r1zNSMH_99KWCm6ugOmOPAFqH37WkkAs",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estantes.", error);
      throw error;
    }
  }

  // GET Metadata de un expediente.
  async getMetadataExpediente(numExpediente: String, anioExpediente: String) {
    try {
      const response = await axios.get(`${this.projectURL}/dockflow/getExpediente/${numExpediente}/${anioExpediente}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliZmQ4ODQ2LTA2MmYtNGUyOC04NWZiLWFkZGZhZjkxNGU0MyIsIm5vbWJyZSI6IkVEV0lOIEVTVFVBUkRPIFJFWUVTIFJFWUVTIiwiaWRUaXBvVXN1YXJpbyI6ImVmYzNmMmVjLTE0N2UtNGY0OC05ZmNmLTRjMjI4ZWFjNTQwOSIsInRpcG9Vc3VhcmlvIjoiVCIsInBlcm1pc29FeHBlZGllbnRlcyI6MywicGVybWlzb0xpYnJvcyI6MywidmVyRXhwZWRpZW50ZXNQcm9jZXNvIjp0cnVlLCJ2ZXJMaWJyb3NQcm9jZXNvIjp0cnVlLCJpYXQiOjE3MzMxMzY3MzQsImV4cCI6MTc2NDY3MjczNH0.TeHqgXYIrdu_28QtVgOdGqXdPM0i__UWpIyspLk-A4w",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estantes.", error);
      throw error;
    }
  }

  // GET Expedientes de una caja
  async getAllExpedientsFromBox(boxId: String) {
    try {
      const response = await axios.get(`${this.projectURL}/dockflow/getExpedientesFromBox/${boxId}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliZmQ4ODQ2LTA2MmYtNGUyOC04NWZiLWFkZGZhZjkxNGU0MyIsIm5vbWJyZSI6IkVEV0lOIEVTVFVBUkRPIFJFWUVTIFJFWUVTIiwiaWRUaXBvVXN1YXJpbyI6ImVmYzNmMmVjLTE0N2UtNGY0OC05ZmNmLTRjMjI4ZWFjNTQwOSIsInRpcG9Vc3VhcmlvIjoiVCIsInBlcm1pc29FeHBlZGllbnRlcyI6MywicGVybWlzb0xpYnJvcyI6MywidmVyRXhwZWRpZW50ZXNQcm9jZXNvIjp0cnVlLCJ2ZXJMaWJyb3NQcm9jZXNvIjp0cnVlLCJpYXQiOjE3Mjk1NTc3NjYsImV4cCI6MTc2MTA5Mzc2Nn0.I4_iE5J2Sjmbah9ldIn_LrQLUl7H2l6gVGlmqBek0ew",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los expedientes.", error);
      throw error;
    }
  }

  // Post de prueba
  // Método para obtener todos los usuarios
  async getAllUsuarios() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
      throw error;
    }
  }

  // Metodo para obtener todos los post
  async getAllPosts() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los posts", error);
      throw error;
    }
  }

  // Método para obtener un estante específico por ID
  async getEstanteById(id: string) {
    try {
      const response = await axios.get(`${this.baseURL}/estantes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el estante con id ${id}`, error);
      throw error;
    }
  }

  // Método para crear un nuevo estante
  async createEstante(data: any) {
    try {
      const response = await axios.post(`${this.baseURL}/estantes`, data);
      return response.data;
    } catch (error) {
      console.error("Error al crear el estante", error);
      throw error;
    }
  }

  // Método para actualizar un estante
  async updateEstante(id: string, data: any) {
    try {
      const response = await axios.put(`${this.baseURL}/estantes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el estante con id ${id}`, error);
      throw error;
    }
  }

  // Método para eliminar un estante
  async deleteEstante(id: string) {
    try {
      const response = await axios.delete(`${this.baseURL}/estantes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el estante con id ${id}`, error);
      throw error;
    }
  }
}

export default new ShelevesMapController();
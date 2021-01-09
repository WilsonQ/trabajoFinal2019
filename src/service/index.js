import axios from "axios";
import { store } from "../store/";
const mocky = "http://www.mocky.io/v2";
//const api = "https://localhost:44390/api";
const api = "https://fullmanager.azurewebsites.net/api";

//<-----------------------------PRODUCTOS----------------------------->

//TRAE TODOS LOS PRODUCTOS
export const GET_PRODUCTOS = async () => {
  // const url = `${mocky}/5d928f45310000e18410cf7c`;
  //Descomentar cuando  se conecte con el backend
  // const url = "http://5d94ec48a961920014e93a81.mockapi.io/producto";
  const url = "https://localhost:44390/api/productos";
  // const url = `${api}/productos`;
  const data = await axios.get(url);
  console.log("Realizando la peticion: ", data);
  return data;
};

//TRAE UN PRODUCTO
export const GET_PRODUCTO = async codigo => {
  const url = "https://localhost:44390/api/productos?";
  try {
    // const url = `${api}/productos?`;
    //const url = `http://5d94ec48a961920014e93a81.mockapi.io/producto/${codigo}`;
    const result = await axios.get(url, {
      params: {
        codigo: codigo
      }
    });
    // const result = await axios.get(url);
    console.log("Realizando la peticion: ", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

//CREA UN NUEVO PRODUCTO
export const POST_PRODUCTO = async data => {
  const url = "https://localhost:44390/api/productos";
  //Descomentar cuando  se conecte con el backend
  try {
    // const url = `${api}/productos`;
    // const url = "http://5d94ec48a961920014e93a81.mockapi.io/producto";
    const result = await axios.post(url, data);
    console.log("Que retorna el POST", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

//STOCK MEDIO
export const GET_STOCK_MEDIO = async () => {
  const url = "http://www.mocky.io/v2/5db6f69a2f000052007feb84";
  const data = await axios.get(url);
  console.log("Realizando la peticion: ", data);
  return data;
};
//STOCK BAJO
export const GET_STOCK_BAJO = async () => {
  const url = "http://www.mocky.io/v2/5db6f69a2f000052007feb84";
  const data = await axios.get(url);
  console.log("Realizando la peticion: ", data);
  return data;
};
//STOCK ALTO
export const GET_STOCK_ALTO = async () => {
  const url = "http://www.mocky.io/v2/5db6f69a2f000052007feb84";
  const data = await axios.get(url);
  console.log("Realizando la peticion: ", data);
  return data;
};

//MODIFICA UN PRODUCTO
export const PUT_PRODUCTO = async data => {
  const url = "https://localhost:44390/api/productos";
  //Descomentar cuando  se conecte con el backend
  try {
    // const url = `${api}/productos`;
    console.log("que hay aka", data);
    //const url = `http://5d94ec48a961920014e93a81.mockapi.io/producto/${data.id}`;
    const result = await axios.put(url, data);
    // const result = await axios.put(url, data);
    console.log("Que retorna el PUT", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

//ELIMINAR PRODUCTO
export const DELETE_PRODUCTO = async data => {
  const url = "https://localhost:44390/api/productos?";
  //Descomentar cuando  se conecte con el backend
  try {
    // const url = `${api}/productos?`;
    const result = await axios.delete(url, {
      params: {
        codigo: data
      }
    });
    console.log("Que retorna el DELETE", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

//<-----------------------------VENTAS----------------------------->

//GUARDA UNA VENTA NUEVA
export const POST_VENTA = async data => {
  //return axios.post(url, datos).then(res => res);
  const url = "https://localhost:44390/api/ventafisica";
  try {
    // const url = "http://5d94ec48a961920014e93a81.mockapi.io/venta";
    //const url = `${api}/ventafisica`;
    const result = await axios.post(url, data);
    console.log("RESULTADO:", result);
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
  // console.log("SERVICE:", data);
};

//TRAE TODAS LAS VENTAS
export const GET_VENTAS = async () => {
  const url = "https://localhost:44390/api/ventafisica";
  //const url = `http://www.mocky.io/v2/5d861e61320000f16d07b356`;
  //const url = `${mocky}/ventafisica`;
  //const url = `${api}/ventafisica`;
  // const url = "http://5d94ec48a961920014e93a81.mockapi.io/venta";
  const result = await axios.get(url);
  console.log("RESULTADO:", result);
  // console.log("SERVICE:", data);
  return result;
};

//<-----------------------------ORDEN DE TRABAJO----------------------------->
//GUARDA ORDEN DE TRABAJO
export const POST_ORDEN_TRABAJO = async data => {
  try {
    //return axios.post(url, datos).then(res => res);
    const url = "https://localhost:44390/api/ordendetrabajo";
    //const url = `${api}/ventafisica`;
    const result = await axios.post(url, data);
    console.log("RESULTADO:", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//TRAE TODOS LAS ORDENES DE TRABAJOS
export const GET_ORDENES_TRABAJOS = async () => {
  // const url = `${mocky}/5d928f45310000e18410cf7c`;
  //Descomentar cuando  se conecte con el backend
  try {
    // const url = "https://5d94ec48a961920014e93a81.mockapi.io/ordenTrabajo";
    const url = "https://localhost:44390/api/ordendetrabajo";
    //const url = `${api}/productos`;
    const data = await axios.get(url);
    console.log("Realizando la peticion: ", data);
    return data.data;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//ELIMINA LA ORDEN DE TRABAJO
export const DELETE_ORDEN_TRABAJO = async id => {
  // const url = `${mocky}/5d928f45310000e18410cf7c`;
  //Descomentar cuando  se conecte con el backend
  try {
    // const url = `https://5d94ec48a961920014e93a81.mockapi.io/ordenTrabajo/${id}`;
    const url = "https://localhost:44390/api/ordendetrabajo";
    //const url = `${api}/productos`;
    console.log("Que retorna el DELETE", id);
    // const result = await axios.delete(url);
    const result = await axios.delete(url, {
      params: {
        id: id
      }
    });
    console.log("Que retorna el DELETE", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//MODIFICAR LA ORDEN DE TRABAJO
export const PUT_ORDEN_TRABAJO = async data => {
  // const url = `${mocky}/5d928f45310000e18410cf7c`;
  //Descomentar cuando  se conecte con el backend
  try {
    // const url = `https://5d94ec48a961920014e93a81.mockapi.io/ordenTrabajo/${data.id}`;
    const url = "https://localhost:44390/api/ordendetrabajo";
    //const url = `${api}/productos`;
    console.log("Modificar", data.id);
    const result = await axios.put(url, data);
    console.log("Que retorna el PUT", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//<-----------------------------HOME----------------------------->
//TRAE TODOS LAS DATOS DE LA PANTALLA HOME
export const GET_HOME_DATA = async () => {
  try {
    const url = "http://www.mocky.io/v2/5dcffcbf2f000051003f1f58";
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//<-----------------------------ESTADISTICAS----------------------------->
//TRAE TODOS LAS DATOS DE LA PANTALLA  ESTADISTICA
export const GET_ESTADISTICAS_DATA = async () => {
  try {
    const url = "http://www.mocky.io/v2/5dd3bf312f00005700d4f6ad";
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

import axios from "axios";
const api = "https://fullmanager.azurewebsites.net/api";
const ACCESS_TOKEN =
  "APP_USR-7238143007442905-111217-5e151b88707818486297c2d124801783-91546573";
const SELLER_ID = "91546573";
import config from "../config";
//<-----------------------------CATEGORIAS----------------------------->
const meli = "https://api.mercadolibre.com";
//TRAE TODOS LOS CATEGORIAS 164542593714623
export const GET_CATEGORIAS = async () => {
  //query=> https://api.mercadolibre.com/sites/MLA/categories
  try {
    const url = `${meli}/sites/MLA/categories`;
    const data = await axios.get(url);
    console.log("Realizando la peticion: ", data);
    return data;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//TRAE TODOS LOS SUBCATEGORIAS
export const GET_HIJOS_CATEGORIAS = async codigo => {
  //query=> https://api.mercadolibre.com/categories/MLA5725
  try {
    const url = `${meli}/categories/${codigo}`;
    const data = await axios.get(url);
    console.log("Realizando la peticion: ", data);
    return data;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

//<-----------------------------MERCADO lIBRE----------------------------->

//CREAR PUBLICACION EN MERCADO LIBRE
export const POST_PUBLICACION = async data => {
  // https://api.mercadolibre.com/items?access_token=$ACCESS_TOKEN
  try {
    // const url = `${api}/productos`;
    const url = `${meli}/items?access_token=${ACCESS_TOKEN}`;
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
//MODIFICAR PUBLICACION EN MERCADO LIBRE
export const PUT_PUBLICACION = async data => {
  // https://api.mercadolibre.com/items/ITEM_ID?access_token=YOUR_ACCESS_TOKEN
  try {
    const ITEM_ID = data.id;
    delete data.id;
    const url = `${meli}/items/${ITEM_ID}?access_token=${ACCESS_TOKEN}`;
    const result = await axios.put(url, data);
    console.log("Que retorna el PUT", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    console.log("data", error.response.status);
    if (error.response.status !== 409) {
      return {
        status: 500
      };
    }
    return {
      status: error.response.status
    };
  }
};
//OBTENER PUBLICACION DE MERCADO LIBRE
export const GET_PUBLICACION = async idMeli => {
  //https://api.mercadolibre.com/items/$ID
  try {
    const url = `${meli}/items/${idMeli}`;
    const result = await axios.get(url);
    console.log("Que retorna el get", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//OBTENER TODAS LAS PUBLICACIONES DE MERCADO LIBRE
export const GET_PUBLICACIONES = async () => {
  //"Sellers items" => https://api.mercadolibre.com/users/$SELLER_ID/items/search?access_token=$ACCESS_TOKEN
  //"Sellers" => https://api.mercadolibre.com/sites/MLA/search?seller_id=$SELLER_ID
  try {
    // const url = `${meli}/sites/MLA/search?seller_id=${SELLER_ID}`;
    const url = `${meli}/users/${SELLER_ID}/items/search?access_token=${ACCESS_TOKEN}`;
    const result = await axios.get(url);
    console.log("Que retorna el get", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//OBTENER TODAS LAS PUBLICACIONES DE MERCADO LIBRE
export const DELETE_PUBLICACIONES = async ITEM_ID => {
  //   https://api.mercadolibre.com/items/ITEM_ID?access_token=YOUR_ACCESS_TOKEN
  try {
    const url = `${meli}/items/${ITEM_ID}?access_token=${ACCESS_TOKEN}`;
    const result = await axios.put(url, { deleted: true });
    console.log("Que retorna el delete", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//OBTENER LA DESCRIPCION DE UNA PUBLICION DE MERCADO LIBRE
export const GET_DESCRIPCION_PUBLICACION = async ITEM_ID => {
  //   https://api.mercadolibre.com/items/{ITEM_ID}/description
  try {
    const url = `${meli}/items/${ITEM_ID}/description`;
    const result = await axios.get(url);
    console.log("Que retorna el get", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//MODIFICAR LA DESCRIPCION DE UNA PUBLICION DE MERCADO LIBRE
export const PUT_DESCRIPCION_PUBLICACION = async data => {
  //   https://api.mercadolibre.com/items/{ITEM_ID}/description?access_token=$ACCESS_TOKEN
  try {
    console.log("DESCRIPCION_PUBLICACION", data);
    const ITEM_ID = data.id;
    delete data.id;
    const url = `${meli}/items/${ITEM_ID}/description?access_token=${ACCESS_TOKEN}`;
    const result = await axios.put(url, { plain_text: data.descripcion });
    console.log("Que retorna el put", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};
//SE ENCARGA DE CAMBIAR EL ESTADO DE UNA PUBLICACION
export const CAMBIAR_ESTADO = async status => {
  //https://api.mercadolibre.com/items/ITEM_ID?access_token=YOUR_ACCESS_TOKEN
  try {
    const ITEM_ID = status.id;
    delete status.id;
    const url = `${meli}/items/${ITEM_ID}?access_token=${ACCESS_TOKEN}`;
    const result = await axios.put(url, status);
    console.log("Que retorna el get", result);
    return result;
  } catch (error) {
    console.error("ERROR:", error);
    return {
      status: 500
    };
  }
};

// < ----------------------------- CLOUDINARY----------------------------->
//CREA EL FORMDATA CONTRUYE_FORM_DATA
export const CONTRUYE_FORM_DATA = file => {
  const formData = new FormData();
  formData.append("upload_preset", config.cloudinary.uploadPreset);
  formData.append("file", file);
  return formData;
};
//SE ENCARGA DE SUBIR UNA IMAGEN A CLOUDINARY  POST_IMAGE
export const POST_IMAGE = async ({ formData, type }) => {
  try {
    const url =
      "https://api.cloudinary.com/v1_1/" +
      config.cloudinary.cloudName +
      "/" +
      type +
      "/upload";
    const data = await axios.post(url, formData);
    console.log("lo que te devuelve", data);
    return data;
  } catch (error) {
    return {
      status: 500
    };
  }
};

export function getByKeyword(productos, keyword) {
  // parametro de busqueda
  const search = keyword;
  if (search === "") {
    console.log("blanco");
    //enviame la lista completa si no tengo datos
    return [{}];
  } else {
    //retorna la lista filtrada
    console.log("buscando...", search);

    const producto = productos.filter(producto =>
      producto.codigo.toString().includes(search)
    );
    console.log("producto...", producto.length);
    if (producto.length <= 1 && producto.length !== 0) {
      console.log("envia..");
      return producto;
    } else {
      console.log("no envia");
      return null;
    }
  }
}

export function adartarProductoFiltrado(producto) {
  console.log("valor", producto);
  const { codigo, nombre, stock, precio, precio2, precio3, precio4 } = producto;

  const productoAdaptado = {
    codigo,
    nombre,
    seleccion: precio,
    precios: [precio, precio2, precio3, precio4],
    stock,
    cantidad: 1,
    especial: false,
    subtotal: 0
  };

  // console.log("adaptarlo", productoAdaptado);
  return productoAdaptado;
}
export function adartarPictures(picture) {
  console.log("llega", picture);
  const pictures = picture.map(pic => {
    return { source: pic.url };
  });
  console.log("que tiene", pictures);
  return pictures;
}

// function items() {
//   return {
//     title: "Item de test - No Ofertar",
//     category_id: "MLA47392",
//     price: 10,
//     currency_id: "ARS",
//     available_quantity: 1,
//     buying_mode: "buy_it_now",
//     listing_type_id: "gold_special",
//     condition: "new",
//     description:
//       "Item:,  Ray-Ban WAYFARER Gloss Black RB2140 901  Model: RB2140. Size: 50mm. Name: WAYFARER. Color: Gloss Black. Includes Ray-Ban Carrying Case and Cleaning Cloth. New in Box",
//     video_id: "YOUTUBE_ID_HERE",
//     tags: ["immediate_payment"],
//     warranty: "12 months by Ray Ban",
//     pictures: [
//       {
//         source:
//           "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ray_Ban_Original_Wayfarer.jpg"
//       },
//       {
//         source: "https://en.wikipedia.org/wiki/File:Teashades.gif"
//       }
//     ]
//   };
// }
const items = {
  title: "Item de test - No Ofertar",
  category_id: "MLA47392",
  price: 10,
  currency_id: "ARS",
  available_quantity: 1,
  buying_mode: "buy_it_now",
  listing_type_id: "gold_special",
  condition: "new",
  description:
    "Item:,  Ray-Ban WAYFARER Gloss Black RB2140 901  Model: RB2140. Size: 50mm. Name: WAYFARER. Color: Gloss Black. Includes Ray-Ban Carrying Case and Cleaning Cloth. New in Box",
  video_id: "YOUTUBE_ID_HERE",
  tags: ["immediate_payment"],
  warranty: "12 months by Ray Ban",
  pictures: [
    {
      source:
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ray_Ban_Original_Wayfarer.jpg"
    },
    {
      source: "https://en.wikipedia.org/wiki/File:Teashades.gif"
    }
  ]
};
export const ModificarPublicacion = {
  title: "Item de test - No Ofertar",
  price: 10,
  available_quantity: 1,
  description:
    "Item:,  Ray-Ban WAYFARER Gloss Black RB2140 901  Model: RB2140. Size: 50mm. Name: WAYFARER. Color: Gloss Black. Includes Ray-Ban Carrying Case and Cleaning Cloth. New in Box",
  video_id: "YOUTUBE_ID_HERE",
  pictures: [
    {
      source:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVOBUMDcm6d_Rn1Rn7U-fCgWqzCQHAUBHYa4jG0axoA3nXgSq&s"
    },
    {
      source:
        "https://images-na.ssl-images-amazon.com/images/I/81bJhHPwGwL._SX425_.jpg"
    }
  ]
};

export const estados = [
  {
    name: "Cerrado",
    status: "closed"
  },
  {
    name: "Pausado",
    status: "paused"
  },
  {
    name: "Activo",
    status: "active"
  }
];

export function arrayComparar(model) {
  if (!model) return [];

  return Object.keys(model).map(key => {
    return {
      key,
      value: model[key] || "n/a"
    };
  });
}
export function compararValores(array1, array2, formulario) {
  let iguales = 0;
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1.length; j++) {
      if (formulario) {
        if (array1[i].value == array2[j].value) iguales++;
      } else if (array1.length === array2.length) {
        if (array1[i].value.source == array2[j].value.source) iguales++;
      } else {
        iguales = 0;
      }
    }
  }
  return iguales;
}

export function objectPublicacion(categoria, producto, formulario) {
  console.log("producto...", producto);
  items["title"] = producto.Nombre;
  items["price"] = producto.precio;
  items["available_quantity"] = producto.stock;
  items["description"] = producto.descripcion;
  items["category_id"] = categoria.id;
  items["video_id"] = formulario.link;
  items["condition"] = formulario.estado;
  items["pictures"] = producto.pictures;
  return items;
}
